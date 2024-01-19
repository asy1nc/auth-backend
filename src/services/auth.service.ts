import { ISignupPayload } from "../interfaces/auth.interface";
import prisma from "../clients/prisma.client";
import * as errors from "./error.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  private authUtils: AuthUtils;

  constructor() {
    this.authUtils = new AuthUtils();
  }

  async signup(payload: ISignupPayload) {
    await this.authUtils.exists(payload.email, true);
    let user = null;

    payload.password = await this.authUtils.hashPassword(payload.password);

    try {
      user = await prisma.user.create({ data: payload });
    } catch (error: any) {
      throw new errors.AsyncError("Internal Server Error", 500, error);
    }

    const returnPayload = {
      email: user.email,
      username: user.username,
    };

    return returnPayload;
  }

  async login(password: string, email?: string, username?: string) {
    let user = null;

    if (email) {
      user = await prisma.user.findUnique({ where: { email } });
    } else if (username) {
      user = await prisma.user.findUnique({ where: { username } });
    }

    if (!user) {
      throw new errors.ResourceNotFoundError("User not found");
    }

    const isPasswordValid = await this.authUtils.isPasswordValid(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new errors.BadRequestError("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return token;
  }
}

class AuthUtils {
  async exists(email?: string, arise = false) {
    const userExists = !!(await prisma.user.findUnique({ where: { email } }));

    if (userExists && !arise) {
      throw new errors.ConflictError("User already exists");
    }

    return userExists;
  }

  hashPassword = async (password: string) => await bcrypt.hash(password, 10);

  isPasswordValid = async (password: string, hash: string) =>
    await bcrypt.compare(password, hash);
}

export default AuthService;

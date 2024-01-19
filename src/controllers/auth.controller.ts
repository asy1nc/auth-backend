import AuthService from "../services/auth.service";
import { ILoginPayload, ISignupPayload } from "../interfaces/auth.interface";
import {
  signupValidation,
  loginValidation,
  validateAndThrow,
} from "../validations/auth.validation";

async function AuthController(
  type: "login" | "signup",
  payload: ISignupPayload | ILoginPayload
) {
  try {
    if (type === "login") {
      await validateAndThrow(loginValidation, payload as ILoginPayload);
    } else {
      await validateAndThrow(signupValidation, payload as ISignupPayload);
    }

    const authService = new AuthService();

    const user = await authService[type](payload);

    return user;
  } catch (error: any) {
    throw error;
  }
}

export default AuthController;

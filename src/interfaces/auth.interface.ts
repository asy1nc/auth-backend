interface ISignupPayload {
    email: string;
    password: string;
    username: string;
}

interface ILoginPayload {
    email: string;
    password: string;
    username: string;
}

export {
    ISignupPayload,
    ILoginPayload
}
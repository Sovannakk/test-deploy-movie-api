import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    token: string;
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id: string;
    role: string;
    payload: LoginResponse;
  }
}

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    token: string;
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

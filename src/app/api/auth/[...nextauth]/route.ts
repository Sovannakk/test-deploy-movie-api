import { MovieService } from "@/service/MovieService";
import { LoginRequest } from "@/types/Movie";
import NextAuth, { AuthOptions } from "next-auth";  
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password.");
        }

        const data: LoginRequest = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await MovieService.LoginService(data);

        return res.payload;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },

    async session({ session, token }) {
      session.token = token.token as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

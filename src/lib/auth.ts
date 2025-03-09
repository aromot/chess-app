// import { v4 as uuid } from "uuid";
// import { encode as defaultEncode } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { CredentialsSignin } from "next-auth";
import { prisma } from "./db";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "../users/schema";
import { getUserByEmail } from "../users/db-queries";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { URLS } from "@/app/urls";
import { isDev } from "./helpers";

const adapter = PrismaAdapter(prisma);

class InvalidLoginError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
  }
}

// https://authjs.dev/guides/edge-compatibility
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  debug: isDev(),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log(
          "================= START AUTHORIZE ============================="
        );

        try {
          const validation = signInSchema.parse(credentials);
          const { email, password } = validation;

          const user = await getUserByEmail(email);

          if (!user) {
            throw new Error("Invalid email or password.");
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            user.password as string
          );
          if (!isPasswordValid) {
            throw new Error("Invalid email or password.");
          }

          return user;
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientInitializationError ||
            error instanceof Prisma.PrismaClientUnknownRequestError
          )
            throw new InvalidLoginError(
              "System Error Occured. Please Contact Support Team"
            );
          if (error instanceof ZodError)
            throw new InvalidLoginError(error.errors[0]?.message!);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: URLS.login,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  // -- codegenixdev -------------------------------------------------------------
  // callbacks: {
  // ici ça marche pas, account est vide (=undefined).
  // async jwt({ token, account }) {
  //   console.log("jwt", { token, account });
  //   console.log("account:", account);
  //   if (account?.provider === "credentials") {
  //     token.credentials = true;
  //   }
  //   return token;
  // },
  // },
  // jwt: {
  //   encode: async function (params) {
  //     console.log({ params });

  //     if (params.token?.credentials) {
  //       const sessionToken = uuid();

  //       console.log({ sessionToken });

  //       if (!params.token.sub) {
  //         throw new Error("No user ID found in token");
  //       }

  //       const createdSession = await adapter?.createSession?.({
  //         sessionToken: sessionToken,
  //         userId: params.token.sub,
  //         expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  //       });
  //       console.log({ createdSession });

  //       if (!createdSession) {
  //         throw new Error("Failed to create session");
  //       }

  //       return sessionToken;
  //     }
  //     return defaultEncode(params);
  //   },
  // },
  // -- /codegenixdev -------------------------------------------------------------
});

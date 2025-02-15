// import { v4 as uuid } from "uuid";
// import { encode as defaultEncode } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
// import { prisma } from "./lib/db";
import authConfig from "./auth.config";
import { prisma } from "./lib/db";

const adapter = PrismaAdapter(prisma);

// https://authjs.dev/guides/edge-compatibility
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  ...authConfig,
  // -- codegenixdev -------------------------------------------------------------
  // callbacks: {
  //   async jwt({ token, account }) {
  //     console.log({ token, account });

  //     if (account?.provider === "credentials") {
  //       token.credentials = true;
  //     }
  //     return token;
  //   },
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

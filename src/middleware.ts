import NextAuth from "next-auth";
import authConfig from "./auth.config";

// https://authjs.dev/guides/edge-compatibility
// export { auth as middleware } from "@/auth";
export const { auth: middleware } = NextAuth(authConfig);

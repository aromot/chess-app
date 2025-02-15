// import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./users/db-queries";
// import { ZodError } from "zod";

/**
 * Ici, l'adapter de la BDD n'est pas inclus INTENTIONNELLEMENT pour être "egde runtime compatible".
 */

// Notice this is only an object, not a full Auth.js instance
// https://authjs.dev/guides/edge-compatibility
export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // try {
        //   let user = null;
        //   const { email, password } = await signInSchema.parseAsync(
        //     credentials
        //   );
        //   // logic to salt and hash password
        //   const pwHash = saltAndHashPassword(password);
        //   // logic to verify if the user exists
        //   user = await getUserFromDb(email, pwHash);
        //   if (!user) {
        //     throw new Error("Invalid credentials.");
        //   }
        //   // return JSON object with the user data
        //   return user;
        // } catch (error) {
        //   if (error instanceof ZodError) {
        //     // Return `null` to indicate that the credentials are invalid
        //     return null;
        //   }
        // }
        // -- codegenixdev -------------------------------------------------------------
        // const validatedCredentials = signInSchema.parse(credentials);
        // console.log({ validatedCredentials });
        // const user = await prisma.user.findFirst({
        //   where: {
        //     email: validatedCredentials.email,
        //     password: validatedCredentials.password,
        //   },
        // });
        // console.log({ user });
        // if (!user) {
        //   throw new Error("Invalid credentials.");
        // }
        // return user;
        // -- /codegenixdev -------------------------------------------------------------
        // https://medium.com/@askfaizanrathore/how-to-implement-authentication-with-nextauth-in-next-js-15-and-typescript-50b22baa1b5a

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const user = await getUserByEmail(credentials.email as string);

        if (!user) {
          throw new Error("Invalid email or password.");
        }

        // const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        const isPasswordValid = credentials.password == user.password;
        if (!isPasswordValid) {
          throw new Error("Invalid email or password.");
        }

        return user;
        // -- /@askfaizanrathore ------------------------------------------------------------
      },
    }),
  ],
} satisfies NextAuthConfig;

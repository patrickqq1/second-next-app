import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      authorize: async (credentials) => {
        const validateFields = z
          .object({
            username: z.string(),
            password: z.string(),
          })
          .safeParse(credentials);
        if (!validateFields.success) {
          return null;
        }
        const user = await db.user.findUnique({
          where: {
            name: validateFields.data.username,
          },
        });
        if (user?.password === validateFields.data.password) {
          console.log({
            id: user.id,
            name: user.name,
          });
          return {
            id: user.id,
            name: user.name,
          };
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
});

"use server";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { AuthError } from "next-auth";

export const login = async (username: string, password: string) => {
  try {
    const checkExists = await db.user.findUnique({
      where: {
        name: username,
      },
    });
    if (!checkExists) {
      await db.user.create({
        data: {
          name: username,
          password,
        },
      });
      await signIn("credentials", {
        username,
        password,
        redirect: true,
        redirectTo: "/dashboard",
      });
      return { success: true };
    }

    await signIn("credentials", {
      username,
      password,
      redirect: true,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};

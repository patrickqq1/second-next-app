"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function CreateTask({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const session = await auth();
  try {
    await db.tasks.create({
      data: {
        title,
        description,
        User: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log({ error });
  }
}

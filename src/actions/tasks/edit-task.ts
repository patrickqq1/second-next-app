"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function EditTask({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  const session = await auth();
  try {
    await db.tasks.update({
      where: {
        id,
        userId: session?.user?.id,
      },
      data: {
        title,
        description,
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log({ error });
  }
}

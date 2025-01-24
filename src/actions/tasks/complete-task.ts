"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function CompleteTask({ id }: { id: string }) {
  const session = await auth();
  try {
    await db.tasks.update({
      where: {
        id,
        userId: session?.user?.id,
      },
      data: {
        isCompleted: true,
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log({ error });
  }
}

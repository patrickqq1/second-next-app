"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function DeleteTask({ id }: { id: string }) {
  const session = await auth();
  try {
    await db.tasks.delete({
      where: {
        id,
        userId: session?.user?.id,
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log({ error });
  }
}

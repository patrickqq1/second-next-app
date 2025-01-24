import { auth } from "@/auth";
import { db } from "@/lib/db";

export default async function GetTasks() {
  const session = await auth();
  try {
    const tasks = await db.tasks.findMany({
      where: {
        userId: session?.user?.id,
      },
    });
    return { tasks };
  } catch (error) {
    console.log({ error });
  }
}

import GetTasks from "@/actions/tasks/get";
import { auth } from "@/auth";
import CreateNewTask from "@/components/create-new-task";
import ButtonLogout from "@/components/logout-button";
import CardList from "@/components/tasks-list";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FiList, FiLogOut, FiUser } from "react-icons/fi";

export default async function Page() {
  const tasks = (await GetTasks())?.tasks;
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <div className="bg-zinc-800 p-6 rounded-sm text-white w-full max-w-5xl flex flex-col h-full">
        <div className="text-center flex items-center justify-center gap-2 mb-4">
          <FiUser className="text-xl" />
          <span>
            Bem-vindo!{" "}
            <b>{session?.user?.name && session?.user?.name.toUpperCase()}.</b>
          </span>
        </div>
        <div className="p-5 flex items-center justify-center">
          <CreateNewTask />
        </div>
        <div className="flex flex-col flex-grow overflow-hidden p-5">
          <div className="flex items-center gap-2 mb-3">
            <FiList className="text-lg" />
            <span>Suas tarefas:</span>
          </div>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                <Loader className="animate-spin" />
              </div>
            }
          >
            <div className="flex-grow overflow-y-auto">
              <CardList tasks={tasks || []} />
            </div>
          </Suspense>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-2">
            <FiLogOut className="text-xl" />
            <ButtonLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

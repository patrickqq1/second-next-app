"use client";
import CompleteTask from "@/actions/tasks/complete-task";
import DeleteTask from "@/actions/tasks/delete";
import PendentTask from "@/actions/tasks/pendent-task";
import EditTaskModal from "./edit-task";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const CardTask = ({
  id,
  title,
  description,
  isCompleted,
}: {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
}) => {
  const handleCompleteTask = async () => {
    await CompleteTask({
      id,
    });
  };

  const handlePendentTask = async () => {
    await PendentTask({
      id,
    });
  };

  const handleDeleteTask = async () => {
    await DeleteTask({
      id,
    });
  };

  return (
    <Card
      className={`w-full border transition-all hover:shadow-lg rounded-lg ${
        isCompleted
          ? "bg-zinc-800 border-green-500"
          : "bg-white border-zinc-300"
      }`}
    >
      <CardHeader className="p-4">
        <CardTitle
          className={`text-lg font-bold ${
            isCompleted ? "text-green-400 line-through" : "text-zinc-900"
          }`}
        >
          {title}
        </CardTitle>
        <CardDescription
          className={`text-sm ${
            isCompleted ? "text-green-300" : "text-zinc-600"
          }`}
        >
          {description || "Sem descrição disponível."}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between p-4 border-t border-zinc-200">
        <Button
          className={`text-sm font-medium px-4 py-2 rounded-md transition-colors ${
            isCompleted
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          onClick={() => {
            if (isCompleted) {
              handlePendentTask();
            } else {
              handleCompleteTask();
            }
          }}
        >
          {isCompleted ? "Deixar como pendente" : "Concluir"}
        </Button>
        <Button
          onClick={handleDeleteTask}
          className="text-sm font-medium px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
        >
          Excluir
        </Button>
        <EditTaskModal id={id} title={title} description={description || ""}>
          <Button>Editar</Button>
        </EditTaskModal>
      </CardFooter>
    </Card>
  );
};

export default CardTask;

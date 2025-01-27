"use client";
import CompleteTask from "@/actions/tasks/complete-task";
import DeleteTask from "@/actions/tasks/delete";
import PendentTask from "@/actions/tasks/pendent-task";
import { useState } from "react";
import EditTaskModal from "./edit-task";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const CardTask = ({
  id,
  title,
  description,
  createdAt,
  updatedAt,
  isCompleted,
}: {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  isCompleted: boolean;
}) => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleCompleteTask = async () => {
    setIsLoadingComplete(true);
    await CompleteTask({ id });
    setIsLoadingComplete(false);
  };

  const handlePendentTask = async () => {
    setIsLoadingComplete(true);
    await PendentTask({ id });
    setIsLoadingComplete(false);
  };

  const handleDeleteTask = async () => {
    setIsLoadingDelete(true);
    await DeleteTask({ id });
    setIsLoadingDelete(false);
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
      <CardContent>
        <div>
          <p>
            <b>Criado em:</b> {createdAt}
          </p>
          {updatedAt === createdAt ? (
            <p>
              <b>Editado em:</b> Sem edições
            </p>
          ) : (
            <p>
              <b>Editado em:</b> {updatedAt}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4 border-t border-zinc-200">
        <Button
          disabled={isLoadingComplete}
          className={`col-span-2 text-sm font-medium px-4 py-2 rounded-md transition-colors ${
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
          {isLoadingComplete
            ? "Processando..."
            : isCompleted
            ? "Deixar como pendente"
            : "Concluir"}
        </Button>
        <Button
          disabled={isLoadingDelete}
          onClick={handleDeleteTask}
          className="text-sm font-medium px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
        >
          {isLoadingDelete ? "Excluindo..." : "Excluir"}
        </Button>
        <EditTaskModal id={id} title={title} description={description || ""}>
          <Button>Editar</Button>
        </EditTaskModal>
      </CardFooter>
    </Card>
  );
};

export default CardTask;

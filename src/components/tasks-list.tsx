import { Tasks } from "@prisma/client";
import CardTask from "./card-task";

export default function CardList({ tasks }: { tasks: Tasks[] }) {
  if (tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-white text-2xl">Nenhuma tarefa por aqui...</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <CardTask
          key={task.id}
          id={task.id}
          description={task.description}
          title={task.title}
          isCompleted={task.isCompleted}
          createdAt={task.createdAt.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
          updatedAt={task.updatedAt.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      ))}
    </div>
  );
}

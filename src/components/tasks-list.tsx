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
        />
      ))}
    </div>
  );
}

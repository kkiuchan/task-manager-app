import { Task } from "@/store/taskStore";

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const completed = tasks.filter((t) => t.completed).length;
  const incomplete = tasks.filter((t) => !t.completed).length;

  return (
    <div className="flex gap-4 text-sm text-gray-600 mb-4">
      <span>未完了: {incomplete}</span>
      <span>完了: {completed}</span>
    </div>
  );
}

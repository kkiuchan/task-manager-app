import { fetchInitialData } from "@/lib/api";
import TaskManager from "../components/client/TaskManager";
import TaskHeader from "../components/server/TaskHeader";

export default async function Home() {
  const { tasks, categories } = await fetchInitialData();

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 max-w-lg sm:max-w-2xl flex flex-col gap-4 min-h-screen">
      <TaskHeader />
      <TaskManager initialTasks={tasks} initialCategories={categories} />
    </main>
  );
}

import { categoryApi, taskApi } from "@/lib/api";
import { TaskManager } from "./components/client/TaskManager";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar } from "lucide-react";

// 動的レンダリングを有効化
export const dynamic = "force-dynamic";

export default async function Home() {
  // サーバーサイドでデータを取得
  const [tasks, categories] = await Promise.all([
    taskApi.getTasks(),
    categoryApi.getCategories(),
  ]);
  const today = format(new Date(), "yyyy年MM月dd日 (EEE)", { locale: ja });

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 max-w-lg sm:max-w-2xl flex flex-col gap-4 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center">
        タスク管理アプリ
      </h1>
      <div className="flex justify-center items-center mb-2">
        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
        <span className="text-xs text-gray-400">{today}</span>
      </div>
      <TaskManager initialTasks={tasks} initialCategories={categories} />
    </main>
  );
}

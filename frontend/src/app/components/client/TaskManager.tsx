"use client";

import TaskFilter from "@/components/TaskFilter";
import TaskList from "@/components/TaskList";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Category, useCategoryStore } from "@/store/categoryStore";
import { Task, useTaskStore } from "@/store/taskStore";
import dynamic from "next/dynamic";
import { useEffect } from "react";
// 遅延ローディング用のコンポーネント
const TaskModal = dynamic(() => import("@/components/TaskModal"), {
  loading: () => <div className="p-4 text-center">読み込み中...</div>,
  ssr: false,
});

// モバイル用のTaskFilterのみ遅延ローディング
const MobileTaskFilter = dynamic(() => import("@/components/TaskFilter"), {
  loading: () => <div className="p-4 text-center">読み込み中...</div>,
  ssr: false,
});

interface TaskManagerProps {
  initialTasks: Task[];
  initialCategories: Category[];
}

export function TaskManager({
  initialTasks,
  initialCategories,
}: TaskManagerProps) {
  const { setTasks } = useTaskStore();
  const { setCategories } = useCategoryStore();

  useEffect(() => {
    setTasks(initialTasks);
    setCategories(initialCategories);
  }, [initialTasks, initialCategories, setTasks, setCategories]);

  return (
    <>
      <TaskModal />
      {/* PC用: インライン表示 */}
      <div className="hidden md:block">
        <TaskFilter />
      </div>
      {/* モバイル用: Drawerで表示 */}
      <div className="block md:hidden">
        <div className="fixed bottom-0 left-0 w-full z-40 px-2 pb-4 ">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="flex flex-col items-center w-full bg-white/90 cursor-pointer">
                {/* ハンドル部分 */}
                <div className="bg-gray-300 rounded-full w-12 h-1.5 my-2" />
                {/* ラベル */}
                <span className="text-sm text-gray-600">フィルターを開く</span>
              </div>
            </DrawerTrigger>
            <DrawerContent className="pb-4">
              <DrawerTitle className="text-center py-2">フィルター</DrawerTitle>
              <MobileTaskFilter />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className="flex-1 pb-12">
        <TaskList />
      </div>
    </>
  );
}

"use client";

import TaskFilter from "@/components/TaskFilter";
import TaskList from "@/components/TaskList";
import TaskModal from "@/components/TaskModal";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Category, useCategoryStore } from "@/store/categoryStore";
import { Task, useTaskStore } from "@/store/taskStore";
import { useEffect } from "react";

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
    <div className="space-y-4">
      {/* PC用: インライン表示 */}
      <div className="hidden md:block">
        <TaskFilter />
      </div>
      {/* モバイル用: Drawerで表示 */}
      <div className="block md:hidden">
        <div className="fixed bottom-0 left-0 w-full z-40 px-2 pb-4">
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
              <TaskFilter />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className="flex-1 pb-12">
        <TaskList />
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <button className="fixed bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary/90">
            <span className="sr-only">タスクを追加</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>タスクを追加</DrawerTitle>
          <TaskModal />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

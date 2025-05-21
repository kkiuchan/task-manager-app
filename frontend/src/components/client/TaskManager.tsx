"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCategoryStore } from "@/store/categoryStore";
import { useTaskStore } from "@/store/taskStore";
import { Category, Task } from "@/types";
import { useEffect } from "react";
import TaskFilter from "../TaskFilter";
import TaskList from "../TaskList";
import TaskModal from "../TaskModal";

interface TaskManagerProps {
  initialTasks: Task[];
  initialCategories: Category[];
}

export default function TaskManager({
  initialTasks,
  initialCategories,
}: TaskManagerProps) {
  const setTasks = useTaskStore((state) => state.setTasks);
  const setCategories = useCategoryStore((state) => state.setCategories);

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
              <TaskFilter />
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

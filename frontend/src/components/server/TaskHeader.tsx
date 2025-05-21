import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar } from "lucide-react";

export default function TaskHeader() {
  const today = format(new Date(), "yyyy年MM月dd日 (EEE)", { locale: ja });

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center">
        タスク管理アプリ
      </h1>
      <div className="flex justify-center items-center mb-2">
        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
        <span className="text-xs text-gray-400">{today}</span>
      </div>
    </>
  );
}

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar } from "lucide-react";

export function TaskHeader() {
  const today = format(new Date(), "yyyy年MM月dd日", { locale: ja });

  return (
    <div className="flex items-center gap-2 mb-4">
      <Calendar className="w-5 h-5" />
      <h1 className="text-2xl font-bold">{today}</h1>
    </div>
  );
}

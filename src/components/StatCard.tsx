import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: "blue" | "emerald" | "amber" | "purple";
}

export function StatCard({ title, value, icon: Icon, trend, color = "blue" }: StatCardProps) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <Card className="border-slate-100 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${colors[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              {trend}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-slate-500">{title}</h3>
          <div className="text-2xl font-bold text-slate-900">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
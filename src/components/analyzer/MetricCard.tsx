import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  color?: "blue" | "green" | "amber" | "purple";
}

export function MetricCard({ 
  title, 
  value, 
  subtext, 
  trend = "neutral", 
  icon: Icon,
  color = "blue" 
}: MetricCardProps) {
  
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-2 rounded-lg", colorStyles[color])}>
            <Icon className="w-5 h-5" />
          </div>
          {trend === "up" && <TrendingUp className="w-4 h-4 text-emerald-500" />}
          {trend === "down" && <TrendingDown className="w-4 h-4 text-rose-500" />}
          {trend === "neutral" && <Minus className="w-4 h-4 text-slate-300" />}
        </div>
        
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-slate-500">{title}</h3>
          <div className="text-2xl font-bold text-slate-900">{value}</div>
          <p className="text-xs text-slate-400">{subtext}</p>
        </div>
      </CardContent>
    </Card>
  );
}
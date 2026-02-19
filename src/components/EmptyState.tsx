import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center px-4">
        <div className="w-16 h-16 bg-white border border-slate-100 shadow-sm text-slate-400 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 max-w-sm mb-6 text-sm leading-relaxed">
          {description}
        </p>
        {action && <div>{action}</div>}
      </CardContent>
    </Card>
  );
}
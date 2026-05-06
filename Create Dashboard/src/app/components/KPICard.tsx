import { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
  className?: string;
}

export function KPICard({ title, value, change, changeType = "neutral", icon, className = "" }: KPICardProps) {
  const changeColors = {
    positive: "text-[var(--success)]",
    negative: "text-[var(--error)]",
    neutral: "text-[var(--muted-foreground)]"
  };

  return (
    <div className={`glass rounded-xl p-6 hover:glow-blue transition-all ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-[var(--muted-foreground)] text-sm">{title}</span>
        {icon && <div className="text-[var(--cyan)]">{icon}</div>}
      </div>
      <div className="text-3xl font-semibold text-[var(--foreground)] mb-2">{value}</div>
      {change && (
        <div className={`text-sm ${changeColors[changeType]} flex items-center gap-1`}>
          {changeType === "positive" && "↗"}
          {changeType === "negative" && "↘"}
          {change}
        </div>
      )}
    </div>
  );
}

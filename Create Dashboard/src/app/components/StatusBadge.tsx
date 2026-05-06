interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info" | "processing";
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ status, children, className = "" }: StatusBadgeProps) {
  const statusStyles = {
    success: "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/30",
    warning: "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/30",
    error: "bg-[var(--error)]/10 text-[var(--error)] border-[var(--error)]/30",
    info: "bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] border-[var(--electric-blue)]/30",
    processing: "bg-[var(--cyan)]/10 text-[var(--cyan)] border-[var(--cyan)]/30 pulse-glow"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status]} ${className}`}>
      {status === "processing" && (
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse"></span>
      )}
      {children}
    </span>
  );
}

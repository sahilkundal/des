import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false
}: ButtonProps) {
  const baseStyles = "rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-[var(--electric-blue)] text-white hover:bg-[#2563EB] glow-blue",
    secondary: "glass text-[var(--foreground)] hover:bg-[var(--muted)]",
    danger: "bg-[var(--error)] text-white hover:bg-[#DC2626]",
    ghost: "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

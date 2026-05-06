import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface AIChatMessageProps {
  message: string | ReactNode;
  type?: "ai" | "user";
  streaming?: boolean;
}

export function AIChatMessage({ message, type = "ai", streaming = false }: AIChatMessageProps) {
  return (
    <div className={`flex gap-3 ${type === "user" ? "flex-row-reverse" : ""} mb-4`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        type === "ai"
          ? "bg-gradient-to-br from-[var(--electric-blue)] to-[var(--cyan)] glow-blue"
          : "bg-[var(--muted)]"
      }`}>
        {type === "ai" && <Sparkles className="w-4 h-4 text-white" />}
        {type === "user" && <span className="text-sm">U</span>}
      </div>
      <div className={`flex-1 ${type === "user" ? "text-right" : ""}`}>
        <div className={`inline-block glass rounded-xl px-4 py-3 ${type === "user" ? "bg-[var(--electric-blue)]/20" : ""}`}>
          <div className="text-[var(--foreground)]">{message}</div>
          {streaming && (
            <div className="flex gap-1 mt-2">
              <div className="w-2 h-2 bg-[var(--cyan)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-[var(--cyan)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-[var(--cyan)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

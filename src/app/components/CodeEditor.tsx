import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeEditorProps {
  code: string;
  language?: string;
  onChange?: (code: string) => void;
  readonly?: boolean;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeEditor({
  code,
  language = "typescript",
  onChange,
  readonly = false,
  showLineNumbers = true,
  className = ""
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className={`glass rounded-xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between bg-[var(--muted)] px-4 py-2 border-b border-[var(--border)]">
        <span className="text-sm text-[var(--muted-foreground)]">{language}</span>
        <button
          onClick={handleCopy}
          className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1"
        >
          {copied ? <Check className="w-4 h-4 text-[var(--success)]" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="relative">
        {readonly ? (
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm text-[var(--foreground)] font-mono">
              {showLineNumbers && (
                <div className="float-left pr-4 text-[var(--muted-foreground)] select-none">
                  {lines.map((_, i) => (
                    <div key={`line-${i}`}>{i + 1}</div>
                  ))}
                </div>
              )}
              <code>{code}</code>
            </pre>
          </div>
        ) : (
          <textarea
            value={code}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full p-4 bg-transparent text-sm text-[var(--foreground)] font-mono resize-none focus:outline-none min-h-[300px]"
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
}

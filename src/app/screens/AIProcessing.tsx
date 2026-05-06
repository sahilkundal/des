import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AIChatMessage } from "../components/AIChat";
import { LoadingSkeleton, LoadingCodeBlock } from "../components/LoadingSkeleton";
import { FileSearch, CheckCircle, AlertCircle, Code, Network } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";

export function AIProcessing() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const steps = [
    { label: "Reading files", icon: FileSearch, status: "completed" },
    { label: "Analyzing rules", icon: Code, status: "processing" },
    { label: "Validating dependencies", icon: Network, status: "pending" },
    { label: "Generating conditions", icon: CheckCircle, status: "pending" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < 3) return prev + 1;
        clearInterval(interval);
        setTimeout(() => navigate(`/review/${threadId}`), 1000);
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [threadId, navigate]);

  return (
    <div className="h-full flex">
      <div className="flex-1 border-r border-[var(--border)] flex flex-col">
        <div className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm px-6 py-4">
          <h2 className="text-lg font-semibold">AI Reasoning</h2>
          <p className="text-sm text-[var(--muted-foreground)]">Processing your request...</p>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <AIChatMessage
            type="user"
            message="Create validation rules for user registration with email verification and password strength checks"
          />

          <AIChatMessage
            type="ai"
            message="I'll help you create comprehensive validation rules. Let me analyze the requirements and existing codebase..."
          />

          {step >= 0 && (
            <AIChatMessage
              type="ai"
              message={
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileSearch className="w-4 h-4 text-[var(--cyan)]" />
                    <span className="font-semibold">Reading files...</span>
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)] space-y-1">
                    <div>✓ Found auth/validators.ts</div>
                    <div>✓ Found user/schema.ts</div>
                    <div>✓ Found config/validation-rules.ts</div>
                  </div>
                </div>
              }
            />
          )}

          {step >= 1 && (
            <AIChatMessage
              type="ai"
              message={
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-[var(--cyan)]" />
                    <span className="font-semibold">Analyzing rules...</span>
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)] space-y-1">
                    <div>• Email validation pattern detected</div>
                    <div>• Password strength: minimum 8 chars, mixed case required</div>
                    <div>• No existing email verification flow</div>
                  </div>
                </div>
              }
            />
          )}

          {step >= 2 && (
            <AIChatMessage
              type="ai"
              message={
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Network className="w-4 h-4 text-[var(--cyan)]" />
                    <span className="font-semibold">Validating dependencies...</span>
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)] space-y-1">
                    <div>✓ validator library v13.9.0</div>
                    <div>✓ bcrypt for password hashing</div>
                    <div>✓ nodemailer for email verification</div>
                  </div>
                </div>
              }
            />
          )}

          {step >= 3 && (
            <AIChatMessage
              type="ai"
              message={
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[var(--success)]" />
                    <span className="font-semibold">Code generation complete!</span>
                  </div>
                  <div className="text-sm">
                    I've generated validation rules with email verification, password strength checks, and comprehensive error handling. Ready for review.
                  </div>
                </div>
              }
            />
          )}

          {step < 3 && <AIChatMessage type="ai" message="" streaming />}
        </div>
      </div>

      <div className="w-[500px] flex flex-col">
        <div className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm px-6 py-4">
          <h2 className="text-lg font-semibold">Processing Status</h2>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-semibold mb-4">Progress Timeline</h3>
            <div className="space-y-4">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === step;
                const isCompleted = i < step;
                const isPending = i > step;

                return (
                  <div key={s.label} className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? "bg-[var(--success)]/20 text-[var(--success)]"
                          : isActive
                          ? "bg-[var(--cyan)]/20 text-[var(--cyan)] pulse-glow"
                          : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{s.label}</div>
                      <div className="mt-1">
                        {isCompleted && <StatusBadge status="success">Completed</StatusBadge>}
                        {isActive && <StatusBadge status="processing">Processing...</StatusBadge>}
                        {isPending && <StatusBadge status="info">Pending</StatusBadge>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-semibold mb-4">Live Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[var(--muted-foreground)] text-sm">Tokens Used</span>
                <span className="font-semibold">{Math.floor(1250 + step * 500)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--muted-foreground)] text-sm">Files Analyzed</span>
                <span className="font-semibold">{Math.min(step * 3, 12)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--muted-foreground)] text-sm">Time Elapsed</span>
                <span className="font-semibold">{step * 2}s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--muted-foreground)] text-sm">Estimated Completion</span>
                <span className="font-semibold">{Math.max(0, (3 - step) * 2)}s</span>
              </div>
            </div>
          </div>

          {step < 2 ? (
            <LoadingCodeBlock />
          ) : (
            <div className="glass rounded-xl p-6">
              <h3 className="text-sm font-semibold mb-3">Rule Building Visualization</h3>
              <div className="space-y-2">
                <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan)] transition-all duration-500"
                    style={{ width: `${((step + 1) / 4) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-[var(--muted-foreground)] text-right">
                  {Math.round(((step + 1) / 4) * 100)}% complete
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

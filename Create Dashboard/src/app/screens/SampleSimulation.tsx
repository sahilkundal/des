import { useState } from "react";
import { useParams } from "react-router";
import { StatusBadge } from "../components/StatusBadge";
import { Upload, CheckCircle, XCircle, AlertTriangle, FileText } from "lucide-react";
import { useChat } from "../contexts/ChatContext";

export function SampleSimulation() {
  const { threadId } = useParams();
  const { addMessage, setCurrentStep } = useChat();
  const [isRunning, setIsRunning] = useState(false);

  const testCases = [
    {
      id: "DI-102",
      input: "user@example.com, Password123!",
      status: "passed",
      time: "145ms",
      result: "Validation passed, token generated",
    },
    {
      id: "DI-103",
      input: "invalid-email, weak",
      status: "failed",
      time: "98ms",
      result: "Email format invalid, password too weak",
    },
    {
      id: "DI-104",
      input: "test@test.com, SecureP@ss123",
      status: "passed",
      time: "132ms",
      result: "Validation passed, token generated",
    },
    {
      id: "DI-105",
      input: "user@domain, P@ssw0rd",
      status: "warning",
      time: "156ms",
      result: "Warning: Common password detected",
    },
  ];

  const handleRunSimulation = () => {
    setIsRunning(true);
    addMessage({
      type: "user",
      message: "Run simulation on test devices",
    });

    setTimeout(() => {
      setIsRunning(false);
      setCurrentStep("simulation-passed");
      addMessage({
        type: "ai",
        message: "Sample simulation complete! Tests passed with 50% success rate. Ready for large-scale testing?",
      });
    }, 3000);
  };

  return (
    <div className="h-full flex">
      <div className="flex-1 border-r border-[var(--border)] flex flex-col">
        <div className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm px-6 py-4">
          <h2 className="text-lg font-semibold">Sample Simulation</h2>
          <p className="text-sm text-[var(--muted-foreground)]">Test results - use chat to upload CSV, enter device IDs, or auto-select devices</p>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="glass rounded-xl p-6 mb-6 border-2 border-dashed border-[var(--cyan)]/30">
            <div className="flex flex-col items-center justify-center py-8">
              <Upload className="w-12 h-12 text-[var(--cyan)] mb-4" />
              <h3 className="font-semibold mb-2">Waiting for Test Data</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                💬 Use the chat panel to upload CSV, enter device IDs, or let AI select devices automatically
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Test Results {isRunning && "(Running...)"}</h3>
          </div>

          <div className="space-y-3">
            {testCases.map((test) => (
              <div
                key={test.id}
                className={`glass rounded-xl p-4 border ${
                  test.status === "passed"
                    ? "border-[var(--success)]/30"
                    : test.status === "failed"
                    ? "border-[var(--error)]/30"
                    : "border-[var(--warning)]/30"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        test.status === "passed"
                          ? "bg-[var(--success)]/20 text-[var(--success)]"
                          : test.status === "failed"
                          ? "bg-[var(--error)]/20 text-[var(--error)]"
                          : "bg-[var(--warning)]/20 text-[var(--warning)]"
                      }`}
                    >
                      {test.status === "passed" ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : test.status === "failed" ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold">{test.id}</div>
                      <div className="text-sm text-[var(--muted-foreground)]">{test.input}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[var(--muted-foreground)]">{test.time}</span>
                    <StatusBadge
                      status={
                        test.status === "passed" ? "success" : test.status === "failed" ? "error" : "warning"
                      }
                    >
                      {test.status}
                    </StatusBadge>
                  </div>
                </div>
                <div className="bg-[var(--muted)]/20 rounded-lg p-3">
                  <div className="text-sm text-[var(--muted-foreground)]">Result:</div>
                  <div className="text-sm mt-1">{test.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[400px] flex flex-col">
        <div className="border-b border-[var(--border)] px-6 py-4">
          <h2 className="text-lg font-semibold">Simulation Logs</h2>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-4">
          <div className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-3">Execution Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Total Tests</span>
                <span className="font-semibold">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Passed</span>
                <span className="font-semibold text-[var(--success)]">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Failed</span>
                <span className="font-semibold text-[var(--error)]">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Warnings</span>
                <span className="font-semibold text-[var(--warning)]">1</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--border)]">
                <span className="text-[var(--muted-foreground)]">Success Rate</span>
                <span className="font-semibold">50%</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Activity Stream
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[var(--success)] rounded-full mt-1.5"></div>
                <div className="flex-1">
                  <div className="text-[var(--muted-foreground)]">12:45:32</div>
                  <div>Test DI-102 passed</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[var(--error)] rounded-full mt-1.5"></div>
                <div className="flex-1">
                  <div className="text-[var(--muted-foreground)]">12:45:33</div>
                  <div>Test DI-103 failed: Email validation error</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[var(--success)] rounded-full mt-1.5"></div>
                <div className="flex-1">
                  <div className="text-[var(--muted-foreground)]">12:45:34</div>
                  <div>Test DI-104 passed</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[var(--warning)] rounded-full mt-1.5"></div>
                <div className="flex-1">
                  <div className="text-[var(--muted-foreground)]">12:45:35</div>
                  <div>Test DI-105 warning: Common password</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-3">AI-Generated Test Data</h3>
            <div className="text-xs font-mono bg-[var(--muted)]/20 rounded p-3 space-y-1">
              <div>validEmail@test.com</div>
              <div>SecureP@ssword123</div>
              <div>---</div>
              <div>invalid@.com</div>
              <div>weak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

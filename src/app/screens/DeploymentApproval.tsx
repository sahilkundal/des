import { useParams } from "react-router";
import { StatusBadge } from "../components/StatusBadge";
import { GitPullRequest, CheckCircle, Clock, GitBranch, Users } from "lucide-react";

export function DeploymentApproval() {
  const { threadId } = useParams();

  const environments = [
    { name: "Development", status: "deployed", time: "2 minutes ago", branch: "feature/user-validation" },
    { name: "Staging", status: "ready", time: "Ready to deploy", branch: "main" },
    { name: "Production", status: "pending", time: "Awaiting approval", branch: "main" },
  ];

  const pipeline = [
    { name: "Build", status: "completed", time: "45s" },
    { name: "Unit Tests", status: "completed", time: "1m 23s" },
    { name: "Integration Tests", status: "completed", time: "2m 15s" },
    { name: "Security Scan", status: "processing", time: "In progress..." },
    { name: "Performance Tests", status: "pending", time: "Pending" },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm px-6 py-4">
        <h1 className="text-lg font-semibold">Deployment & PR Approval</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Review deployment status - use chat to approve or request changes</p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="glass rounded-xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--electric-blue)]/20 rounded-xl flex items-center justify-center">
                  <GitPullRequest className="w-6 h-6 text-[var(--electric-blue)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">PR #247: Add user validation rules</h2>
                  <p className="text-[var(--muted-foreground)] text-sm">
                    Created from <code className="bg-[var(--muted)] px-2 py-0.5 rounded">feature/user-validation</code>{" "}
                    into <code className="bg-[var(--muted)] px-2 py-0.5 rounded">main</code>
                  </p>
                </div>
              </div>
              <StatusBadge status="processing">In Review</StatusBadge>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-semibold text-[var(--success)]">+247</div>
                <div className="text-xs text-[var(--muted-foreground)]">Lines Added</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-[var(--error)]">-18</div>
                <div className="text-xs text-[var(--muted-foreground)]">Lines Removed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">3</div>
                <div className="text-xs text-[var(--muted-foreground)]">Files Changed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">12</div>
                <div className="text-xs text-[var(--muted-foreground)]">Commits</div>
              </div>
            </div>

            <div className="glass rounded-lg p-3 border-l-4 border-[var(--cyan)]">
              <p className="text-sm text-[var(--muted-foreground)]">
                💬 Use the chat panel to approve this PR and proceed with testing, or request changes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {environments.map((env) => (
              <div key={env.name} className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{env.name}</h3>
                  <StatusBadge
                    status={
                      env.status === "deployed" ? "success" : env.status === "processing" ? "processing" : "info"
                    }
                  >
                    {env.status}
                  </StatusBadge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <GitBranch className="w-4 h-4" />
                    {env.branch}
                  </div>
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <Clock className="w-4 h-4" />
                    {env.time}
                  </div>
                </div>
                {env.status === "ready" && (
                  <div className="mt-4 text-xs text-center text-[var(--cyan)]">
                    Ready to deploy
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">CI/CD Pipeline</h2>
            <div className="space-y-3">
              {pipeline.map((stage) => (
                <div key={stage.name} className="flex items-center gap-4 p-4 bg-[var(--muted)]/20 rounded-lg">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      stage.status === "completed"
                        ? "bg-[var(--success)]/20 text-[var(--success)]"
                        : stage.status === "processing"
                        ? "bg-[var(--cyan)]/20 text-[var(--cyan)]"
                        : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                    }`}
                  >
                    {stage.status === "completed" ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : stage.status === "processing" ? (
                      <div className="w-5 h-5 border-2 border-[var(--cyan)] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{stage.name}</div>
                    <div className="text-sm text-[var(--muted-foreground)]">{stage.time}</div>
                  </div>
                  <StatusBadge
                    status={
                      stage.status === "completed" ? "success" : stage.status === "processing" ? "processing" : "info"
                    }
                  >
                    {stage.status}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Reviewers
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[var(--muted)]/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--purple)] to-[var(--electric-blue)] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    JD
                  </div>
                  <div>
                    <div className="font-medium">Jane Doe</div>
                    <div className="text-xs text-[var(--muted-foreground)]">Senior Developer</div>
                  </div>
                </div>
                <StatusBadge status="success">Approved</StatusBadge>
              </div>
              <div className="flex items-center justify-between p-3 bg-[var(--muted)]/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--cyan)] to-[var(--electric-blue)] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    AS
                  </div>
                  <div>
                    <div className="font-medium">Alex Smith</div>
                    <div className="text-xs text-[var(--muted-foreground)]">QA Lead</div>
                  </div>
                </div>
                <StatusBadge status="processing">Reviewing</StatusBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

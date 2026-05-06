import { useState } from "react";
import { useParams } from "react-router";
import { CodeEditor } from "../components/CodeEditor";
import { StatusBadge } from "../components/StatusBadge";
import { AIChatMessage } from "../components/AIChat";
import { CheckCircle, AlertTriangle } from "lucide-react";

export function CodeReview() {
  const { threadId } = useParams();
  const [activeTab, setActiveTab] = useState<"current" | "diff">("current");

  const generatedCode = `export const validateUserRegistration = (data: RegistrationData): ValidationResult => {
  const errors: ValidationError[] = [];

  // Email validation
  if (!validator.isEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Invalid email format',
      code: 'INVALID_EMAIL'
    });
  }

  // Password strength validation
  const passwordStrength = checkPasswordStrength(data.password);
  if (passwordStrength.score < 3) {
    errors.push({
      field: 'password',
      message: 'Password is too weak',
      code: 'WEAK_PASSWORD',
      details: passwordStrength.feedback
    });
  }

  // Email verification token generation
  if (errors.length === 0) {
    const verificationToken = generateSecureToken();
    return {
      valid: true,
      verificationToken,
      data: sanitizeUserData(data)
    };
  }

  return { valid: false, errors };
};`;

  const rules = [
    {
      condition: "Email format validation",
      explanation: "Validates email using RFC 5322 standard",
      confidence: 98,
      risk: "low",
      status: "validated",
      dependencies: "validator@13.9.0",
    },
    {
      condition: "Password strength >= 3",
      explanation: "Checks for minimum 8 characters, mixed case, numbers, special chars",
      confidence: 95,
      risk: "low",
      status: "validated",
      dependencies: "custom checkPasswordStrength()",
    },
    {
      condition: "Email verification token",
      explanation: "Generates cryptographically secure token for email verification",
      confidence: 92,
      risk: "medium",
      status: "warning",
      dependencies: "crypto.randomBytes",
    },
    {
      condition: "Data sanitization",
      explanation: "Removes potentially malicious input before storage",
      confidence: 97,
      risk: "low",
      status: "validated",
      dependencies: "validator.escape",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm px-6 py-4">
        <h1 className="text-lg font-semibold">Code Review</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Review generated code - use chat to approve, request changes, or regenerate</p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 border-r border-[var(--border)] flex flex-col">
          <div className="border-b border-[var(--border)] px-6 py-3">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("current")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "current"
                    ? "bg-[var(--electric-blue)] text-white"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                Generated Code
              </button>
              <button
                onClick={() => setActiveTab("diff")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "diff"
                    ? "bg-[var(--electric-blue)] text-white"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                Diff Changes
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <CodeEditor code={generatedCode} language="typescript" readonly showLineNumbers />

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Rule Conditions</h3>
              <div className="glass rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase">
                        Condition
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase">
                        Explanation
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase">
                        AI Confidence
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase">
                        Risk Level
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rules.map((rule) => (
                      <tr key={rule.condition} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/20">
                        <td className="px-4 py-3 font-medium">{rule.condition}</td>
                        <td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">{rule.explanation}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan)]"
                                style={{ width: `${rule.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold">{rule.confidence}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge
                            status={rule.risk === "low" ? "success" : rule.risk === "medium" ? "warning" : "error"}
                          >
                            {rule.risk}
                          </StatusBadge>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={rule.status === "validated" ? "success" : "warning"}>
                            {rule.status}
                          </StatusBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[400px] flex flex-col">
          <div className="border-b border-[var(--border)] px-6 py-4">
            <h2 className="text-lg font-semibold">AI Analysis</h2>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <AIChatMessage
              type="ai"
              message={
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[var(--success)]" />
                    <span className="font-semibold">Code Generation Complete</span>
                  </div>
                  <p className="text-sm">
                    I've generated a comprehensive validation function with email verification, password strength
                    checking, and data sanitization.
                  </p>
                </div>
              }
            />

            <AIChatMessage
              type="ai"
              message={
                <div>
                  <h4 className="font-semibold mb-2">Key Features</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside text-[var(--muted-foreground)]">
                    <li>RFC 5322 compliant email validation</li>
                    <li>Password strength scoring (0-4 scale)</li>
                    <li>Secure verification token generation</li>
                    <li>XSS protection via data sanitization</li>
                  </ul>
                </div>
              }
            />

            <AIChatMessage
              type="ai"
              message={
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[var(--warning)]" />
                    Recommendations
                  </h4>
                  <ul className="text-sm space-y-1 text-[var(--muted-foreground)]">
                    <li>• Consider adding rate limiting for registration attempts</li>
                    <li>• Store verification tokens with expiration timestamps</li>
                    <li>• Add unit tests for edge cases</li>
                  </ul>
                </div>
              }
            />

            <div className="glass rounded-xl p-4 mt-4">
              <h4 className="font-semibold mb-3 text-sm">Dependencies</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">validator</span>
                  <span className="font-mono">v13.9.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">bcrypt</span>
                  <span className="font-mono">v5.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">nodemailer</span>
                  <span className="font-mono">v6.9.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

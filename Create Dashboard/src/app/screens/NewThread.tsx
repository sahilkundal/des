import { Sparkles, Shield, Code, MessageCircle } from "lucide-react";

export function NewThread() {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm px-6 py-4">
        <h1 className="text-2xl font-semibold">Create New Rule</h1>
        <p className="text-[var(--muted-foreground)] text-sm mt-1">
          Use the chat panel to describe your rule requirements
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[var(--electric-blue)] to-[var(--cyan)] rounded-2xl flex items-center justify-center glow-blue mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-semibold mb-4">Welcome to Agentic Rule Creation</h2>
          <p className="text-[var(--muted-foreground)] text-lg mb-8">
            I'm your AI assistant. Use the chat panel on the right to start creating rules. I'll guide you through the entire process.
          </p>

          <div className="glass rounded-xl p-6 mb-8 text-left">
            <div className="flex items-start gap-3 mb-4">
              <MessageCircle className="w-5 h-5 text-[var(--cyan)] mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">Try saying:</h3>
                <ul className="space-y-2 text-[var(--muted-foreground)]">
                  <li>"Create validation rules for user registration"</li>
                  <li>"Generate authentication rules for API endpoints"</li>
                  <li>"Build payment processing rules with fraud detection"</li>
                  <li>"Add data validation for form submissions"</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="glass rounded-xl p-6">
              <Shield className="w-8 h-8 text-[var(--success)] mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Validated & Secure</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Every rule is automatically validated for security vulnerabilities
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <Code className="w-8 h-8 text-[var(--purple)] mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Production Ready</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Generated code follows your team's standards
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <Sparkles className="w-8 h-8 text-[var(--cyan)] mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">AI Powered</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Advanced AI agents understand context
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

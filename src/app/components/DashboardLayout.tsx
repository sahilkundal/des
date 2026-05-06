import { Outlet, Link, useLocation } from "react-router";
import { Sparkles, Code, GitPullRequest, FlaskConical, TestTubes, Activity, BarChart3, Plus, Menu } from "lucide-react";
import { useState } from "react";
import { ChatPanel } from "./ChatPanel";
import { ChatProvider } from "../contexts/ChatContext";

export function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: "New Thread", href: "/", icon: Plus },
    { name: "AI Insights", href: "/insights", icon: BarChart3 },
  ];

  const recentThreads = [
    { id: "1", name: "Update auth rules", status: "processing" },
    { id: "2", name: "Payment validation", status: "deployed" },
    { id: "3", name: "User permissions", status: "testing" },
  ];

  return (
    <ChatProvider>
      <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)]">
        <aside className={`${sidebarOpen ? "w-64" : "w-16"} glass border-r border-[var(--border)] flex flex-col transition-all duration-300`}>
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[var(--electric-blue)] to-[var(--cyan)] rounded-lg flex items-center justify-center glow-blue">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold">Agentic Rules</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[var(--electric-blue)] text-white"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm">{item.name}</span>}
                </Link>
              );
            })}

            {sidebarOpen && (
              <>
                <div className="pt-6 pb-2">
                  <h3 className="px-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase">Recent Threads</h3>
                </div>
                {recentThreads.map((thread) => (
                  <Link
                    key={thread.id}
                    to={`/review/${thread.id}`}
                    className="block px-3 py-2 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    <div className="text-sm truncate">{thread.name}</div>
                    <div className="text-xs text-[var(--muted-foreground)] mt-0.5">{thread.status}</div>
                  </Link>
                ))}
              </>
            )}
          </nav>

          {sidebarOpen && (
            <div className="p-3 border-t border-[var(--border)]">
              <div className="glass rounded-lg p-3 text-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-[var(--success)]" />
                  <span className="text-[var(--muted-foreground)]">System Status</span>
                </div>
                <div className="text-[var(--success)]">All systems operational</div>
              </div>
            </div>
          )}
        </aside>

        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>

        <ChatPanel />
      </div>
    </ChatProvider>
  );
}

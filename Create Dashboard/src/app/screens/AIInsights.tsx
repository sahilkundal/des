import { KPICard } from "../components/KPICard";
import { StatusBadge } from "../components/StatusBadge";
import { AlertTriangle, Brain, Target, Lightbulb, CheckCircle, Zap } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function AIInsights() {
  const weeklyData = [
    { id: "mon", day: "Mon", rules: 12, deployments: 8, tests: 450 },
    { id: "tue", day: "Tue", rules: 18, deployments: 12, tests: 680 },
    { id: "wed", day: "Wed", rules: 15, deployments: 10, tests: 520 },
    { id: "thu", day: "Thu", rules: 22, deployments: 15, tests: 780 },
    { id: "fri", day: "Fri", rules: 19, deployments: 13, tests: 650 },
    { id: "sat", day: "Sat", rules: 8, deployments: 5, tests: 320 },
    { id: "sun", day: "Sun", rules: 6, deployments: 4, tests: 280 },
  ];

  const ruleTypesData = [
    { name: "Validation", value: 45, color: "var(--electric-blue)" },
    { name: "Authorization", value: 28, color: "var(--cyan)" },
    { name: "Transformation", value: 18, color: "var(--purple)" },
    { name: "Business Logic", value: 9, color: "var(--warning)" },
  ];

  const recommendations = [
    {
      title: "Optimize Email Validation Rule",
      description: "Current implementation shows 23% higher latency than average. Consider caching regex patterns.",
      impact: "high",
      savings: "~45ms per execution",
    },
    {
      title: "Consolidate Password Rules",
      description: "3 separate password validation rules detected. Merging could improve maintainability.",
      impact: "medium",
      savings: "Reduced complexity",
    },
    {
      title: "Add Rate Limiting",
      description: "Registration endpoint lacks rate limiting. Recommended for security best practices.",
      impact: "high",
      savings: "Prevent abuse",
    },
  ];

  const anomalies = [
    {
      time: "2 hours ago",
      type: "Performance Degradation",
      description: "Validation latency increased by 45% in Asia-East region",
      severity: "warning",
    },
    {
      time: "Yesterday",
      type: "Error Spike",
      description: "Email verification service had 12 timeouts between 14:00-14:30",
      severity: "error",
    },
    {
      time: "2 days ago",
      type: "Usage Pattern",
      description: "Unusual traffic spike (+340%) detected, likely bot activity",
      severity: "info",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm px-6 py-4">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <Brain className="w-5 h-5 text-[var(--purple)]" />
          AI Insights Dashboard
        </h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          Analytics and recommendations - use chat to request custom visualizations or export data
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <KPICard
            title="Total Rules Created"
            value="247"
            change="+12 this week"
            changeType="positive"
            icon={<Target />}
          />
          <KPICard
            title="Avg AI Confidence"
            value="94.3%"
            change="+2.1%"
            changeType="positive"
            icon={<Brain />}
          />
          <KPICard
            title="Deployment Success"
            value="98.7%"
            change="+1.2%"
            changeType="positive"
            icon={<CheckCircle />}
          />
          <KPICard
            title="Time Saved"
            value="147h"
            change="+23h"
            changeType="positive"
            icon={<Zap />}
          />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData} key="weekly-activity-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                />
                <Legend />
                <Bar dataKey="rules" fill="var(--electric-blue)" radius={[8, 8, 0, 0]} name="Rules Created" />
                <Bar dataKey="deployments" fill="var(--cyan)" radius={[8, 8, 0, 0]} name="Deployments" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Rule Types Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart key="rule-types-pie-chart">
                <Pie
                  data={ruleTypesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                >
                  {ruleTypesData.map((entry, index) => (
                    <Cell key={`rule-type-${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-[var(--warning)]" />
            <h3 className="text-lg font-semibold">AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.title}
                className={`p-4 rounded-lg border-l-4 ${
                  rec.impact === "high"
                    ? "bg-[var(--error)]/5 border-[var(--error)]"
                    : "bg-[var(--warning)]/5 border-[var(--warning)]"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{rec.title}</h4>
                  <StatusBadge status={rec.impact === "high" ? "error" : "warning"}>
                    {rec.impact} impact
                  </StatusBadge>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] mb-2">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--muted-foreground)]">Potential savings: {rec.savings}</span>
                  <span className="text-xs text-[var(--cyan)]">Ask in chat to apply</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Rule Effectiveness</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>User Validation Rules</span>
                  <span className="font-semibold">97.2%</span>
                </div>
                <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--success)] rounded-full" style={{ width: "97.2%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Payment Processing Rules</span>
                  <span className="font-semibold">94.8%</span>
                </div>
                <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--success)] rounded-full" style={{ width: "94.8%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Auth & Permissions</span>
                  <span className="font-semibold">98.5%</span>
                </div>
                <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--success)] rounded-full" style={{ width: "98.5%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Data Transformation</span>
                  <span className="font-semibold">91.3%</span>
                </div>
                <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--warning)] rounded-full" style={{ width: "91.3%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyData} key="performance-trends-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                />
                <Line type="monotone" dataKey="tests" stroke="var(--cyan)" strokeWidth={2} name="Tests Run" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-[var(--warning)]" />
            <h3 className="text-lg font-semibold">Anomaly Detection</h3>
          </div>
          <div className="space-y-3">
            {anomalies.map((anomaly) => (
              <div key={anomaly.type + anomaly.time} className="flex items-start gap-4 p-4 bg-[var(--muted)]/20 rounded-lg">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    anomaly.severity === "error"
                      ? "bg-[var(--error)]/20 text-[var(--error)]"
                      : anomaly.severity === "warning"
                      ? "bg-[var(--warning)]/20 text-[var(--warning)]"
                      : "bg-[var(--cyan)]/20 text-[var(--cyan)]"
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold">{anomaly.type}</h4>
                    <span className="text-xs text-[var(--muted-foreground)]">{anomaly.time}</span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">{anomaly.description}</p>
                </div>
                <StatusBadge
                  status={
                    anomaly.severity === "error" ? "error" : anomaly.severity === "warning" ? "warning" : "info"
                  }
                >
                  {anomaly.severity}
                </StatusBadge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

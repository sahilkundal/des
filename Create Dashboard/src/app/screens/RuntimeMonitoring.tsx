import { useState } from "react";
import { useParams } from "react-router";
import { KPICard } from "../components/KPICard";
import { StatusBadge } from "../components/StatusBadge";
import { Activity, AlertCircle, CheckCircle, Clock, Cpu, HardDrive, Network, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function RuntimeMonitoring() {
  const { threadId } = useParams();
  const [isLive, setIsLive] = useState(true);

  const performanceData = [
    { id: "p1", time: "12:00", latency: 45, throughput: 1250, errors: 2 },
    { id: "p2", time: "12:05", latency: 52, throughput: 1340, errors: 3 },
    { id: "p3", time: "12:10", latency: 48, throughput: 1420, errors: 1 },
    { id: "p4", time: "12:15", latency: 61, throughput: 1580, errors: 5 },
    { id: "p5", time: "12:20", latency: 55, throughput: 1690, errors: 2 },
    { id: "p6", time: "12:25", latency: 49, throughput: 1750, errors: 1 },
  ];

  const logs = [
    { time: "12:25:42", level: "info", message: "Rule execution completed for user-1234", node: "node-1" },
    { time: "12:25:41", level: "info", message: "Validation passed for request-5678", node: "node-2" },
    { time: "12:25:38", level: "warning", message: "High latency detected (78ms)", node: "node-3" },
    { time: "12:25:35", level: "error", message: "Timeout on email verification service", node: "node-1" },
    { time: "12:25:32", level: "info", message: "Cache hit for rule cache-key-abc", node: "node-2" },
    { time: "12:25:28", level: "info", message: "New rule deployed to production", node: "cluster" },
  ];

  const nodes = [
    { id: "node-1", status: "healthy", cpu: 45, memory: 62, requests: 1250 },
    { id: "node-2", status: "healthy", cpu: 38, memory: 58, requests: 1340 },
    { id: "node-3", status: "warning", cpu: 78, memory: 85, requests: 980 },
    { id: "node-4", status: "healthy", cpu: 42, memory: 64, requests: 1180 },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm px-6 py-4">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          Runtime Monitoring
          {isLive && <div className="w-2 h-2 bg-[var(--error)] rounded-full animate-pulse"></div>}
        </h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          Live metrics streaming - use chat to pause/resume or view insights
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-5 gap-4 mb-6">
          <KPICard title="Requests/min" value="1,750" change="+8.3%" changeType="positive" icon={<Zap />} />
          <KPICard title="Avg Latency" value="49ms" change="-12ms" changeType="positive" icon={<Clock />} />
          <KPICard title="Error Rate" value="0.06%" change="-0.02%" changeType="positive" icon={<AlertCircle />} />
          <KPICard title="Active Nodes" value="4/4" changeType="neutral" icon={<Network />} />
          <KPICard title="Queue Load" value="23" change="-15" changeType="positive" icon={<Activity />} />
        </div>

        <div className="glass rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData} key="runtime-performance-chart">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" stroke="var(--muted-foreground)" />
              <YAxis yAxisId="left" stroke="var(--muted-foreground)" />
              <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="latency" stroke="var(--cyan)" strokeWidth={2} name="Latency (ms)" />
              <Line yAxisId="right" type="monotone" dataKey="throughput" stroke="var(--electric-blue)" strokeWidth={2} name="Throughput" />
              <Line yAxisId="left" type="monotone" dataKey="errors" stroke="var(--error)" strokeWidth={2} name="Errors" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {nodes.map((node) => (
            <div key={node.id} className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">{node.id}</span>
                <StatusBadge status={node.status === "healthy" ? "success" : "warning"}>
                  {node.status}
                </StatusBadge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <Cpu className="w-4 h-4" />
                    CPU
                  </div>
                  <span className={node.cpu > 70 ? "text-[var(--warning)]" : ""}>{node.cpu}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <HardDrive className="w-4 h-4" />
                    Memory
                  </div>
                  <span className={node.memory > 80 ? "text-[var(--warning)]" : ""}>{node.memory}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <Activity className="w-4 h-4" />
                    Requests
                  </div>
                  <span>{node.requests.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Live Execution Logs</h3>
            <StatusBadge status="processing">Streaming</StatusBadge>
          </div>
          <div className="bg-[var(--background)] rounded-lg p-4 font-mono text-xs max-h-[400px] overflow-auto">
            {logs.map((log) => (
              <div key={log.time + log.message} className="flex items-start gap-4 py-2 border-b border-[var(--border)] last:border-0">
                <span className="text-[var(--muted-foreground)] shrink-0">{log.time}</span>
                <span
                  className={`shrink-0 uppercase font-semibold ${
                    log.level === "error"
                      ? "text-[var(--error)]"
                      : log.level === "warning"
                      ? "text-[var(--warning)]"
                      : "text-[var(--cyan)]"
                  }`}
                >
                  {log.level}
                </span>
                <span className="flex-1">{log.message}</span>
                <span className="text-[var(--muted-foreground)] shrink-0">[{log.node}]</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="glass rounded-xl p-6 border-l-4 border-[var(--success)]">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[var(--success)] mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">All Systems Operational</h4>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Cluster is healthy with optimal performance. No anomalies detected in the last hour.
                </p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 border-l-4 border-[var(--warning)]">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[var(--warning)] mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">High Load Warning</h4>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Node-3 CPU usage at 78%. Consider scaling if load continues to increase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useParams } from "react-router";
import { KPICard } from "../components/KPICard";
import { StatusBadge } from "../components/StatusBadge";
import { Server, AlertTriangle } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function LargeScaleTesting() {
  const { threadId } = useParams();

  const chartData = [
    { id: "t1", time: "00:00", tested: 1250, failed: 45 },
    { id: "t2", time: "00:05", tested: 2890, failed: 102 },
    { id: "t3", time: "00:10", tested: 4520, failed: 178 },
    { id: "t4", time: "00:15", tested: 6100, failed: 234 },
    { id: "t5", time: "00:20", tested: 7850, failed: 289 },
    { id: "t6", time: "00:25", tested: 9420, failed: 312 },
  ];

  const devices = [
    { id: "DEV-1001", type: "iOS", model: "iPhone 14", region: "US-West", status: "passed" },
    { id: "DEV-1002", type: "Android", model: "Galaxy S23", region: "EU-Central", status: "passed" },
    { id: "DEV-1003", type: "iOS", model: "iPhone 13", region: "Asia-East", status: "failed" },
    { id: "DEV-1004", type: "Android", model: "Pixel 7", region: "US-East", status: "passed" },
    { id: "DEV-1005", type: "iOS", model: "iPhone 15", region: "EU-West", status: "warning" },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm px-6 py-4">
        <h1 className="text-lg font-semibold">Large Scale Testing</h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          Testing results - use chat to apply filters, export data, or start monitoring
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <KPICard title="Devices Tested" value="9,420" change="+12.5%" changeType="positive" icon={<Server />} />
          <KPICard title="Success Rate" value="96.7%" change="+2.3%" changeType="positive" />
          <KPICard title="Failures" value="312" change="-5.2%" changeType="positive" />
          <KPICard title="Avg Runtime" value="145ms" change="+8ms" changeType="neutral" />
        </div>

        <div className="glass rounded-xl p-4 mb-6 border-l-4 border-[var(--cyan)]">
          <p className="text-sm">
            <span className="font-semibold">Current Filters:</span> All Products, All Device Types, All Regions
          </p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            💬 Use chat to apply filters: "Show only iOS devices in US-West" or "Filter by product Mobile App"
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Test Execution Timeline</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData} key="test-execution-timeline">
                <defs>
                  <linearGradient id="colorTestedLST" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--electric-blue)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--electric-blue)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                />
                <Area type="monotone" dataKey="tested" stroke="var(--electric-blue)" fillOpacity={1} fill="url(#colorTestedLST)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Failure Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} key="failure-distribution-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                />
                <Bar dataKey="failed" fill="var(--error)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Device Execution Details</h3>
            <div className="flex items-center gap-2">
              <StatusBadge status="processing">Live</StatusBadge>
              <span className="text-sm text-[var(--muted-foreground)]">{devices.length} active simulations</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase">
                    Device ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase">
                    Model
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase">
                    Region
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr key={device.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/10">
                    <td className="px-4 py-3 font-mono text-sm">{device.id}</td>
                    <td className="px-4 py-3">{device.type}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{device.model}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{device.region}</td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        status={
                          device.status === "passed" ? "success" : device.status === "failed" ? "error" : "warning"
                        }
                      >
                        {device.status}
                      </StatusBadge>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">
                      Ask in chat
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass rounded-xl p-6 mt-6 border-l-4 border-[var(--warning)]">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[var(--warning)] mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1">Failure Cluster Detected</h4>
              <p className="text-sm text-[var(--muted-foreground)]">
                Higher than expected failure rate in Asia-East region (7.2% vs. avg 3.3%). Possible network latency
                issues affecting validation timeouts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

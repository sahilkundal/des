import { createBrowserRouter } from "react-router";
import { NewThread } from "./screens/NewThread";
import { AIProcessing } from "./screens/AIProcessing";
import { CodeReview } from "./screens/CodeReview";
import { DeploymentApproval } from "./screens/DeploymentApproval";
import { SampleSimulation } from "./screens/SampleSimulation";
import { LargeScaleTesting } from "./screens/LargeScaleTesting";
import { RuntimeMonitoring } from "./screens/RuntimeMonitoring";
import { AIInsights } from "./screens/AIInsights";
import { DashboardLayout } from "./components/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: NewThread },
      { path: "processing/:threadId", Component: AIProcessing },
      { path: "review/:threadId", Component: CodeReview },
      { path: "deployment/:threadId", Component: DeploymentApproval },
      { path: "simulation/:threadId", Component: SampleSimulation },
      { path: "testing/:threadId", Component: LargeScaleTesting },
      { path: "monitoring/:threadId", Component: RuntimeMonitoring },
      { path: "insights", Component: AIInsights },
    ],
  },
]);

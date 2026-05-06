import { useState, useRef, useEffect } from "react";
import { useChat } from "../contexts/ChatContext";
import { useNavigate, useLocation } from "react-router";
import { Send, X, Maximize2, Minimize2, Sparkles } from "lucide-react";
import { Button } from "./Button";

export function ChatPanel() {
  const { messages, addMessage, currentStep, setCurrentStep, updateContext, chatContext } = useChat();
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = () => {
    if (!input.trim()) return;

    const userInput = input.toLowerCase();

    // Add user message
    addMessage({
      type: "user",
      message: input,
    });

    updateContext("lastUserInput", input);

    // AI Response Logic based on current step and input
    setTimeout(() => {
      if (currentStep === "initial" || location.pathname === "/") {
        // User is creating a new rule
        updateContext("rulePrompt", input);
        setCurrentStep("analyzing");

        addMessage({
          type: "ai",
          message: (
            <div className="space-y-2">
              <p>Perfect! I'll analyze your request and check if we have any similar existing rules...</p>
              <div className="text-sm text-[var(--muted-foreground)] mt-2">
                <div>✓ Searching existing codebase...</div>
                <div>✓ Finding similar patterns...</div>
                <div>✓ Reading relevant files...</div>
              </div>
            </div>
          ),
        });

        setTimeout(() => {
          const threadId = Date.now().toString();
          updateContext("threadId", threadId);
          navigate(`/processing/${threadId}`);

          addMessage({
            type: "ai",
            message: "I found similar validation rules in your codebase! I'm now generating optimized code based on your requirements and existing patterns...",
          });

          setTimeout(() => {
            navigate(`/review/${threadId}`);
            setCurrentStep("code-review");

            addMessage({
              type: "ai",
              message: "Code generation complete! I've created the rule with 96% confidence. Please review the code. You can:",
              actions: [
                {
                  label: "Approve & Create PR",
                  onClick: () => handleCodeApproval(threadId),
                  variant: "primary",
                },
                {
                  label: "Request Changes",
                  onClick: () => {
                    addMessage({
                      type: "user",
                      message: "Request changes",
                    });
                    setTimeout(() => {
                      addMessage({
                        type: "ai",
                        message: "What specific changes would you like me to make to the code?",
                      });
                    }, 500);
                  },
                  variant: "secondary",
                },
                {
                  label: "Regenerate",
                  onClick: () => {
                    addMessage({
                      type: "user",
                      message: "Regenerate the code",
                    });
                    setTimeout(() => {
                      addMessage({
                        type: "ai",
                        message: "I'll regenerate the code with a different approach. One moment...",
                      });
                    }, 500);
                  },
                  variant: "secondary",
                },
              ],
            });
          }, 4000);
        }, 3000);
      } else if (currentStep === "code-review") {
        // User is reviewing code
        if (userInput.includes("change") || userInput.includes("modify") || userInput.includes("update")) {
          addMessage({
            type: "ai",
            message: "I'll update the code based on your feedback: " + input,
          });
          setTimeout(() => {
            addMessage({
              type: "ai",
              message: "Code updated! Please review the changes. Ready to create a PR?",
              actions: [
                {
                  label: "Approve & Create PR",
                  onClick: () => {
                    const tid = chatContext.threadId || Date.now().toString();
                    handleCodeApproval(tid);
                  },
                  variant: "primary",
                },
              ],
            });
          }, 2000);
        } else if (userInput.includes("approve") || userInput.includes("looks good") || userInput.includes("create pr")) {
          const tid = chatContext.threadId || Date.now().toString();
          handleCodeApproval(tid);
        } else {
          addMessage({
            type: "ai",
            message: "I can help you with:\n• Approve and create PR\n• Request specific changes\n• Regenerate with different approach\n\nWhat would you like to do?",
          });
        }
      } else if (currentStep === "pr-created") {
        // User can ask about testing
        if (userInput.includes("test") || userInput.includes("simulate") || userInput.includes("device")) {
          handleStartTesting();
        } else if (userInput.includes("yes") || userInput.includes("proceed") || userInput.includes("continue")) {
          handleStartTesting();
        } else {
          addMessage({
            type: "ai",
            message: "The PR has been created and approved. Would you like to proceed with testing?",
            actions: [
              {
                label: "Start Testing",
                onClick: handleStartTesting,
                variant: "primary",
              },
            ],
          });
        }
      } else if (currentStep === "sample-testing") {
        // User provides device info or CSV
        if (userInput.includes("csv") || userInput.includes("upload") || userInput.includes("file")) {
          addMessage({
            type: "ai",
            message: "Please share the CSV file path or tell me to generate sample test data.",
            actions: [
              {
                label: "Use Sample Data",
                onClick: handleUseSampleData,
                variant: "primary",
              },
            ],
          });
        } else if (userInput.match(/dev-?\d+/i) || userInput.match(/\d{3,}/)) {
          // User provided device IDs
          addMessage({
            type: "ai",
            message: `Running simulation on devices: ${input}... This will take a moment.`,
          });
          setTimeout(handleSimulationComplete, 3000);
        } else if (userInput.includes("auto") || userInput.includes("select") || userInput.includes("logic")) {
          addMessage({
            type: "ai",
            message: "I'll automatically select devices based on your rule logic and run the simulation...",
          });
          setTimeout(handleUseSampleData, 2000);
        } else if (userInput.includes("ios") || userInput.includes("android") || userInput.includes("region") || userInput.includes("model")) {
          addMessage({
            type: "ai",
            message: `Great! I'll select devices matching: "${input}" and run the simulation...`,
          });
          setTimeout(handleUseSampleData, 2000);
        } else {
          addMessage({
            type: "ai",
            message: "I can help you test in three ways:\n• Upload a CSV file with device data\n• Provide specific device IDs (e.g., DEV-1001, DEV-1002)\n• Auto-select devices (e.g., 'iOS devices in US-West')\n\nWhat would you like to do?",
          });
        }
      } else if (currentStep === "simulation-passed") {
        // User wants large scale testing
        if (userInput.includes("large") || userInput.includes("scale") || userInput.includes("all") || userInput.includes("yes") || userInput.includes("proceed")) {
          handleLargeScaleTesting();
        } else if (userInput.includes("review") || userInput.includes("result")) {
          addMessage({
            type: "ai",
            message: "The sample tests show good results. Most tests passed as expected. Ready to scale up to full testing?",
            actions: [
              {
                label: "Run Large Scale Test",
                onClick: handleLargeScaleTesting,
                variant: "primary",
              },
            ],
          });
        } else {
          addMessage({
            type: "ai",
            message: "Sample tests complete! Would you like to:\n• Run large-scale testing across all devices\n• Review the test results in detail\n• Adjust the rule based on findings",
            actions: [
              {
                label: "Large Scale Test",
                onClick: handleLargeScaleTesting,
                variant: "primary",
              },
            ],
          });
        }
      } else if (currentStep === "large-scale-testing") {
        // User provides filters or logic
        addMessage({
          type: "ai",
          message: `Applying filters: "${input}". Starting large-scale simulation across matching devices...`,
        });
        setTimeout(() => {
          addMessage({
            type: "ai",
            message: "Large-scale testing complete! 9,420 devices tested with 96.7% success rate. What would you like to do next?",
            actions: [
              {
                label: "Generate AI Insights",
                onClick: handleGenerateInsights,
                variant: "primary",
              },
              {
                label: "Start Monitoring",
                onClick: handleStartMonitoring,
                variant: "secondary",
              },
            ],
          });
          setCurrentStep("large-scale-complete");
        }, 4000);
      } else if (currentStep === "large-scale-complete") {
        if (userInput.includes("insight") || userInput.includes("analytics") || userInput.includes("dashboard")) {
          handleGenerateInsights();
        } else if (userInput.includes("monitor") || userInput.includes("runtime") || userInput.includes("live")) {
          handleStartMonitoring();
        } else {
          addMessage({
            type: "ai",
            message: "Testing complete! I can:\n• Generate AI insights and recommendations\n• Start runtime monitoring\n• Export test results\n\nWhat would you like to do?",
            actions: [
              {
                label: "View Insights",
                onClick: handleGenerateInsights,
                variant: "primary",
              },
            ],
          });
        }
      } else if (currentStep === "insights-generated") {
        // User asks for specific visualizations or actions
        if (userInput.includes("apply") || userInput.includes("fix") || userInput.includes("optimize")) {
          addMessage({
            type: "ai",
            message: `I'll apply the optimization: "${input}". This will improve performance significantly.`,
          });
        } else if (userInput.includes("chart") || userInput.includes("graph") || userInput.includes("show") || userInput.includes("visualize")) {
          addMessage({
            type: "ai",
            message: `Creating visualization: "${input}"...`,
          });
          setTimeout(() => {
            addMessage({
              type: "ai",
              message: "Visualization generated! The data clearly shows the pattern you requested. Any other insights you'd like to explore?",
            });
          }, 2000);
        } else {
          addMessage({
            type: "ai",
            message: "I can help you:\n• Create custom visualizations\n• Apply recommended optimizations\n• Export insights report\n• Analyze specific metrics\n\nWhat would you like to explore?",
          });
        }
      } else if (currentStep === "monitoring") {
        if (userInput.includes("pause") || userInput.includes("stop")) {
          addMessage({
            type: "ai",
            message: "Monitoring paused. The rule is still running, but I've stopped the live feed. Say 'resume' when ready.",
          });
        } else if (userInput.includes("resume") || userInput.includes("start") || userInput.includes("continue")) {
          addMessage({
            type: "ai",
            message: "Monitoring resumed! You'll see live metrics streaming now.",
          });
        } else if (userInput.includes("insight")) {
          navigate("/insights");
          setCurrentStep("insights-generated");
          addMessage({
            type: "ai",
            message: "Switching to insights dashboard...",
          });
        } else {
          addMessage({
            type: "ai",
            message: "Monitoring is active. I can:\n• Pause/resume the stream\n• Show specific metrics\n• Alert on anomalies\n• Switch to insights view\n\nWhat would you like?",
          });
        }
      } else {
        // Default response
        addMessage({
          type: "ai",
          message: "I'm here to help! You can:\n• Create a new rule\n• Review existing code\n• Run tests on devices\n• Generate insights\n• Monitor performance\n\nWhat would you like to do?",
        });
      }
    }, 500);

    setInput("");
  };

  const handleCodeApproval = (threadId: string) => {
    navigate(`/deployment/${threadId}`);
    setCurrentStep("pr-created");

    addMessage({
      type: "ai",
      message: (
        <div className="space-y-2">
          <p>✓ Creating pull request...</p>
        </div>
      ),
    });

    setTimeout(() => {
      addMessage({
        type: "ai",
        message: (
          <div className="space-y-2">
            <p>✓ Pull request #247 created successfully!</p>
            <p className="text-sm text-[var(--muted-foreground)]">CI/CD pipeline is running... All checks passing.</p>
          </div>
        ),
      });

      setTimeout(() => {
        addMessage({
          type: "ai",
          message: "PR approved! Now let's test this rule on devices. How would you like to select test devices?",
          actions: [
            {
              label: "Upload CSV",
              onClick: () => {
                addMessage({ type: "user", message: "Upload CSV file" });
                const tid = Date.now().toString();
                navigate(`/simulation/${tid}`);
                setCurrentStep("sample-testing");
                setTimeout(() => {
                  addMessage({
                    type: "ai",
                    message: "Please share the CSV file path, or I can generate sample test data for you.",
                    actions: [
                      {
                        label: "Use Sample Data",
                        onClick: handleUseSampleData,
                        variant: "primary",
                      },
                    ],
                  });
                }, 500);
              },
              variant: "secondary",
            },
            {
              label: "Enter Device IDs",
              onClick: () => {
                addMessage({ type: "user", message: "I'll enter device IDs" });
                const tid = Date.now().toString();
                navigate(`/simulation/${tid}`);
                setCurrentStep("sample-testing");
                setTimeout(() => {
                  addMessage({
                    type: "ai",
                    message: "Please provide device IDs (comma-separated, e.g., DEV-1001, DEV-1002) or describe the selection criteria.",
                  });
                }, 500);
              },
              variant: "secondary",
            },
            {
              label: "Auto-Select",
              onClick: () => {
                addMessage({ type: "user", message: "Auto-select devices by logic" });
                const tid = Date.now().toString();
                navigate(`/simulation/${tid}`);
                setCurrentStep("sample-testing");
                handleUseSampleData();
              },
              variant: "primary",
            },
          ],
        });
      }, 3000);
    }, 2000);
  };

  const handleStartTesting = () => {
    const threadId = chatContext.threadId || Date.now().toString();
    navigate(`/simulation/${threadId}`);
    setCurrentStep("sample-testing");

    addMessage({
      type: "ai",
      message: "Let's test your rule! Choose how to select devices:",
      actions: [
        {
          label: "Upload CSV",
          onClick: () => {
            addMessage({ type: "user", message: "Upload CSV" });
            setTimeout(() => {
              addMessage({
                type: "ai",
                message: "Share the CSV path or use sample data.",
                actions: [{ label: "Use Sample Data", onClick: handleUseSampleData, variant: "primary" }],
              });
            }, 500);
          },
          variant: "secondary",
        },
        {
          label: "Enter Device IDs",
          onClick: () => {
            addMessage({ type: "user", message: "Enter device IDs" });
            setTimeout(() => {
              addMessage({
                type: "ai",
                message: "Provide device IDs or describe selection criteria (e.g., 'iOS devices in US-West')",
              });
            }, 500);
          },
          variant: "secondary",
        },
        {
          label: "Auto-Select",
          onClick: () => {
            addMessage({ type: "user", message: "Auto-select" });
            setTimeout(handleUseSampleData, 500);
          },
          variant: "primary",
        },
      ],
    });
  };

  const handleUseSampleData = () => {
    addMessage({
      type: "ai",
      message: "Running simulation on 4 test devices (2 iOS, 2 Android) across different regions...",
    });
    setTimeout(handleSimulationComplete, 3000);
  };

  const handleSimulationComplete = () => {
    setCurrentStep("simulation-passed");
    addMessage({
      type: "ai",
      message: (
        <div className="space-y-2">
          <p>✓ Sample simulation complete!</p>
          <div className="text-sm bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-lg p-3 mt-2">
            <div>• Passed: 2 tests</div>
            <div>• Failed: 1 test</div>
            <div>• Warnings: 1 test</div>
            <div>• Success Rate: 50%</div>
          </div>
          <p className="text-sm">Ready for large-scale testing?</p>
        </div>
      ),
      actions: [
        {
          label: "Run Large Scale Test",
          onClick: handleLargeScaleTesting,
          variant: "primary",
        },
        {
          label: "Review Results",
          onClick: () => {
            addMessage({ type: "user", message: "Review test results" });
            setTimeout(() => {
              addMessage({
                type: "ai",
                message: "The failed test (DI-103) was expected - invalid email format. The warning indicates a common password. Overall performance looks good! Ready to scale up?",
              });
            }, 500);
          },
          variant: "secondary",
        },
      ],
    });
  };

  const handleLargeScaleTesting = () => {
    const threadId = chatContext.threadId || Date.now().toString();
    navigate(`/testing/${threadId}`);
    setCurrentStep("large-scale-testing");

    addMessage({
      type: "ai",
      message: "Starting large-scale testing! You can specify filters or test all devices. Try:\n• 'Test all devices'\n• 'Only iOS devices in US-West'\n• 'Filter by product Mobile App'\n\nOr click below:",
      actions: [
        {
          label: "Test All Devices",
          onClick: () => {
            addMessage({ type: "user", message: "Test all devices" });
            setTimeout(handleLargeScaleComplete, 3000);
          },
          variant: "primary",
        },
        {
          label: "Apply Filters",
          onClick: () => {
            addMessage({ type: "user", message: "Apply custom filters" });
            setTimeout(() => {
              addMessage({
                type: "ai",
                message: "Tell me your filter criteria (e.g., 'iOS devices in US-West' or 'Product: Mobile App, Region: EU-Central')",
              });
            }, 500);
          },
          variant: "secondary",
        },
      ],
    });
  };

  const handleLargeScaleComplete = () => {
    setCurrentStep("large-scale-complete");
    addMessage({
      type: "ai",
      message: (
        <div className="space-y-2">
          <p>✓ Large-scale testing complete!</p>
          <div className="text-sm bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-lg p-3 mt-2">
            <div>• Devices Tested: 9,420</div>
            <div>• Success Rate: 96.7%</div>
            <div>• Failures: 312</div>
            <div>• Avg Runtime: 145ms</div>
          </div>
          <p className="text-sm">Excellent results! What's next?</p>
        </div>
      ),
      actions: [
        {
          label: "Generate AI Insights",
          onClick: handleGenerateInsights,
          variant: "primary",
        },
        {
          label: "Start Monitoring",
          onClick: handleStartMonitoring,
          variant: "secondary",
        },
      ],
    });
  };

  const handleGenerateInsights = () => {
    navigate("/insights");
    setCurrentStep("insights-generated");

    addMessage({
      type: "ai",
      message: "Generating AI insights from test data...",
    });

    setTimeout(() => {
      addMessage({
        type: "ai",
        message: (
          <div className="space-y-2">
            <p>✓ AI Insights generated!</p>
            <div className="text-sm bg-[var(--warning)]/10 border border-[var(--warning)]/30 rounded-lg p-3 mt-2">
              <div>• Email validation: ~45ms optimization possible</div>
              <div>• Password rules can be consolidated</div>
              <div>• Rate limiting recommended</div>
            </div>
            <p className="text-sm mt-2">
              Ask me for custom visualizations like:
              <br />• "Show test execution time vs failures"
              <br />• "Compare performance by region"
              <br />• "Analyze errors by device type"
            </p>
          </div>
        ),
      });
    }, 2000);
  };

  const handleStartMonitoring = () => {
    const threadId = chatContext.threadId || Date.now().toString();
    navigate(`/monitoring/${threadId}`);
    setCurrentStep("monitoring");

    addMessage({
      type: "ai",
      message: "Starting real-time monitoring... You'll see live metrics, logs, and alerts. I'll notify you of any anomalies.",
    });
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[var(--electric-blue)] to-[var(--cyan)] rounded-full flex items-center justify-center glow-blue shadow-lg hover:scale-110 transition-transform z-50"
      >
        <Sparkles className="w-6 h-6 text-white" />
      </button>
    );
  }

  return (
    <div
      className={`border-l border-[var(--border)] flex flex-col bg-[var(--background)] transition-all duration-300 ${
        isExpanded ? "w-[450px]" : "w-[350px]"
      }`}
    >
      <div className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--electric-blue)] to-[var(--cyan)] rounded-lg flex items-center justify-center glow-blue">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            <div className="flex items-center gap-1 text-xs text-[var(--success)]">
              <div className="w-1.5 h-1.5 bg-[var(--success)] rounded-full animate-pulse"></div>
              Online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 hover:bg-[var(--muted)] rounded transition-colors"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 hover:bg-[var(--muted)] rounded transition-colors"
            title="Minimize"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.type === "ai"
                  ? "bg-gradient-to-br from-[var(--electric-blue)] to-[var(--cyan)] glow-blue"
                  : "bg-[var(--muted)]"
              }`}
            >
              {msg.type === "ai" ? (
                <Sparkles className="w-4 h-4 text-white" />
              ) : (
                <span className="text-sm font-semibold">U</span>
              )}
            </div>
            <div className={`flex-1 ${msg.type === "user" ? "text-right" : ""}`}>
              <div
                className={`inline-block glass rounded-xl px-4 py-3 max-w-full ${
                  msg.type === "user" ? "bg-[var(--electric-blue)]/20" : ""
                }`}
              >
                <div className="text-sm">{msg.message}</div>
                {msg.actions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {msg.actions.map((action) => (
                      <Button
                        key={action.label}
                        size="sm"
                        variant={action.variant || "secondary"}
                        onClick={action.onClick}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1 px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-[var(--border)] p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type your message..."
            className="flex-1 glass rounded-lg px-4 py-2 text-sm border border-[var(--border)] focus:border-[var(--electric-blue)] focus:outline-none"
          />
          <Button size="sm" onClick={handleSubmit} disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs text-[var(--muted-foreground)] mt-2">
          Try: "Create validation rules" or "Test on iOS devices"
        </div>
      </div>
    </div>
  );
}

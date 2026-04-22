import React, { useState } from "react";
import { ThreeLayer } from "@/components/three-layer";
import {
  RightPanel,
  PanelSection,
  ConfidenceScore,
} from "@/components/right-panel";
import { StatStrip } from "@/components/stat-strip";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  BrainCircuit,
  Activity,
  TrendingUp,
  TrendingDown,
  Target,
  Search,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  MOCK_PATTERNS,
  MOCK_SENTIMENT_DATA,
  MOCK_OBJECTION_CLUSTERS,
  MOCK_VICKI_QA,
} from "@/lib/mock-intel";
import { useAppStore } from "../store";
import { useToast } from "@/hooks/use-toast";

export default function Intelligence() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeVickiId, setActiveVickiId] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [appliedPatterns, setAppliedPatterns] = useState<Set<string>>(
    new Set(),
  );
  const stats = useAppStore((s) => s.stats);
  const { addLeadToLane, leads } = useAppStore();
  const { toast } = useToast();

  const statItems = [
    { label: "Calls Completed", value: stats.callsCompleted, trend: 2 },
    { label: "Quote Approval Rate", value: "34%", trend: -2 },
    { label: "Avg Job Value", value: "$480", trend: 4 },
    { label: "Missed Call Recovery", value: "22%", trend: -3 },
    { label: "Meetings Booked", value: stats.meetingsBooked, trend: 3 },
  ];

  const leftNav = [
    "Overview",
    "Segments",
    "Channels",
    "Strategies",
    "Objections",
    "Sentiment",
    "Campaigns",
    "Lanes",
    "Profile Effectiveness",
  ];

  const activeVicki = MOCK_VICKI_QA.find((q) => q.id === activeVickiId);

  const handleApplyPattern = (patternId: string, title: string) => {
    // Route high-intent leads to lane1 (Hot Follow-Up) as a visible mutation
    const targetLeads = leads.filter((l) => l.score >= 70).slice(0, 3);
    targetLeads.forEach((l) => addLeadToLane("lane1", l.id));
    setAppliedPatterns((prev) => new Set(prev).add(patternId));
    toast({
      title: "Strategy Applied to Outbound",
      description: `${title} — ${targetLeads.length} leads routed to Hot Follow-Up lane.`,
    });
  };

  const handleAskVicki = (id: string) => {
    setThinking(true);
    setThinkingStep(0);
    setActiveVickiId(id);
    const qa = MOCK_VICKI_QA.find((q) => q.id === id);
    if (!qa) return;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setThinkingStep(step);
      if (step >= qa.thinkingSteps.length) {
        clearInterval(interval);
        setTimeout(() => setThinking(false), 400);
      }
    }, 700);
  };

  const leftRail = (
    <div className="space-y-1">
      {leftNav.map((item) => (
        <button
          key={item}
          onClick={() => setActiveTab(item)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === item
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  // VICKI Ask bar
  const vickiAskBar = (
    <Card className="p-4 border-primary/20 bg-primary/5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">Ask VICKI</span>
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/20 text-[10px]"
        >
          Ironbark Intelligence
        </Badge>
      </div>
      <div className="flex gap-2 flex-wrap">
        {MOCK_VICKI_QA.map((qa) => (
          <button
            key={qa.id}
            onClick={() => handleAskVicki(qa.id)}
            className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
              activeVickiId === qa.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            }`}
          >
            "{qa.question}"
          </button>
        ))}
      </div>

      {activeVicki && (
        <div className="mt-4 pt-4 border-t border-border/50">
          {thinking ? (
            <div className="space-y-2">
              {activeVicki.thinkingSteps
                .slice(0, thinkingStep + 1)
                .map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    {i < thinkingStep ? (
                      <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                    ) : (
                      <Loader2 className="w-3 h-3 text-primary animate-spin flex-shrink-0" />
                    )}
                    <span
                      className={
                        i < thinkingStep ? "line-through opacity-50" : ""
                      }
                    >
                      {i + 1}. {step}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-sm text-foreground/90 leading-relaxed bg-secondary/30 p-3 rounded-lg border border-border/50">
              <div className="text-xs text-muted-foreground mb-2">
                VICKI ({activeVicki.persona} mode)
              </div>
              {activeVicki.answer}
            </div>
          )}
        </div>
      )}
    </Card>
  );

  // Overview tab
  const overviewContent = (
    <div className="space-y-6">
      {vickiAskBar}

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4 text-primary">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Ironbark Insight Summary</h2>
        </div>
        <p className="text-foreground/90 leading-relaxed">
          Quote approval rate is running 7% below the industry benchmark of 41%.
          The main drag is Monday submissions (approval rate 22%) and jobs where
          the customer hasn't been contacted within 2 hours of quote delivery.
          Ironbark recommends shifting quote delivery to Tuesday–Thursday before
          2pm and activating the 2-hour follow-up automation — projected to
          recover 8–10 bookings per month.
        </p>
      </Card>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Pattern Detection
        </h3>
        <div className="space-y-3">
          {MOCK_PATTERNS.map((pattern) => (
            <Card
              key={pattern.id}
              className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">
                    {pattern.title}
                  </h4>
                  <Badge
                    variant="outline"
                    className="bg-secondary text-xs font-normal"
                  >
                    n={pattern.sampleSize}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {pattern.description}
                </p>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <span className="text-green-500">
                    {pattern.confidence}% Confidence
                  </span>
                  <span className="text-muted-foreground">
                    Ironbark Insight
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none"
                >
                  Ignore
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 sm:flex-none"
                >
                  Monitor
                </Button>
                {appliedPatterns.has(pattern.id) ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 sm:flex-none text-green-400 border-green-500/30 bg-green-500/10 gap-1"
                    disabled
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="flex-1 sm:flex-none bg-primary text-primary-foreground gap-1"
                    onClick={() =>
                      handleApplyPattern(pattern.id, pattern.title)
                    }
                  >
                    Apply <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Objections tab
  const objectionsContent = (
    <div className="space-y-6">
      {vickiAskBar}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Objection Clusters
        </h3>
        <div className="space-y-4">
          {MOCK_OBJECTION_CLUSTERS.map((obj) => (
            <Card key={obj.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-sm text-foreground">
                    {obj.topic}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {obj.count} occurrences this month
                  </div>
                </div>
                <div
                  className={`text-xs font-medium flex items-center ${obj.trend.startsWith("+") ? "text-amber-500" : "text-green-500"}`}
                >
                  {obj.trend.startsWith("+") ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {obj.trend}
                </div>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 text-sm text-foreground/80">
                <span className="text-xs text-primary font-medium block mb-1">
                  Recommended Rebuttal
                </span>
                {obj.rebuttal}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Sentiment tab
  const sentimentContent = (
    <div className="space-y-6">
      {vickiAskBar}
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Call Sentiment & Quality
        </h3>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_SENTIMENT_DATA}>
              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222 25% 10%)",
                  borderColor: "hsl(222 15% 20%)",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="quality"
                stroke="hsl(210 55% 52%)"
                strokeWidth={2}
                dot={false}
                name="Call Quality %"
              />
              <Line
                type="monotone"
                dataKey="sentiment"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                name="Sentiment %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-primary inline-block"></span> Call
            Quality %
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-4 h-0.5 bg-muted-foreground inline-block"
              style={{ borderTop: "2px dashed" }}
            ></span>{" "}
            Sentiment %
          </span>
        </div>
      </Card>
    </div>
  );

  // Stub for other tabs
  const comingBoon = (
    <div className="space-y-6">
      {vickiAskBar}
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
        <Activity className="w-10 h-10 mb-3 opacity-20" />
        <p className="font-medium text-foreground/60">{activeTab}</p>
        <p className="text-sm mt-1">Analysis being prepared by Ironbark.</p>
      </div>
    </div>
  );

  const renderCentre = () => {
    switch (activeTab) {
      case "Overview":
        return overviewContent;
      case "Objections":
        return objectionsContent;
      case "Sentiment":
        return sentimentContent;
      default:
        return comingBoon;
    }
  };

  const centre = renderCentre();

  const rightPanel = (
    <RightPanel title="Ironbark Intelligence">
      <PanelSection title="Workshop Performance">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quote approval rate</span>
            <span className="text-amber-400">
              34% <span className="text-xs">(avg 41%)</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Avg job value</span>
            <span>$480</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Missed call recovery</span>
            <span className="text-amber-400">22%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Parts cost vs prior qtr
            </span>
            <span className="text-red-400">+23%</span>
          </div>
        </div>
      </PanelSection>

      <PanelSection title="Today's Compete Signal">
        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-sm text-amber-400">
          RepairDesk raised prices 15% in April. 8 workshops in your area are
          actively evaluating alternatives.
        </div>
        <Button className="w-full mt-3" size="sm" variant="outline">
          Activate Switch Campaign
        </Button>
      </PanelSection>

      <PanelSection title="Ironbark Recommendation">
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 text-sm text-foreground/80">
          Shift quote delivery to Tue–Thu before 2pm. Enable 2-hour follow-up
          automation. Projected impact: +8 bookings/month.
        </div>
      </PanelSection>

      <ConfidenceScore score={91} label="Pattern Confidence" />
    </RightPanel>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">Intelligence</h1>
          <p className="text-sm text-muted-foreground">
            VICKI Ask · Pattern detection · Strategic synthesis
          </p>
        </div>
      </div>
      <StatStrip items={statItems} />
      <div className="flex-1 min-h-0">
        <ThreeLayer
          leftRail={leftRail}
          centre={centre}
          rightPanel={rightPanel}
        />
      </div>
    </div>
  );
}

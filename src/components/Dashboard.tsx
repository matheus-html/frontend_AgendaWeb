
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { useScheduler } from "@/contexts/SchedulerContext";
import SchedulerHeader from "./SchedulerHeader";
import WeeklyView from "./WeeklyView";
import MonthlyView from "./MonthlyView";

const Dashboard: React.FC = () => {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");

  return (
    <div className="space-y-4">
      <Card className="glass-card overflow-hidden rounded-xl border-none shadow">
        <CardContent className="p-0">
          <SchedulerHeader view={view} setView={setView} />
          <div className="p-3 md:p-4 animate-fade-in">
            {view === "weekly" ? <WeeklyView /> : <MonthlyView />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

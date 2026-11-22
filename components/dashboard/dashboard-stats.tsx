"use client";

import {
  ArrowUpRight01Icon,
  CheckListIcon,
  CheckmarkCircle02Icon,
  Shield01Icon,
  Time02Icon,
} from "hugeicons-react";
import { StatCardItem } from "./types";

const DEFAULT_STATS: StatCardItem[] = [
  {
    label: "Total Elections",
    value: "12",
    pill: "+2",
    isPositive: true,
    icon: CheckmarkCircle02Icon,
  },
  {
    label: "Total Ballots Cast",
    value: "3,273",
    pill: "+14%",
    isPositive: true,
    icon: Shield01Icon,
  },
  {
    label: "Avg Turnout Rate",
    value: "78.4%",
    pill: "+3.2%",
    isPositive: true,
    icon: Time02Icon,
  },
  {
    label: "Active Elections",
    value: "09",
    pill: "3 concluded",
    isPositive: false,
    icon: CheckListIcon,
  },
];

interface DashboardStatsProps {
  stats?: StatCardItem[];
}

export function DashboardStats({ stats = DEFAULT_STATS }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-card border border-border/80 hover:border-border p-5 text-left flex flex-col justify-between transition-colors shadow-2xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-muted/50 border border-border/60 flex items-center justify-center text-brand shrink-0">
                <Icon size={14} />
              </div>
              <span className="text-xs font-heading font-medium text-muted-foreground">
                {stat.label}
              </span>
            </div>

            <div className="mt-5 flex items-baseline justify-between">
              <span className="text-3xl font-heading font-semibold tracking-tight text-foreground">
                {stat.value}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-sans font-medium border ${
                  stat.isPositive
                    ? "bg-status-confirmed/10 border-status-confirmed/30 text-status-confirmed"
                    : "bg-muted border-border text-muted-foreground"
                }`}
              >
                {stat.isPositive && (
                  <ArrowUpRight01Icon size={12} className="shrink-0" />
                )}
                <span>{stat.pill}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

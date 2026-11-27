import type { ComponentType } from "react";
import {
  Analytics01Icon,
  CheckListIcon,
  GridViewIcon,
  Settings02Icon,
  Ticket01Icon,
  UserGroupIcon,
  UserIcon,
} from "hugeicons-react";
import type { ElectionRole } from "./election-context";

export interface ElectionNavItem {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  exact?: boolean;
  adminOnly?: boolean;
}

export function getElectionNavItems(
  electionId: string,
  role: ElectionRole,
): ElectionNavItem[] {
  const basePath = `/dashboard/elections/${encodeURIComponent(electionId)}`;
  const isAdmin = role === "admin";

  const items: ElectionNavItem[] = [
    {
      label: "Overview",
      href: basePath,
      icon: GridViewIcon,
      exact: true,
    },
    {
      label: "Positions",
      href: `${basePath}/positions`,
      icon: CheckListIcon,
      adminOnly: true,
    },
    {
      label: "Candidates",
      href: `${basePath}/candidates`,
      icon: UserIcon,
      adminOnly: true,
    },
    {
      label: "Ballot",
      href: `${basePath}/ballot`,
      icon: Ticket01Icon,
    },
    {
      label: "Voters",
      href: `${basePath}/voters`,
      icon: UserGroupIcon,
      adminOnly: true,
    },
    {
      label: "Results",
      href: `${basePath}/results`,
      icon: Analytics01Icon,
    },
    {
      label: "Settings",
      href: `${basePath}/settings`,
      icon: Settings02Icon,
      adminOnly: true,
    },
  ];

  return items.filter((item) => !item.adminOnly || isAdmin);
}

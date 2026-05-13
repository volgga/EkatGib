"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { reachGoal } from "@/lib/metrika";

type GoalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  goal: string;
  goalParams?: Record<string, unknown>;
  children: ReactNode;
};

export function GoalLink({
  goal,
  goalParams,
  children,
  onClick,
  ...props
}: GoalLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        reachGoal(goal, goalParams);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}

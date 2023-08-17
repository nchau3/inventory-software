"use client";

import { useState } from "react";
import type { PropsWithChildren, ReactNode } from "react";
import s from "./base-layout.module.css";

export default function BaseLayout({
  topNavSlot: topBarSlot,
  sideNavSlot: sidebarSlot,
  children,
}: PropsWithChildren<{ topNavSlot: ReactNode; sideNavSlot: ReactNode }>) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  return (
    <div className={s.layoutContainer}>
      <div className={s.topBar}>{topBarSlot}</div>
      <div
        className={`${s.sidebarMain} ${
          sidebarCollapsed ? s.sidebarCollapsed : ""
        }`}
      >
        <div className={s.sidebar}>
          <button
            className={s.expandButton}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? "+" : "-"}
          </button>
          {sidebarSlot}
        </div>
        <div className={s.main}>
            {children}
        </div>
      </div>
    </div>
  );
}

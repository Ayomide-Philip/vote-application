"use client";

import { createContext, useContext, useState } from "react";

export type ElectionRole = "admin" | "voter";

interface ElectionContextValue {
  role: ElectionRole;
  setRole: (role: ElectionRole) => void;
}

const ElectionContext = createContext<ElectionContextValue>({
  role: "admin",
  setRole: () => {},
});

export function ElectionRoleProvider({
  initialRole = "admin",
  children,
}: {
  initialRole?: ElectionRole;
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<ElectionRole>(initialRole);

  return (
    <ElectionContext.Provider value={{ role, setRole }}>
      {children}
    </ElectionContext.Provider>
  );
}

export function useElectionRole() {
  return useContext(ElectionContext);
}

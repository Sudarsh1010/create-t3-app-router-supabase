import type { ReactNode } from "react";

import { Header } from "../_components/header";

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

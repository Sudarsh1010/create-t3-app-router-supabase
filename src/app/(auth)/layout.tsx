"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { useCallback } from "react";

import { Tabs, TabsList, TabsTrigger } from "../_components/ui/tabs";

export default function AuthLayout({ children }: { children: ReactNode }) {
  // router
  const router = useRouter();

  // pathname
  const pathname = usePathname();

  // handler
  const onValueChange = useCallback(
    (val: string) => router.push(`/${val as "sign-in" | "sign-up"}`),
    [router],
  );

  return (
    <div className="m-auto flex w-full items-center justify-center p-4 md:my-auto md:min-h-screen">
      <Tabs
        onValueChange={onValueChange}
        value={pathname.includes("sign-in") ? "sign-in" : "sign-up"}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign in</TabsTrigger>
          <TabsTrigger value="sign-up">Sign up</TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </div>
  );
}

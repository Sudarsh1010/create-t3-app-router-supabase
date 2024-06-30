"use client";

import type { User } from "@supabase/supabase-js";
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { createClient } from "~/supabase/client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Header = () => {
  // client router
  const router = useRouter();

  // state
  const [user, setUser] = useState<User | null>(null);
  const [supabase] = useState(createClient());

  // handlers
  const signOut = useCallback(() => {
    supabase.auth
      .signOut()
      .then(router.refresh)
      .catch((err) => toast.error(err.message));
  }, [router, supabase]);

  // effects
  useEffect(() => {
    supabase.auth
      .getUser()
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(signOut);
  }, [signOut, supabase]);

  if (!user) {
    return null;
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/10 px-4 lg:h-[60px] lg:px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="ml-auto rounded-full"
          >
            <CircleUser className="size-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div>
              My Account
              <p className="font-light">
                {user.user_metadata.first_name} {user.user_metadata.last_name}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

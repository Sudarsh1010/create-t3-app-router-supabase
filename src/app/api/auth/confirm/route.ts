import type { User } from "@supabase/supabase-js";
import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { db } from "~/server/db";
import { createClient } from "~/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type: type,
      token_hash,
    });

    if (!error && data.user) {
      try {
        if (type === "signup") {
          interface user_metadata {
            first_name: string;
            last_name?: string;
          }

          const { email, user_metadata } = data.user as User & {
            user_metadata: user_metadata;
          };

          await db
            .insertInto("user")
            .values({
              first_name: user_metadata.first_name,
              last_name: user_metadata.last_name,
              email: email!,
              updated_at: new Date(),
              id: data.user.id,
            })
            .executeTakeFirstOrThrow();
        }
      } catch (error) {
        redirectTo.searchParams.delete("next");
        return NextResponse.redirect(redirectTo);
      }

      redirectTo.searchParams.delete("next");
      return NextResponse.redirect(redirectTo);
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}

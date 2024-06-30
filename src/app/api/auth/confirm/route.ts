import type { EmailOtpType, User } from "@supabase/supabase-js";
import type { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AuthenticationService } from "~/server/services/authentication-service";
import { ServiceLocator } from "~/server/services/service-locator";

interface IUser extends User {
  user_metadata: { first_name: string; last_name?: string };
}

const handleErrorRedirect = (url: NextURL) => {
  url.pathname = "/error";
  return NextResponse.redirect(url);
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");
  redirectTo.searchParams.delete("next");

  if (!token_hash || !type) {
    return handleErrorRedirect(redirectTo);
  }

  const authService: AuthenticationService = ServiceLocator.getService(
    AuthenticationService.name,
  );

  const data = await authService.verifyOtp(type, token_hash);
  if (!data.user) {
    return handleErrorRedirect(redirectTo);
  }

  try {
    if (type === "signup") {
      const { id, email, user_metadata } = data.user as IUser;
      await authService.createUser({ ...user_metadata, email: email!, id });
    }
  } catch (error) {
    return handleErrorRedirect(redirectTo);
  }

  return NextResponse.redirect(redirectTo);
}

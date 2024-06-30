import "server-only";

import type { EmailOtpType, SupabaseClient } from "@supabase/supabase-js";
import { TRPCError } from "@trpc/server";
import type { z } from "zod";

import type { signUpFormSchema } from "~/app/_lib/validation-schema/auth";
import { env } from "~/env";
import type { AuthRepository } from "~/server/repositories/auth-respository";
import { createClient } from "~/supabase/server";

export class AuthenticationService {
  private _client: SupabaseClient;
  private _authRepositories: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this._client = createClient();
    this._authRepositories = authRepository;
  }

  async signIn(email: string, host: string) {
    const user = await this._authRepositories.getUser(email);
    if (!user || !user.id) {
      throw new TRPCError({
        code: "BAD_REQUEST",
      });
    }

    const { error } = await this._client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          env.NODE_ENV === "production"
            ? `https://${host}/api`
            : `http://${host}/api`,
      },
    });

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }

  async signUp({
    email,
    first_name,
    last_name,
    host,
  }: z.infer<typeof signUpFormSchema> & { host: string }) {
    const user = await this._authRepositories.getUser(email);
    if (user?.id) {
      throw new TRPCError({
        code: "BAD_REQUEST",
      });
    }

    const { error } = await this._client.auth.signInWithOtp({
      email,
      options: {
        data: { first_name, last_name },
        emailRedirectTo:
          env.NODE_ENV === "production"
            ? `https://${host}/api`
            : `http://${host}/api`,
      },
    });

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }

  async verifyOtp(type: EmailOtpType, token_hash: string) {
    const { data } = await this._client.auth.verifyOtp({
      type: type,
      token_hash,
    });
    return data;
  }

  async createUser(data: {
    id: string;
    email: string;
    first_name: string;
    last_name?: string;
  }) {
    await this._authRepositories.createUser(data);
  }
}

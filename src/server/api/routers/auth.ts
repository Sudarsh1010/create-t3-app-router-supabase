import {
  signInFormSchema,
  signUpFormSchema,
} from "~/app/_lib/validation-schema/auth";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { AuthenticationService } from "~/server/services/authentication-service";
import { ServiceLocator } from "~/server/services/service-locator";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpFormSchema)
    .mutation(async ({ ctx, input }) => {
      const authenticationSerivce: AuthenticationService =
        ServiceLocator.getService(AuthenticationService.name);
      const host = ctx.headers.get("host")!;
      await authenticationSerivce.signUp({ ...input, host });
    }),

  signIn: publicProcedure
    .input(signInFormSchema)
    .mutation(async ({ input, ctx }) => {
      const { email } = input;
      const authenticationSerivce: AuthenticationService =
        ServiceLocator.getService(AuthenticationService.name);
      const host = ctx.headers.get("host")!;
      await authenticationSerivce.signIn(email, host);
    }),
});

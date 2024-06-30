import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email(),
});

export const signUpFormSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().optional(),
  email: z.string().email(),
});

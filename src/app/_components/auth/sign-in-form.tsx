"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { Button } from "~/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";
import { signInFormSchema } from "~/app/_lib/validation-schema/auth";
import { api } from "~/trpc/react";

export const SignInForm = () => {
  // useForm
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });

  // mutation
  const { mutate, isPending } = api.auth.signIn.useMutation({
    onSuccess: () => {
      form.reset({ email: "" });
      toast.info("check your mail");
    },
    onError: (err) => toast.error(err.message),
  });

  // handlers
  const onSubmit = useCallback(
    (values: z.infer<typeof signInFormSchema>) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Loader className="mr-2 size-4 animate-spin" />} Login
        </Button>
      </form>
    </Form>
  );
};

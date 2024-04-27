"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

import { signUpFormSchema } from "../_validators";

const InputContainer = ({
  form,
}: {
  form: UseFormReturn<
    {
      first_name: string;
      email: string;
      last_name?: string | undefined;
    },
    any,
    undefined
  >;
}) => (
  <>
    <div className="grid grid-cols-2 items-start gap-x-4">
      <FormField
        control={form.control}
        name="first_name"
        render={({ field }) => (
          <FormItem className="grid">
            <FormLabel>First name</FormLabel>
            <FormControl>
              <Input placeholder="John" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="last_name"
        render={({ field }) => (
          <FormItem className="grid">
            <FormLabel>Last name</FormLabel>
            <FormControl>
              <Input placeholder="Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

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
  </>
);

export const SignUpForm = () => {
  // useForm
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  // mutation
  const { mutate, isPending } = api.auth.signUp.useMutation({
    onSuccess: () => {
      form.reset({ email: "", last_name: "", first_name: "" });
      toast.info("check your mail");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // handlers
  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputContainer form={form} />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Loader className="mr-2 size-4 animate-spin" />} Sign up
        </Button>
      </form>
    </Form>
  );
};

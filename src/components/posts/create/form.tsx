import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
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

import { createPostSchema } from "./schema";

export function CreatePostForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // useRouter
  const router = useRouter();

  // useForm
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
  });

  // mutation
  const { mutate, isPending } = api.post.create.useMutation({
    onSuccess: () => {
      form.reset();
      setIsOpen(false);
      router.refresh();
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
      toast.error(error.message);
    },
  });

  // handlers
  function onSubmit(values: z.infer<typeof createPostSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="xyz..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Loader className="mr-2 size-4 animate-spin" />}{" "}
            create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

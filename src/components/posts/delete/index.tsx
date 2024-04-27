import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useCallback, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

import type { Post } from "../table/columns";

export const DeletePost = ({
  post,
  children,
}: {
  post: Post;
  children: ReactNode;
}) => {
  // client router
  const router = useRouter();

  // state
  const [isOpen, setIsOpen] = useState(false);

  // mutation
  const { mutate: deletePost, isPending } = api.post.delete.useMutation({
    onSuccess: () => {
      setIsOpen(false);
      router.refresh();
    },
  });

  // handlers
  const onOpenChange = useCallback((val: boolean) => {
    if (val) {
      setIsOpen(val);
    }
  }, []);

  const onContinue = useCallback(
    () => deletePost({ id: post.id }),
    [deletePost, post.id],
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="w-full">
          {children}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="gap-x-3"
              onClick={onContinue}
              disabled={isPending}
            >
              {isPending && <Loader className="size-4 animate-spin" />}
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

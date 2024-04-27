import { Loader } from "lucide-react";
import dynamic from "next/dynamic";

import { CreatePost } from "~/components/posts/create";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const PostsTable = dynamic(() => import("~/components/posts/table"), {
  loading: () => <Loader className="size-5 animate-spin" />,
  ssr: false,
});

export default async function Home() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Posts</CardTitle>
              <CardDescription>Last 10 posts</CardDescription>
            </div>
            <CreatePost />
          </CardHeader>

          <CardContent>
            <PostsTable />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

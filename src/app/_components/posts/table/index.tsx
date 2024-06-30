import { DataTable } from "~/app/_components/ui/data-table";
import { api } from "~/trpc/server";

import { columns } from "./columns";

export default async function PostsTable() {
  const data = await api.post.all();
  return <DataTable columns={columns as any} data={data} />;
}

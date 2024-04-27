import { z } from "zod";

import { createPostSchema } from "~/components/posts/create/schema";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: privateProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx: { db, user }, input }) => {
      await db
        .insertInto("post")
        .values({
          name: input.name,
          updated_at: new Date(),
          user_id: user.id,
        })
        .execute();
      return;
    }),

  getLatest: privateProcedure.query(({ ctx: { db, user } }) => {
    return db
      .selectFrom("post")
      .where("user_id", "=", user.id)
      .orderBy("created_at desc")
      .selectAll()
      .limit(1)
      .executeTakeFirst();
  }),

  all: privateProcedure.query(({ ctx: { db, user } }) => {
    return db
      .selectFrom("post")
      .where("user_id", "=", user.id)
      .orderBy("created_at desc")
      .selectAll()
      .limit(10)
      .execute();
  }),

  delete: privateProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx: { db }, input: { id } }) => {
      return await db
        .deleteFrom("post")
        .where("id", "=", id)
        .returning("id")
        .executeTakeFirst();
    }),
});

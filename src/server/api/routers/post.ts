import { z } from "zod";

import { createPostSchema } from "~/app/_lib/validation-schema/posts/create";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { PostsService } from "~/server/services/posts-service";
import { ServiceLocator } from "~/server/services/service-locator";

export const postRouter = createTRPCRouter({
  create: privateProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx: { user }, input }) => {
      const postsService: PostsService = ServiceLocator.getService(
        PostsService.name,
      );
      postsService.createPost({ name: input.name, user_id: user.id });
    }),

  getLatest: privateProcedure.query(({ ctx: { user } }) => {
    const postsService: PostsService = ServiceLocator.getService(
      PostsService.name,
    );
    return postsService.getLatest(user.id);
  }),

  all: privateProcedure.query(({ ctx: { user } }) => {
    const postsService: PostsService = ServiceLocator.getService(
      PostsService.name,
    );
    return postsService.getPosts(user.id);
  }),

  delete: privateProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx: { user }, input: { id } }) => {
      const postsService: PostsService = ServiceLocator.getService(
        PostsService.name,
      );
      return postsService.deletePost({ postId: id, userId: user.id });
    }),
});

import { TRPCError } from "@trpc/server";

import type { PostsRepository } from "../repositories/posts-repository";

export class PostsService {
  private _postsRepositories: PostsRepository;

  constructor(postsRepositories: PostsRepository) {
    this._postsRepositories = postsRepositories;
  }

  async createPost({ name, user_id }: { name: string; user_id: string }) {
    return await this._postsRepositories.createPost({ name, user_id });
  }

  async getLatest(userId: string) {
    return await this._postsRepositories.getLatest(userId);
  }

  async getPosts(userId: string) {
    return await this._postsRepositories.getPosts(userId);
  }

  async deletePost({ userId, postId }: { userId: string; postId: number }) {
    const post = await this._postsRepositories.getUserPost({ userId, postId });

    if (!post)
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });

    return await this._postsRepositories.deletePost(postId);
  }
}

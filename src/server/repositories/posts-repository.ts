import type { Kysely } from "kysely";

import { db } from "~/server/db";
import type { DB } from "~/server/db/types";

export class PostsRepository {
  private _db: Kysely<DB>;

  constructor() {
    this._db = db;
  }

  async createPost({ name, user_id }: { name: string; user_id: string }) {
    return await this._db
      .insertInto("post")
      .values({
        name,
        updated_at: new Date(),
        user_id,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async getLatest(user_id: string) {
    return await this._db
      .selectFrom("post")
      .where("user_id", "=", user_id)
      .orderBy("created_at desc")
      .selectAll()
      .limit(1)
      .executeTakeFirst();
  }

  async getPosts(user_id: string) {
    return await this._db
      .selectFrom("post")
      .where("user_id", "=", user_id)
      .orderBy("created_at desc")
      .selectAll()
      .limit(10)
      .execute();
  }

  async getUserPost({ userId, postId }: { userId: string; postId: number }) {
    return await this._db
      .selectFrom("post")
      .where((eb) =>
        eb.or([eb("post.user_id", "=", userId), eb("post.id", "=", postId)]),
      )
      .select("id")
      .executeTakeFirst();
  }

  async deletePost(postId: number) {
    return await db
      .deleteFrom("post")
      .where("id", "=", postId)
      .returning("id")
      .executeTakeFirst();
  }
}

import type { Kysely } from "kysely";

import { db } from "~/server/db";
import type { DB } from "~/server/db/types";

export class AuthRepository {
  private _db: Kysely<DB>;

  constructor() {
    this._db = db;
  }

  async getUser(email: string) {
    return await this._db
      .selectFrom("user")
      .where("email", "=", email)
      .select("id")
      .executeTakeFirst();
  }

  async createUser(data: {
    id: string;
    email: string;
    first_name: string;
    last_name?: string;
  }) {
    return await db
      .insertInto("user")
      .values({
        ...data,
        updated_at: new Date(),
      })
      .executeTakeFirstOrThrow();
  }
}

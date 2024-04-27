import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface post {
    id: Generated<number>;
    name: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    user_id: string;
}
export interface user {
    id: Generated<string>;
    first_name: string;
    last_name: string | null;
    email: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
}
export interface DB {
    post: post;
    user: user;
}

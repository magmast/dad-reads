import { Session } from "../entity";

export interface SessionRepository {
  find(): Session | undefined;
  create(email: string, password: string): Promise<Session>;
  remove(): void;
}

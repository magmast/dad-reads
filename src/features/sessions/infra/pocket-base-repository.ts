import PocketBase, { ClientResponseError } from "pocketbase";
import { InvalidCredentialsError } from "../errors/invalid-credentials";
import { SessionRepository } from "./repository";

export class PocketBaseSessionRepository implements SessionRepository {
  constructor(
    private readonly pocketBase: PocketBase,
    private readonly usersCollectionName: string
  ) {}

  find() {
    if (!this.pocketBase.authStore.isValid) {
      return;
    }

    return this.pocketBase.authStore;
  }

  async create(email: string, password: string) {
    try {
      return await this.pocketBase
        .collection(this.usersCollectionName)
        .authWithPassword(email, password);
    } catch (error) {
      if (error instanceof ClientResponseError && error.status === 400) {
        throw new InvalidCredentialsError();
      }

      throw error;
    }
  }

  remove() {
    this.pocketBase.authStore.clear();
  }
}

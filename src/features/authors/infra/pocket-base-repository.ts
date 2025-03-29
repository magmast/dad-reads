import PocketBase from "pocketbase";

import { Author } from "../entity";
import { AuthorsRepository } from "./repository";

export class PocketBaseAuthorsRepository implements AuthorsRepository {
  constructor(
    private readonly pocketBase: PocketBase,
    private readonly collectionName: string,
  ) {}

  async findById(id: string): Promise<Author> {
    return await this.pocketBase
      .collection(this.collectionName)
      .getOne<Author>(id);
  }
}

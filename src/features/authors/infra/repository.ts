import { Author } from "../entity";

export interface AuthorsRepository {
  findById(id: string): Promise<Author>;
}

import { Audiobook } from "../entity";

export interface AudiobooksRepository {
  findAll(): Promise<Audiobook[]>;
}

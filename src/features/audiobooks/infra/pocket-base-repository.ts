import PocketBase from "pocketbase";

import { VITE_POCKET_BASE_URL } from "../../../env";
import { Audiobook } from "../entity";
import { AudiobooksRepository } from "./repository";

export class PocketBaseAudiobooksRepository implements AudiobooksRepository {
  constructor(
    private readonly pocketBase: PocketBase,
    private readonly collectionName: string,
  ) {}

  async findAll() {
    const records = await this.pocketBase
      .collection(this.collectionName)
      .getFullList<Audiobook>();

    return records.map((record) => this.fromRecord(record));
  }

  private fromRecord(audiobook: Audiobook) {
    return {
      ...audiobook,
      image: `${VITE_POCKET_BASE_URL}/api/files/${this.collectionName}/${audiobook.id}/${audiobook.image}`,
      audio: `${VITE_POCKET_BASE_URL}/api/files/${this.collectionName}/${audiobook.id}/${audiobook.audio}`,
    };
  }
}

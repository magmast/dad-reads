import { Audio } from "./audio";

export interface AudioApi {
  open(url: string): Promise<Audio>;
}

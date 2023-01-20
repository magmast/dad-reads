import { createContext } from "solid-js";
import { AudiobooksRepository } from "./infra/repository";

export interface AudiobooksContextValue {
  audiobooksRepository: AudiobooksRepository;
}

export const AudiobooksContext = createContext<AudiobooksContextValue>();

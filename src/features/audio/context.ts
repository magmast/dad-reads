import { createContext } from "solid-js";
import { AudioApi } from "./infra/api";

export interface AudioContextValue {
  audioApi: AudioApi;
}

export const AudioContext = createContext<AudioContextValue>();

import { Howl } from "howler";

import { AudioApi } from "./api";
import { Audio } from "./audio";
import { HowlerAudio } from "./howler-audio";

export class HowlerAudioApi implements AudioApi {
  async open(url: string): Promise<Audio> {
    const howl = new Howl({ src: url, autoplay: true });
    return new Promise((resolve) =>
      howl.on("load", () => resolve(new HowlerAudio(howl))),
    );
  }
}

import { Howl } from "howler";
import { BehaviorSubject } from "rxjs";

import { Audio } from "./audio";

export class HowlerAudio implements Audio {
  private readonly positionSubject = new BehaviorSubject(0);

  private readonly playingSubject = new BehaviorSubject(true);

  private closed = false;

  constructor(private readonly howl: Howl) {
    requestAnimationFrame(this.handleAnimationFrame);
    howl.on("play", () => this.playingSubject.next(true));
    howl.on("pause", () => this.playingSubject.next(false));
    howl.on("end", () => this.playingSubject.next(false));
  }

  get duration() {
    return this.howl.duration();
  }

  get position() {
    return this.positionSubject;
  }

  get playing() {
    return this.playingSubject;
  }

  play() {
    this.howl.play();
  }

  pause() {
    this.howl.pause();
  }

  close() {
    this.howl.unload();
  }

  private handleAnimationFrame = () => {
    if (this.closed) {
      return;
    }

    requestAnimationFrame(this.handleAnimationFrame);
    this.positionSubject.next(this.howl.seek());
  };
}

import { Observable } from "rxjs";

export interface Audio {
  readonly duration: number;

  readonly position: Observable<number>;

  readonly playing: Observable<boolean>;

  play(): void;

  pause(): void;

  close(): void;
}

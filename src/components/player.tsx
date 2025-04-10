import { TbPlayerPause, TbPlayerPlay } from "solid-icons/tb";
import {
  ErrorBoundary,
  JSX,
  Show,
  Suspense,
  createEffect,
  createResource,
} from "solid-js";

import { AudioContext } from "../features/audio/context";
import { Audio } from "../features/audio/infra/audio";
import { Audiobook } from "../features/audiobooks/entity";
import { createAuthorQuery } from "../features/authors/api/create-author-query";
import { Author } from "../features/authors/entity";
import { useObservable } from "../utils/use-observable";
import { useRequiredContext } from "../utils/use-required-context";
import { Progress } from "./progress";

export interface PlayerProps {
  audiobook: Audiobook;
}

export function Player(props: PlayerProps) {
  const { audioApi } = useRequiredContext(AudioContext);

  const [audio] = createResource<Audio, string>(
    () => props.audiobook.audio,
    async (url, { value }) => {
      value?.close();
      return await audioApi.open(url);
    },
  );

  const author = createAuthorQuery(props.audiobook.author);

  return (
    <Root>
      <ErrorBoundary fallback={<p>Failed to load the audiobook.</p>}>
        <Suspense
          fallback={
            <div class="flex h-[68px] items-center justify-center">
              <Progress size={6} />
            </div>
          }
        >
          <Show when={audio() && author.data}>
            <Loaded
              audiobook={props.audiobook}
              audio={audio()!}
              author={author.data!}
            />
          </Show>
        </Suspense>
      </ErrorBoundary>
    </Root>
  );
}

interface RootProps {
  children?: JSX.Element;
}

function Root(props: RootProps) {
  return (
    <>
      <div class="h-[84px]" />

      <div class="fixed bottom-0 left-0 right-0 p-2">
        <div class="w-full overflow-hidden rounded bg-slate-800 shadow-xl">
          {props.children}
        </div>
      </div>
    </>
  );
}

interface LoadedProps {
  audiobook: Audiobook;
  audio: Audio;
  author: Author;
}

function Loaded(props: LoadedProps) {
  const position = useObservable(() => props.audio.position, 0);
  const playing = useObservable(() => props.audio.playing, true);

  createEffect(() => console.log(position() / props.audio.duration));

  return (
    <>
      <div class="flex w-full items-center gap-2">
        <img class="h-16" src={props.audiobook.image} />
        <div class="flex flex-grow pr-4">
          <div>
            <h2 class="font-bold">{props.audiobook.title}</h2>
            <p>{props.author.name}</p>
          </div>
          <div class="flex-grow" />
          <button
            type="button"
            onClick={() =>
              playing() ? props.audio.pause() : props.audio.play()
            }
          >
            <Show when={playing()} fallback={<TbPlayerPlay size={24} />}>
              <TbPlayerPause size={24} />
            </Show>
          </button>
        </div>
      </div>

      <div class="relative z-10 h-1 w-full bg-slate-700">
        <div
          class="h-full w-full bg-blue-600"
          style={{
            "transform-origin": "left",
            transform: `scaleX(${position() / props.audio.duration})`,
          }}
        />
      </div>
    </>
  );
}

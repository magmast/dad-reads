import { createQuery } from "@tanstack/solid-query";
import { createMemo, createSignal, For, Show } from "solid-js";
import { AudiobooksContext } from "../features/audiobooks/context";
import { Audiobook } from "../features/audiobooks/entity";
import { useRequiredContext } from "../utils/use-required-context";
import { createAuthorQuery } from "../features/authors/api/create-author-query";
import { Player } from "../components/player";
import { withSession } from "../features/sessions/utils/with-session";

export default withSession(() => {
  const { audiobooksRepository } = useRequiredContext(AudiobooksContext);

  const audiobooks = createQuery(
    () => ["audiobooks"],
    async () => await audiobooksRepository.findAll()
  );

  const [selectedAudiobookId, setSelectedAudiobookId] = createSignal<string>();

  const selectedAudiobook = createMemo(() =>
    audiobooks.data?.find((audiobook) => audiobook.id === selectedAudiobookId())
  );

  return (
    <>
      <header class="p-2 flex justify-center">
        <h1 class="text-2xl">Audiobooks</h1>
      </header>

      <main>
        <ul>
          <For each={audiobooks.data}>
            {(audiobook) => (
              <AudiobookListItem
                audiobook={audiobook}
                onClick={() => setSelectedAudiobookId(audiobook.id)}
              />
            )}
          </For>
        </ul>
      </main>

      <Show when={selectedAudiobook()}>
        <Player audiobook={selectedAudiobook()!} />
      </Show>
    </>
  );
});

interface AudiobookListItemProps {
  audiobook: Audiobook;
  onClick: () => void;
}

function AudiobookListItem(props: AudiobookListItemProps) {
  const author = createAuthorQuery(props.audiobook.author);

  return (
    <li>
      <button class="relative" type="button" onClick={props.onClick}>
        <img src={props.audiobook.image} />
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
          <h2 class="font-bold">{props.audiobook.title}</h2>
          <p class="text-sm">{author.data?.name}</p>
        </div>
      </button>
    </li>
  );
}

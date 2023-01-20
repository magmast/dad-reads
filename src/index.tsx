/* @refresh reload */
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import PocketBase from "pocketbase";
import { ErrorBoundary, render, Suspense } from "solid-js/web";
import "tailwindcss/tailwind.css";
import { App } from "./app";
import {
  VITE_POCKET_BASE_AUDIOBOOKS_COLLECTION_NAME,
  VITE_POCKET_BASE_AUTHORS_COLLECTION_NAME,
  VITE_POCKET_BASE_URL,
} from "./env";
import { AudioContext } from "./features/audio/context";
import { HowlerAudioApi } from "./features/audio/infra/howler-api";
import { AudiobooksContext } from "./features/audiobooks/context";
import { PocketBaseAudiobooksRepository } from "./features/audiobooks/infra/pocket-base-repository";
import { AuthorsContext } from "./features/authors/context";
import { PocketBaseAuthorsRepository } from "./features/authors/infra/pocket-base-repository";

const queryClient = new QueryClient();

const pocketBase = new PocketBase(VITE_POCKET_BASE_URL);

const audiobooksRepository = new PocketBaseAudiobooksRepository(
  pocketBase,
  VITE_POCKET_BASE_AUDIOBOOKS_COLLECTION_NAME
);

const authorsRepository = new PocketBaseAuthorsRepository(
  pocketBase,
  VITE_POCKET_BASE_AUTHORS_COLLECTION_NAME
);

const audioApi = new HowlerAudioApi();

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <AudiobooksContext.Provider value={{ audiobooksRepository }}>
        <AuthorsContext.Provider value={{ authorsRepository }}>
          <AudioContext.Provider value={{ audioApi }}>
            <ErrorBoundary fallback={<p>Something went wrong.</p>}>
              <Suspense fallback={<p>Loading...</p>}>
                <App />
              </Suspense>
            </ErrorBoundary>
          </AudioContext.Provider>
        </AuthorsContext.Provider>
      </AudiobooksContext.Provider>
    </QueryClientProvider>
  ),
  document.getElementById("root") as HTMLElement
);

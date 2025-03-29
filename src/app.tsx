import { Route, Routes } from "@solidjs/router";
import { ErrorBoundary, Suspense, lazy } from "solid-js";

import { Progress } from "./components/progress";

const AudiobooksPage = lazy(() => import("./pages/audiobooks"));

const SignInPage = lazy(() => import("./pages/sign-in"));

export function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" component={AudiobooksPage} />
          <Route path="/sign-in" component={SignInPage} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

function Error() {
  return (
    <main class="flex min-h-screen items-center justify-center p-4 text-center">
      <p>Something didn't worked. Please try again later.</p>
    </main>
  );
}

function Loading() {
  return (
    <main class="flex min-h-screen items-center justify-center">
      <Progress size={12} />
    </main>
  );
}

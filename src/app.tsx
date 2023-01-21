import { Route, Routes } from "@solidjs/router";
import { ErrorBoundary, lazy, Suspense } from "solid-js";
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
    <main class="min-h-screen p-4 flex justify-center items-center text-center">
      <p>Something didn't worked. Please try again later.</p>
    </main>
  );
}

function Loading() {
  return (
    <main class="min-h-screen flex justify-center items-center">
      <Progress size={12} />
    </main>
  );
}

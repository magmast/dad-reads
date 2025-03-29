import { useNavigate } from "@solidjs/router";
import clsx from "clsx";
import { ComponentProps, Show, createSignal } from "solid-js";
import { z } from "zod";

import { SessionsContext } from "../features/sessions/context";
import { InvalidCredentialsError } from "../features/sessions/errors/invalid-credentials";
import { withoutSession } from "../features/sessions/utils/without-session";
import { createForm } from "../utils/form";
import { useRequiredContext } from "../utils/use-required-context";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default withoutSession(() => {
  const form = createForm({ schema });

  const { sessionRepository } = useRequiredContext(SessionsContext);

  const [invalidCredentials, setInvalidCredentials] = createSignal(false);

  const navigate = useNavigate();

  return (
    <main class="flex min-h-screen flex-col items-center justify-center gap-8">
      <h1 class="text-3xl">Sign in</h1>

      <form
        class="flex flex-col gap-4"
        onSubmit={form.handleSubmit(async ({ email, password }) => {
          try {
            await sessionRepository.create(email, password);
            navigate("/");
          } catch (error) {
            if (error instanceof InvalidCredentialsError) {
              setInvalidCredentials(true);
              return;
            }

            throw error;
          }
        })}
      >
        <Input
          {...form.register("email")}
          class="rounded bg-slate-900 p-2"
          placeholder="Email"
          error={form.state.errors().email}
        />

        <Input
          {...form.register("password")}
          class="rounded bg-slate-900 p-2"
          placeholder="Password"
          type="password"
          error={form.state.errors().password}
        />

        <Show when={invalidCredentials()}>
          <ErrorMessage class="text-center">Invalid credentials.</ErrorMessage>
        </Show>

        <button class="rounded bg-blue-900 p-2" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
});

interface InputProps extends ComponentProps<"input"> {
  error?: string;
}

function Input(props: InputProps) {
  return (
    <div>
      <input
        {...props}
        class={clsx("rounded bg-slate-900 p-2", props.class, {
          "border border-red-900": props.error,
        })}
      />

      <Show when={props.error}>
        <ErrorMessage>{props.error}</ErrorMessage>
      </Show>
    </div>
  );
}

type ErrorMessageProps = ComponentProps<"p">;

function ErrorMessage(props: ErrorMessageProps) {
  return <p {...props} class={clsx("text-red-600", props.class)} />;
}

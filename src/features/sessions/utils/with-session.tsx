import { Navigate } from "@solidjs/router";
import { Component, Show } from "solid-js";

import { useRequiredContext } from "../../../utils/use-required-context";
import { SessionsContext } from "../context";
import { Session } from "../entity";

export function withSession<P>(Component: Component<P & { session: Session }>) {
  return (props: P) => {
    const { sessionRepository } = useRequiredContext(SessionsContext);
    const session = sessionRepository.find();

    return (
      <Show when={session} fallback={<Navigate href="/sign-in" />}>
        <Component {...props} session={session!} />
      </Show>
    );
  };
}

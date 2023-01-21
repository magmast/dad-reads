import { Navigate } from "@solidjs/router";
import { Component, ComponentProps, JSX, Show } from "solid-js";
import { useRequiredContext } from "../../../utils/use-required-context";
import { SessionsContext } from "../context";

export function withoutSession<C extends Component>(Component: C) {
  return (props: ComponentProps<C>) => {
    const { sessionRepository } = useRequiredContext(SessionsContext);
    const session = sessionRepository.find();

    return (
      <Show when={session} fallback={<Component {...props} />}>
        <Navigate href="/" />
      </Show>
    );
  };
}

import { Observable } from "rxjs";
import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";

export function useObservable<T>(
  observable: () => Observable<T>,
  initialValue: T,
): Accessor<T> {
  const [value, setValue] = createSignal(initialValue);

  createEffect(() => {
    const subscribtion = observable().subscribe(setValue);
    onCleanup(() => subscribtion.unsubscribe());
  });

  return value;
}

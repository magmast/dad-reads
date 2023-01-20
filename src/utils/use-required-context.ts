import { Context, useContext } from "solid-js";

export function useRequiredContext<T>(context: Context<T>) {
  const value = useContext(context);
  if (!value) {
    throw new Error(`Context ${context.id.toString()} is missing.`);
  }
  return value;
}

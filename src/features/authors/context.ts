import { createContext } from "solid-js";
import { AuthorsRepository } from "./infra/repository";

export interface AuthorsContextValue {
  authorsRepository: AuthorsRepository;
}

export const AuthorsContext = createContext<AuthorsContextValue>();

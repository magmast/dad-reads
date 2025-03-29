import { createContext } from "solid-js";

import { SessionRepository } from "./infra/repository";

export interface SessionsContextValue {
  sessionRepository: SessionRepository;
}

export const SessionsContext = createContext<SessionsContextValue>();

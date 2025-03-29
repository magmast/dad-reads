import { createQuery } from "@tanstack/solid-query";

import { useRequiredContext } from "../../../utils/use-required-context";
import { AuthorsContext } from "../context";

export function createAuthorQuery(id: string) {
  const { authorsRepository } = useRequiredContext(AuthorsContext);

  return createQuery(
    () => ["authors", id],
    async () => await authorsRepository.findById(id),
  );
}

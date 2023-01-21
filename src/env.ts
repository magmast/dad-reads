import { z } from "zod";

const schema = z.object({
  VITE_POCKET_BASE_URL: z.string(),
  VITE_POCKET_BASE_AUDIOBOOKS_COLLECTION_NAME: z.string().default("audiobooks"),
  VITE_POCKET_BASE_AUTHORS_COLLECTION_NAME: z.string().default("authors"),
  VITE_POCKET_BASE_USERS_COLLECTION_NAME: z.string().default("users"),
});

export const {
  VITE_POCKET_BASE_URL,
  VITE_POCKET_BASE_AUDIOBOOKS_COLLECTION_NAME,
  VITE_POCKET_BASE_AUTHORS_COLLECTION_NAME,
  VITE_POCKET_BASE_USERS_COLLECTION_NAME,
} = await schema.parseAsync(import.meta.env);

import { z } from "astro:schema";

export const tagEnum = z.enum(["tech", "game"]);

export type TagEnum = z.infer<typeof tagEnum>;

import type { CollectionEntry } from "astro:content";

export type EntryOfType<T extends CollectionEntry<"entries">["data"]["type"]> =
	Omit<CollectionEntry<"entries">, "data"> & {
		data: Extract<CollectionEntry<"entries">["data"], { type: T }>;
	};

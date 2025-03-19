import { getCollection } from "astro:content";

const [posts, games] = await Promise.all([
	getCollection("posts"),
	getCollection("games"),
]);

export const entries = [...posts, ...games].sort(
	(entryA, entryZ) =>
		entryZ.data.createdAt.getTime() - entryA.data.createdAt.getTime(),
);

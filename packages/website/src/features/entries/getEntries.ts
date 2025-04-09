import { getCollection } from "astro:content";

type GetEntriesOptions = {
	filter?: {
		ids?: string[];
		tags?: string[];
		isOutdated?: boolean;
	};
	limit?: number;
};

export async function getEntries({
	filter = {},
	limit = Infinity,
}: GetEntriesOptions = {}) {
	return (
		await getCollection("entries", (entry) => {
			if (filter.ids && !filter.ids.includes(entry.id)) {
				return false;
			}
			if (filter.tags && !filter.tags.includes(entry.data.tag.id)) {
				return false;
			}
			if (
				typeof filter.isOutdated != "undefined" &&
				entry.data.type == "post" &&
				entry.data.isOutdated != filter.isOutdated
			) {
				return false;
			}
			return true;
		})
	)
		.sort(
			(entryA, entryZ) =>
				entryZ.data.createdAt.getTime() - entryA.data.createdAt.getTime(),
		)
		.slice(0, limit);
}

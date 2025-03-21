import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
	}),
});

const tags = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/tags" }),
	schema: () =>
		z.object({
			id: z.string(),
			color: z.string(),
			label: z.string(),
		}),
});

const entries = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/entries" }),
	schema: ({ image }) =>
		z.intersection(
			z.object({ tag: reference("tags"), createdAt: z.coerce.date() }),
			z.discriminatedUnion("type", [
				z.object({
					type: z.literal("post"),
					title: z.string(),
					slug: z.string(),
					related: z.array(z.string()),
					cover: image(),
					description: z.string().optional(),
					isOutdated: z.boolean().default(false),
				}),
				z.object({
					type: z.literal("game"),
					title: z.string(),
					url: z.string(),
					logo: image(),
					cover: image(),
					description: z.string(),
					placements: z
						.array(
							z.object({
								competitionName: z.string(),
								competitionLogo: image(),
								placement: z.number(),
								category: z.string(),
							}),
						)
						.optional(),
				}),
			]),
		),
});

export const collections = { pages, entries, tags };

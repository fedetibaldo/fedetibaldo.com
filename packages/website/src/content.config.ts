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

const posts = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			tag: reference("tags"),
			slug: z.string(),
			related: z.array(z.string()),
			cover: image(),
			description: z.string().optional(),
			createdAt: z.coerce.date(),
			updatedAt: z.coerce.date().optional(),
			isOutdated: z.boolean().default(false),
		}),
});

const games = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/games" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			url: z.string(),
			logo: image(),
			cover: image(),
			description: z.string(),
			createdAt: z.coerce.date(),
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
});

export const collections = { pages, tags, posts, games };

import { z } from "astro:schema";

const { frontmatter } = await import("./content/singletons/settings.md");

const schema = z.object({
	siteDomain: z.string(),
	siteTitle: z.string(),
	siteDescription: z.string(),
});

export const settings = schema.parse(frontmatter);

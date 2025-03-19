import type { TagEnum } from "./enum";

export function getColor(tag: TagEnum): string {
	const map: Record<TagEnum, string> = {
		game: "#EC003F",
		tech: "#E17100",
	};
	return map[tag];
}

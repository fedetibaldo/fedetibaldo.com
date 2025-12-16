type FilterIconProps = {
	width: number;
	height?: number;
	alt: string;
};

export function FilterIcon({ width, height = width, alt }: FilterIconProps) {
	return (
		<svg
			width={width}
			height={height}
			role="img"
			aria-label={alt}
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M11.5 16H28M4 24H20.5M4 8H20.5M6.5 16H4M25.5 24H28M25.5 8H28"
				stroke="currentColor"
				stroke-linecap="round"
			/>
			<circle
				cx="23"
				cy="8"
				r="2.5"
				stroke="currentColor"
				stroke-linecap="round"
			/>
			<circle
				cx="9"
				cy="16"
				r="2.5"
				stroke="currentColor"
				stroke-linecap="round"
			/>
			<circle
				cx="23"
				cy="24"
				r="2.5"
				stroke="currentColor"
				stroke-linecap="round"
			/>
		</svg>
	);
}

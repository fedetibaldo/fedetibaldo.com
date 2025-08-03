import { useId } from "preact/hooks";

type RadioProps = {
	label: string;
	value: string;
	options: { value: string; label: string }[];
	onChange: (value: string) => void;
};

export function Radio({ label, value, options, onChange }: RadioProps) {
	const id = useId();
	return (
		<fieldset class="space-y-4">
			<legend class="text-ds-small font-display font-semibold uppercase">
				{label}
			</legend>
			<div class="flex gap-3">
				{options.map((option) => {
					const optionId = `${id}-${option.value}`;
					return (
						<div class="flex">
							<input
								class="peer cursor-pointer"
								type="radio"
								id={optionId}
								value={option.value}
								checked={option.value == value}
								onChange={(ev) => onChange(ev.currentTarget.value)}
							/>
							<label
								class="text-contrast-low peer-checked:text-contrast-base pl-1 cursor-pointer"
								for={optionId}
							>
								{option.label}
							</label>
						</div>
					);
				})}
			</div>
		</fieldset>
	);
}

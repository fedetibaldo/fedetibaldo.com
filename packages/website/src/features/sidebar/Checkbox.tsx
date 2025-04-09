import { useId } from "preact/hooks";

type CheckboxProps = {
	label: string;
	value: boolean;
	onChange: (value: boolean) => void;
};

export function Checkbox({ label, value, onChange }: CheckboxProps) {
	const id = useId();

	return (
		<div class="flex">
			<input
				class="peer"
				type="checkbox"
				id={id}
				checked={value}
				onChange={(ev) => onChange(ev.currentTarget.checked)}
			/>
			<label
				class="text-smaller font-display font-bold uppercase leading-tightest text-neutral-200 pl-2 cursor-pointer"
				for={id}
			>
				{label}
			</label>
		</div>
	);
}

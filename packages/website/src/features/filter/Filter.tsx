import { useEffect, useId, useState } from "preact/hooks";
import { Checkbox } from "./Checkbox";
import { Radio } from "./Radio";
import { FilterIcon } from "./FilterIcon";

export type FilterValue = { showOutdated: boolean; tag: string };

type FilterProps = {
	defaultValue?: Partial<FilterValue> | undefined;
	className?: string;
};

export function Filter({ defaultValue, className = "" }: FilterProps) {
	const formId = useId();
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isFormDirty, setIsFormDirty] = useState(false);

	const openForm = () => {
		setIsFormDirty(false);
		setDraftValue(value);
		setIsFormOpen(true);
	};

	const closeForm = () => {
		setIsFormOpen(false);
	};

	const submitForm = () => {
		setValue(draftValue);
		closeForm();
	};

	const isFormResettable = () => {
		return Object.entries(draftValue).some(
			([key, value]) => value != initialFilter[key as keyof FilterValue],
		);
	};

	const resetForm = () => {
		setDraftValue(initialFilter);
		setIsFormDirty(true);
	};

	const onShowOutdatedChange = (showOutdated: boolean) => {
		setDraftValue((draftFilter) => ({
			...draftFilter,
			showOutdated,
		}));
		setIsFormDirty(true);
	};

	const onTagChange = (tag: string) => {
		setDraftValue((draftFilter) => ({ ...draftFilter, tag }));
		setIsFormDirty(true);
	};

	const initialFilter: FilterValue = Object.assign(
		{
			showOutdated: true,
			tag: "all",
		},
		defaultValue,
	);

	const [value, setValue] = useState(initialFilter);

	useEffect(() => {
		const tagClassNames = [
			"**:[.entry--tag-tech]:hidden",
			"**:[.entry--tag-game]:hidden",
		].map(
			(className) =>
				[className, value.tag != "all" && !className.includes(value.tag)] as [
					string,
					boolean,
				],
		);

		const classNames: [string, boolean][] = [
			["**:[.entry--outdated]:hidden", !value.showOutdated],
			...tagClassNames,
		];

		const bodyClassList = document.body.classList;
		for (const [className, isEnabled] of classNames) {
			const isActive = bodyClassList.contains(className);
			if (isEnabled && !isActive) {
				bodyClassList.add(className);
			} else if (!isEnabled && isActive) {
				bodyClassList.remove(className);
			}
		}
	}, [value]);

	const [draftValue, setDraftValue] = useState(value);

	const getMessage = (filter: FilterValue) => {
		const parts = [
			filter.showOutdated ? "" : "hide outdated",
			filter.tag != "all" ? filter.tag : "",
		];

		const messages = parts.filter(Boolean).join(", ");

		return messages ? `filter: ${messages}` : "no filter";
	};

	return (
		<>
			<div class="flex justify-between items-center w-full">
				<p class="text-contrast-low leading-self">
					<span class="hidden js:inline">{getMessage(value)}</span>
				</p>
				<button
					class="hidden js:block disabled:text-contrast-low cursor-pointer disabled:cursor-not-allowed rounded-lg p-2 -mr-2"
					type="button"
					aria-expanded={isFormOpen}
					aria-controls={formId}
					onClick={isFormOpen ? closeForm : openForm}
				>
					<FilterIcon alt="Filter settings" width={32} />
				</button>
			</div>

			{isFormOpen && (
				<form
					id={formId}
					onReset={(ev) => {
						ev.preventDefault();
						resetForm();
					}}
					onSubmit={(ev) => {
						ev.preventDefault();
						submitForm();
					}}
					class="absolute left-0 right-0 top-full w-full mb-6 surface border-y border-contrast-lowest p-6 space-y-8"
				>
					<div class="space-y-6">
						<Radio
							options={[
								{ label: "All", value: "all" },
								{ label: "Game", value: "game" },
								{ label: "Tech", value: "tech" },
							]}
							label="Filter by tag"
							value={draftValue.tag}
							onChange={onTagChange}
						/>
						<hr class="border-contrast-lowest" />
						<Checkbox
							label="Show outdated"
							value={draftValue.showOutdated}
							onChange={onShowOutdatedChange}
						/>
					</div>
					<div class="flex gap-3">
						<button
							type="reset"
							disabled={!isFormResettable()}
							class="px-4 py-3 w-full leading-tightest font-bold border border-contrast-low rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
						>
							Clear
						</button>
						<button
							disabled={!isFormDirty}
							class="px-4 py-3 w-full leading-tightest font-bold surface-inverted rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
						>
							Apply
						</button>
					</div>
				</form>
			)}
		</>
	);
}

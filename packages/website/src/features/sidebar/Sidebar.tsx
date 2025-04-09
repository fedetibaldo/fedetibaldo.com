import type { ComponentChildren } from "preact";
import { useId, useState } from "preact/hooks";
import { Checkbox } from "./Checkbox";
import { Radio } from "./Radio";
import { FilterIcon } from "./FilterIcon";

export type SidebarFilter = { showOutdated: boolean; tag: string };

type SidebarProps = {
	isFormDisabled?: boolean;
	emptyFilterMessage: string;
	defaultFilter?: Partial<SidebarFilter>;
	children: ComponentChildren;
};

export function Sidebar({
	isFormDisabled,
	emptyFilterMessage,
	children,
	defaultFilter,
}: SidebarProps) {
	const formId = useId();
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [isFormDirty, setIsFormDirty] = useState(false);

	const showForm = () => {
		setIsFormDirty(false);
		setDraftFilter(filter);
		setIsFormVisible(true);
	};

	const hideForm = () => {
		setIsFormVisible(false);
	};

	const submitForm = () => {
		setFilter(draftFilter);
		hideForm();
	};

	const isFormResettable = () => {
		return Object.entries(draftFilter).some(
			([key, value]) => value != initialFilter[key as keyof SidebarFilter],
		);
	};

	const resetForm = () => {
		setDraftFilter(initialFilter);
		setIsFormDirty(true);
	};

	const onShowOutdatedChange = (showOutdated: boolean) => {
		setDraftFilter((draftFilter) => ({
			...draftFilter,
			showOutdated,
		}));
		setIsFormDirty(true);
	};

	const onTagChange = (tag: string) => {
		setDraftFilter((draftFilter) => ({ ...draftFilter, tag }));
		setIsFormDirty(true);
	};

	const initialFilter: SidebarFilter = Object.assign(
		{
			showOutdated: true,
			tag: "all",
		},
		defaultFilter,
	);

	const [filter, setFilter] = useState(initialFilter);

	const [draftFilter, setDraftFilter] = useState(filter);

	const getMessage = (filter: SidebarFilter) => {
		const parts = [
			filter.showOutdated ? "" : "hide outdated",
			filter.tag != "all" ? filter.tag : "",
		];

		const messages = parts.filter(Boolean).join(", ");

		return messages ? `filter: ${messages}` : emptyFilterMessage;
	};

	const getFilterClassName = () => {
		const hideOutdatedClassName = "js:**:[.entry--outdated]:hidden";
		const hideTagClassNames = [
			"js:**:[.entry--tag-tech]:hidden",
			"js:**:[.entry--tag-game]:hidden",
		];

		const classNames = [
			filter.showOutdated ? "" : hideOutdatedClassName,
			filter.tag != "all"
				? hideTagClassNames.filter(
						(className) => !className.includes(filter.tag),
					)
				: "",
		];

		return classNames.filter(Boolean).join(" ");
	};

	return (
		<aside class={getFilterClassName()}>
			<div class="sticky top-0 bg-neutral-900 z-10">
				<div class="flex justify-between items-center py-4">
					<p class="text-neutral-400 leading-tightest">
						<span class="hidden js:inline">{getMessage(filter)}</span>
						<noscript>{emptyFilterMessage}</noscript>
					</p>
					<button
						class="hidden disabled:text-neutral-700 cursor-pointer disabled:cursor-not-allowed rounded-full p-2 -mr-2 js:block"
						type="button"
						disabled={isFormDisabled}
						aria-expanded={isFormVisible}
						aria-controls={formId}
						onClick={isFormVisible ? hideForm : showForm}
					>
						<FilterIcon alt="Edit filter" width={35} />
					</button>
				</div>
				{isFormVisible && (
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
						class="absolute right-0 top-full w-full max-w-md -translate-y-2 translate-x-2 mb-6 bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6 space-y-8"
					>
						<div class="space-y-6">
							<Radio
								options={[
									{ label: "All", value: "all" },
									{ label: "Game", value: "game" },
									{ label: "Tech", value: "tech" },
								]}
								label="Filter by tag"
								value={draftFilter.tag}
								onChange={onTagChange}
							/>
							<hr class="border-neutral-700" />
							<Checkbox
								label="Show outdated"
								value={draftFilter.showOutdated}
								onChange={onShowOutdatedChange}
							/>
						</div>
						<div class="flex gap-3">
							<button
								type="reset"
								disabled={!isFormResettable()}
								class="px-4 py-3 w-full leading-tightest font-bold border border-grey-400 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
							>
								Clear
							</button>
							<button
								disabled={!isFormDirty}
								class="px-4 py-3 w-full leading-tightest font-bold bg-neutral-100 text-neutral-900 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
							>
								Apply
							</button>
						</div>
					</form>
				)}
			</div>
			{children}
		</aside>
	);
}

import { generateSuffix, type DistributivePick } from "../../helpers";
import type { AnyFormField } from "./FormField.astro";

type FieldValue = DistributivePick<AnyFormField, "type" | "name" | "value">;

export const SidebarFilterComponent = () => {
	const prefix = "sidebar-filter";
	const randomSuffix = generateSuffix();

	const componentId = `${prefix}-${randomSuffix}`;
	const formId = `${prefix}-form-${randomSuffix}`;

	const api = {
		id: {
			component: componentId,
			form: formId,
		},

		form: {
			isDirty: false,
			isOpen: false,
			isResettable: false,
		},

		openForm() {
			this.form.isOpen = true;
			this.onChange();
		},
		closeForm() {
			this.form.isOpen = false;
			const formFields = this.getFormFields();
			if (!formFields) return;
			this.setFieldValues(this.getInitialFieldValues(formFields));
			this.form.isDirty = false;
		},
		toggleForm() {
			if (!this.form.isOpen) {
				this.openForm();
			} else {
				this.closeForm();
			}
		},

		// Deserialize the data passed by Astro
		getFormFields(): AnyFormField[] | null {
			const component = document.getElementById(this.id.component);
			const serializedFormFields = component?.dataset["formFields"];
			if (!serializedFormFields) {
				return null;
			}
			return JSON.parse(serializedFormFields) as AnyFormField[];
		},

		getInitialFieldValues(fields: AnyFormField[]): FieldValue[] {
			return fields.map(
				({ name, value, type }) => ({ name, value, type }) as FieldValue,
			);
		},

		getResetFieldValues(fields: AnyFormField[]): FieldValue[] {
			return fields.map(
				({ name, resetValue, type }) =>
					({
						name,
						value: resetValue,
						type,
					}) as FieldValue,
			);
		},

		setFieldValues(values: FieldValue[]) {
			for (const { type, value, name } of values) {
				switch (type) {
					case "checkbox":
						const checkbox = document.querySelector(
							`#${this.id.form} input[name=${name}]`,
						) as HTMLInputElement | undefined;
						if (!checkbox) return;
						checkbox.checked = value;
						break;
					case "radio":
						const radio = document.querySelector(
							`#${this.id.form} input[name=${name}][value=${value}]`,
						) as HTMLInputElement | undefined;
						if (!radio) return;
						radio.checked = true;
				}
			}
		},

		getForm() {
			return document.getElementById(this.id.form) as
				| HTMLFormElement
				| undefined;
		},

		getFormData(): FormData | null {
			const form = this.getForm();
			if (!form) {
				return null;
			}
			return new FormData(form);
		},

		// Clean up the URL
		onSubmit(ev: SubmitEvent) {
			const form = this.getForm();
			const formFields = this.getFormFields();

			if (!form || !formFields) return;
			ev.preventDefault();

			const data = new FormData(form);
			const url = new URL(form.action);

			// For every value that doesn't match their field's reset value, add the key-value pair to the search query
			for (const [key, value] of data.entries()) {
				const field = formFields.find((field) => field.name == key);
				if (
					field &&
					typeof value == "string" &&
					String(field.resetValue) != value
				) {
					url.searchParams.set(key, value);
				}
			}

			// Manual submission
			window.location.assign(url);
		},

		// Because we initialize the form on the server, a native reset would not return the inputs to their default value
		onReset(ev: Event) {
			const formFields = this.getFormFields();
			if (!formFields) return;
			ev.preventDefault();

			this.setFieldValues(this.getResetFieldValues(formFields));

			window.Alpine.nextTick(() => this.onChange());
		},

		onChange() {
			const form = this.getForm();
			const formFields = this.getFormFields();
			if (!form || !formFields) return;

			const data = new FormData(form);

			for (const field of formFields) {
				// Unticked checkboxes are not present in form data
				if (!data.has(field.name) && field.type == "checkbox") {
					data.set(field.name, String(false));
				}
			}

			if (!this.form.isDirty) {
				this.form.isDirty = data.entries().some(([key, value]) => {
					const field = formFields.find((field) => field.name == key);
					return field && String(field.value) != value;
				});
			}

			this.form.isResettable = data.entries().some(([key, value]) => {
				const field = formFields.find((field) => field.name == key);
				return field && String(field.resetValue) != value;
			});
		},
	};

	return api;
};

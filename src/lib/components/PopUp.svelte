<script lang="ts" context="module">
	import { writable } from "svelte/store";
	import type { Writable } from "svelte/store";

	export interface PopupInput {
		type: "text" | "textarea" | "number" | "password";
		name: string;
		label?: string;
		placeholder?: string;
		required?: boolean;
		value?: string | number;
	}

	export interface PopupButton {
		label: string;
		action: (formData?: { [key: string]: any }) => void;
		primary?: boolean;
		cancel?: boolean;
	}

	export interface PopupConfig {
		show: boolean;
		message?: string;
		inputs?: PopupInput[];
		buttons: PopupButton[];
		size?: "small" | "medium" | "large" | "xlarge";
		title?: string;
		res?: (formData?: { [key: string]: any }) => void;
		onClose?: () => void;
	}

	export const popup: Writable<PopupConfig> = writable({
		show: false,
		message: "",
		inputs: [],
		buttons: [],
		size: "medium",
		title: undefined,
		res: undefined,
		onClose: undefined,
	});

	export type ShowPopupButtons = {
		[key: string]:
			| (() => void)
			| {
					callback: (formData?: { [key: string]: any }) => void;
					primary?: boolean;
					cancel?: boolean;
			  };
	};
	export type ShowPopupInputs = PopupInput[];

	export async function showPopup(
		messageOrTitle: string,
		buttonsConfig: ShowPopupButtons = { โอเค: () => {} },
		size: "small" | "medium" | "large" | "xlarge" = "medium",
		inputs?: ShowPopupInputs,
		isTitle: boolean = false
	): Promise<{ [key: string]: any } | string | undefined> {
		return new Promise((resolve) => {
			const formattedButtons: PopupButton[] = Object.entries(buttonsConfig).map(([label, config]) => {
				if (typeof config === "function") {
					return { label, action: config };
				}
				return {
					label,
					action: config.callback,
					primary: config.primary,
					cancel: config.cancel,
				};
			});

			popup.set({
				show: true,
				message: isTitle ? undefined : messageOrTitle,
				title: isTitle ? messageOrTitle : undefined,
				buttons: formattedButtons,
				inputs: inputs || [],
				size,
				res: resolve,
				onClose: () => resolve(undefined),
			});
		});
	}

	export function closePopup(formData?: { [key: string]: any }, buttonClicked?: boolean) {
		popup.update((p) => {
			if (p.res && buttonClicked) {
				p.res(formData);
			} else if (p.res && !buttonClicked) {
				p.res(undefined);
			}
			if (p.onClose) {
				p.onClose();
			}
			return {
				show: false,
				message: "",
				inputs: [],
				buttons: [],
				size: "medium",
				title: undefined,
				res: undefined,
				onClose: undefined,
			};
		});
	}
</script>

<script lang="ts">
	import { onDestroy, createEventDispatcher } from "svelte";
	import Button from "./Button.svelte";
	import { azScale } from "$lib/transition";
	import { fade } from "svelte/transition";

	const dispatch = createEventDispatcher();

	let currentConfig: PopupConfig = {
		show: false,
		message: "",
		inputs: [],
		buttons: [],
		size: "medium",
		title: undefined,
	};

	let formData: { [key: string]: any } = {};

	const unsubscribe = popup.subscribe(($popup) => {
		currentConfig = $popup;
		if ($popup.show) {
			formData = {};
			if ($popup.inputs) {
				$popup.inputs.forEach((input) => {
					formData[input.name] = input.value !== undefined ? input.value : "";
				});
			}
		}
	});

	function handleInputChange(name: string, value: any) {
		formData[name] = value;
	}

	function handleButtonClick(button: PopupButton) {
		if (button.cancel) {
			button.action(formData);
			closePopup(undefined, true);
			dispatch("action", { buttonLabel: button.label, formData });
			return;
		}

		if (currentConfig.inputs) {
			for (const input of currentConfig.inputs) {
				if (input.required && (formData[input.name] === undefined || formData[input.name] === "")) {
					showPopup(`กรุณากรอกข้อมูล: ${input.label || input.name}`, { ตกลง: () => {} }, "small");
					return;
				}
			}
		}

		button.action(formData);
		closePopup(formData, true);
		dispatch("action", { buttonLabel: button.label, formData });
	}

	function handleOverlayClick() {
		const cancelBehaviorButton = currentConfig.buttons.find((b) => b.cancel);
		if (cancelBehaviorButton) {
		}
		closePopup(undefined, false);
		dispatch("close");
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && currentConfig.show) {
			handleOverlayClick();
		}
	}

	onDestroy(() => {
		unsubscribe();
	});
</script>

<svelte:window on:keydown={handleKeydown} />

{#if currentConfig.show}
	<div in:fade={{ duration: 150 }} out:fade={{ duration: 150 }} class="Overlay" on:click|self={handleOverlayClick}>
		<div
			in:azScale={{ duration: 200 }}
			out:azScale={{ duration: 200 }}
			class="Popup {currentConfig.size || 'medium'}"
		>
			{#if currentConfig.title}
				<div class="Title">{currentConfig.title}</div>
			{/if}
			{#if currentConfig.message}
				<div class="Message">{currentConfig.message}</div>
			{/if}

			{#if currentConfig.inputs && currentConfig.inputs.length > 0}
				<form class="InputsContainer" on:submit|preventDefault>
					{#each currentConfig.inputs as input (input.name)}
						<div class="InputGroup">
							{#if input.label}
								<label for={input.name}>{input.label}</label>
							{/if}
							{#if input.type === "textarea"}
								<textarea
									id={input.name}
									name={input.name}
									placeholder={input.placeholder || ""}
									bind:value={formData[input.name]}
									on:input={(e) =>
										handleInputChange(
											input.name,
											(e.target as HTMLTextAreaElement).value
										)}
									required={input.required}
								></textarea>
							{:else}
								<input
									type={input.type}
									id={input.name}
									name={input.name}
									placeholder={input.placeholder || ""}
									bind:value={formData[input.name]}
									on:input={(e) =>
										handleInputChange(input.name, (e.target as HTMLInputElement).value)}
									required={input.required}
								/>
							{/if}
						</div>
					{/each}
				</form>
			{/if}

			{#if currentConfig.buttons && currentConfig.buttons.length > 0}
				<div class="ButtonContainer">
					{#each currentConfig.buttons as button (button.label)}
						<Button
							on:click={() => handleButtonClick(button)}
							color={button.primary
								? "var(--bg)"
								: button.cancel
									? "var(--bg)"
									: "var(--button-bg)"}
							textColor={button.primary
								? "var(--status-done)"
								: button.cancel
									? "var(--status-not-started)"
									: "var(--button-text)"}
							outline={button.primary
								? "var(--status-done)"
								: button.cancel
									? "var(--status-not-started)"
									: "transparent"}
							hoverColor={button.primary
								? "var(--status-done)"
								: button.cancel
									? "var(--status-not-started)"
									: ""}
						>
							{button.label}
						</Button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.Overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
		font-size: 1rem;
		font-weight: 400;
		padding: 1rem;
	}

	.Popup {
		display: flex;
		flex-direction: column;
		background: var(--bg);
		padding: 1.5rem;
		gap: 1rem;
		border-radius: var(--n-border-radius, 8px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
		max-width: 90vw;
		max-height: 90vh;
		width: auto;
		min-width: 300px;
		overflow-y: auto;
		border: 1px solid var(--outline);

		&.small {
			width: clamp(300px, 40%, 500px);
		}
		&.medium {
			width: clamp(400px, 60%, 700px);
		}
		&.large {
			width: clamp(500px, 80%, 900px);
		}
		&.xlarge {
			width: clamp(600px, 90%, 1200px);
		}
	}

	.Title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-color-strong, var(--text-color));
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--grayed, var(--outline));
	}

	.Message {
		font-size: 1rem;
		line-height: 1.6;
		color: var(--text-color-light, var(--text-color));
		white-space: pre-line;
		word-break: break-word;
		margin-bottom: 0.5rem;
	}

	.InputsContainer {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
	}

	.InputGroup {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		label {
			font-weight: 500;
			font-size: 0.875rem;
			color: var(--text-color-medium, var(--text-color));
		}

		input[type="text"],
		input[type="number"],
		input[type="password"],
		textarea {
			padding: 0.6rem 0.75rem;
			border-radius: var(--n-border-radius-small, 4px);
			background-color: var(--bg-input, var(--bg));
			color: var(--text-color);
			font-size: 0.9rem;
			width: 100%;
			box-sizing: border-box;
		}

		textarea {
			min-height: 80px;
			resize: vertical;
		}
	}

	.ButtonContainer {
		display: flex;
		flex-direction: row;
		gap: 0.75rem;
		justify-content: flex-end;
		margin-top: 1rem;
		flex-wrap: wrap;

		:global(button) {
			font-weight: 600;
			font-size: 1rem;
		}
	}
</style>

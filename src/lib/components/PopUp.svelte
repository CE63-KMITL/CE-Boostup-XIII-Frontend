<script lang="ts" context="module">
	import { writable } from "svelte/store";
	import type { Writable } from "svelte/store";

	export const popup: Writable<{
		show: boolean;
		message: string;
		cancelButton: boolean;
		res?: (value: boolean) => void;
	}> = writable({
		show: false,
		message: "",
		cancelButton: false,
		res: undefined,
	});

	export async function showPopup(message: string, cancelButton: boolean = false): Promise<boolean> {
		return new Promise((res) => {
			popup.set({ show: true, message, cancelButton, res });
		});
	}

	export function closePopup(returnValue: boolean) {
		popup.update((p) => {
			if (p.res) p.res(returnValue);
			return { show: false, message: "", cancelButton: false, resolve: undefined };
		});
	}
</script>

<script lang="ts">
	import { onDestroy } from "svelte";
	import Button from "./Button.svelte";
	import { azScale } from "$lib/transition";
	import { fade } from "svelte/transition";

	let show = false;
	let message = "";
	let cancelButton = false;

	const unsubscribe = popup.subscribe(($popup) => {
		show = $popup.show;
		message = $popup.message;
		cancelButton = $popup.cancelButton;
	});

	onDestroy(() => unsubscribe());
</script>

{#if show}
	<div in:fade={{ duration: 250 }} out:fade={{ duration: 250 }} class="Overlay">
		<div in:azScale out:azScale class="Popup">
			<div class="Massage">{message}</div>
			<div class="ButtonContainer">
				{#if cancelButton}
					<Button color="var(--status-not-started)" on:click={() => closePopup(false)}>Close</Button>
				{/if}
				<Button color={cancelButton ? "var(--status-done)" : undefined} on:click={() => closePopup(true)}
					>Ok</Button
				>
			</div>
		</div>
	</div>
{/if}

<style>
	.Overlay {
		position: fixed;
		inset: 0;
		background: var(--list-shadow);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
		font-size: 1.125rem;
		font-weight: 500;
	}

	.Popup {
		display: flex;
		flex-direction: column;
		background: var(--list-bg);
		min-width: 20rem;
		padding: 1rem;
		gap: 10px;
		border-radius: 10px;
		box-shadow: 0 0 12px var(--list-shadow);
	}

	.Massage {
		display: flex;
		align-items: center;
		justify-content: start;
		width: 100%;
		min-height: fit-content;
		white-space: pre-line;
		word-break: break-word;
		text-align: left;
	}

	.ButtonContainer {
		display: flex;
		flex-direction: row;
		gap: 10px;

		:global(button) {
			font-size: 0.7rem;
		}
	}
</style>

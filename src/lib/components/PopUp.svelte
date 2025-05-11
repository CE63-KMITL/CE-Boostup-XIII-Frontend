<script lang="ts" context="module">
	import { writable } from "svelte/store";
	import type { Writable } from "svelte/store";

	export const popup: Writable<{
		show: boolean;
		message: string;
		buttons: { [key: string]: () => void };
		res?: (value: string | undefined) => void;
	}> = writable({
		show: false,
		message: "",
		buttons: {},
		res: undefined,
	});

	export async function showPopup(
		message: string,
		buttons: { [key: string]: () => void } = { OK: () => {} }
	): Promise<string | undefined> {
		return new Promise((res) => {
			popup.set({ show: true, message, buttons, res });
		});
	}

	export function closePopup(buttonLabel?: string) {
		popup.update((p) => {
			if (p.res) p.res(buttonLabel);
			return { show: false, message: "", buttons: {}, res: undefined };
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
	let buttons: { [key: string]: () => void } = {};

	const unsubscribe = popup.subscribe(($popup) => {
		show = $popup.show;
		message = $popup.message;
		buttons = $popup.buttons;
	});

	onDestroy(() => unsubscribe());
</script>

{#if show}
	<div in:fade={{ duration: 250 }} out:fade={{ duration: 250 }} class="Overlay">
		<div in:azScale out:azScale class="Popup">
			<div class="Massage">{message}</div>
			<div class="ButtonContainer">
				{#each Object.entries(buttons) as [label, action]}
					<Button
						on:click={() => {
							action();
							closePopup(label);
						}}>{label}</Button
					>
				{/each}
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
		max-width: 80%;
		max-height: 50%;
	}

	.Massage {
		display: flex;
		justify-content: start;
		width: 100%;
		min-height: fit-content;
		white-space: pre-line;
		word-break: break-word;
		text-align: left;
		overflow-y: auto;
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

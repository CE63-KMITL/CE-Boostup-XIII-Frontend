<script lang="ts" context="module">
    import { writable } from "svelte/store";
	import type { Writable } from "svelte/store";

	export const popup: Writable<{ show: boolean; message: string, ok_btn: boolean, res?: (value: boolean) => void}> = writable({
		show: false,
		message: "",
        ok_btn: false,
        res: undefined
	});

	export function showPopup(message: string, ok_btn: boolean): Promise<boolean> {
		return new Promise((res) => {
			popup.set({ show: true, message, ok_btn, res });
		});
	}

	export function closePopup(returnValue: boolean) {
		popup.update((p) => {
			if (p.res) p.res(returnValue);
			return { show: false, message: "", ok_btn: false, resolve: undefined };
		});
	}

</script>

<script lang="ts">
	import { onDestroy } from "svelte";

	let show = false;
	let message = "";
    let ok_btn = false;

	const unsubscribe = popup.subscribe(($popup) => {
		show = $popup.show;
		message = $popup.message;
        ok_btn = $popup.ok_btn;
	});

	onDestroy(() => unsubscribe());
</script>

{#if show}
	<div class="Overlay">
		<div class="Popup">
			<p class="Massage">{message}</p>
            <div class="ButtonContainer">
                <button class="Close" on:click={() => closePopup(false)}>Close</button>
                {#if ok_btn}
                    <button class="Ok" on:click={() => closePopup(true)}>Ok</button>
                {/if}
            </div>
		</div>
	</div>
{/if}

<style>
	.Overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
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
		background: white;
        height: 30vh;
        width: 30vw;
        min-height: 10rem;
        min-width: 20rem;
        max-height: 15rem;
		padding: 2rem;
        gap: 2rem;
		border-radius: 12px;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
	}

    .Massage {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 80%;
        min-height: fit-content;
    }

    .ButtonContainer {
        display: flex;
        align-items: flex-end;
        width: 100%;
        justify-content: space-between;
    }

    .Close {
        color: var(--normal);
        background-color: var(--status-not-started);
        width: 4rem;
        padding: 3px;
        border-radius: 5px;
    }

    .Close:hover {
        background-color: rgb(179, 55, 55);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    }

    .Ok {
        color: var(--normal);
        background-color: var(--status-done);
        width: 4rem;
        padding: 3px;
        border-radius: 5px;
    }

    .Ok:hover{
        background-color: rgb(41, 136, 41);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    }
</style>

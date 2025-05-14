<script lang="ts">
	import { azScale } from "$lib/transition";
	import { createEventDispatcher } from "svelte";

	/*
	-------------------------------------------------------
	Props Definition
	-------------------------------------------------------
	*/
	export let options: { name: string; id: string }[] = [];
	export let selectedId: string;
	export let label: string = "";

	/*
	-------------------------------------------------------
	Component State
	-------------------------------------------------------
	*/
	let isOpen = false;
	const dispatch = createEventDispatcher();

	/*
	-------------------------------------------------------
	Event Handlers
	-------------------------------------------------------
	*/
	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectOption(optionId: string) {
		selectedId = optionId;
		isOpen = false;
		dispatch("change", selectedId); // Dispatch change event with the new selectedId
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest(".dropdown-container")) {
			isOpen = false;
		}
	}

	/*
	-------------------------------------------------------
	Computed Properties
	-------------------------------------------------------
	*/
	$: selectedOptionName = options.find((opt) => opt.id === selectedId)?.name || "Select...";
</script>

<svelte:window on:click={handleClickOutside} />

<div class="dropdown-container">
	{#if label}
		<div class="dropdown-label">{label}</div>
	{/if}
	<div>
		<button class="dropdown-button" on:click={toggleDropdown}>
			{selectedOptionName}
			<span class="arrow {isOpen ? 'up' : 'down'}"></span>
		</button>
		{#if isOpen}
			<div in:azScale out:azScale class="dropdown-options">
				{#each options as option}
					<div
						class="dropdown-option {option.id === selectedId ? 'selected' : ''}"
						on:click={() => selectOption(option.id)}
						on:keydown={(e) => e.key === "Enter" && selectOption(option.id)}
						tabindex="0"
						role="option"
						aria-selected={option.id === selectedId}
					>
						{option.name}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.dropdown-container {
		position: relative;
		display: inline-block;
		font-family: inherit;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.dropdown-label {
		display: block;
		margin-bottom: 4px;
		color: var(--text);
		font-size: 0.9em;
		text-wrap: nowrap;
		padding-right: 10px;
	}

	.dropdown-button {
		background-color: var(--bg-100);
		color: var(--text);
		border: 1px solid var(--outline);
		padding: 8px 12px;
		border-radius: 5px;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		min-width: 150px;
		font-size: 1em;
		transition: background-color 0.2s ease-out;

		&:hover {
			background-color: var(--bg-200);
		}

		&:focus {
			outline: 2px solid var(--primary);
			outline-offset: 2px;
		}
	}

	.arrow {
		border: solid var(--text);
		border-width: 0 2px 2px 0;
		display: inline-block;
		padding: 3px;
		margin-left: 10px;
		transition: transform 0.2s ease-out;
	}

	.arrow.down {
		transform: rotate(45deg);
	}

	.arrow.up {
		transform: rotate(-135deg);
	}

	.dropdown-options {
		position: absolute;
		background-color: var(--bg-50);
		border: 1px solid var(--outline);
		border-radius: 5px;
		list-style: none;
		padding: 5px 0;
		margin: 5px 0 0 0;
		width: 100%;
		max-height: 200px;
		overflow-y: auto;
		z-index: 10;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.dropdown-option {
		padding: 8px 12px;
		cursor: pointer;
		color: var(--text);
		transition: background-color 0.1s ease-out;
		border-radius: 10px;

		&:hover,
		&:focus {
			background-color: var(--hover-list-bg);
			outline: none;
		}

		&.selected {
			background-color: var(--selected-list-bg);
			font-weight: bold;
		}
	}
</style>

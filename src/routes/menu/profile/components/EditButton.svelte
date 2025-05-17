<script lang="ts">
	export let onclick: () => void;
</script>

<button class="edit-icon-button" on:click={onclick}>
	<svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
		<path
			d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.114l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.091l-.65 2.882a.75.75 0 00.926.926l2.882-.65a5.25 5.25 0 002.091-1.32l8.4-8.4z"
		/>
	</svg>
</button>

<style lang="scss">
	.edit-icon-button {
		position: absolute;
		bottom: 0.5rem;
		right: 0.5rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		color: var(--text);
	}

	.edit-icon {
		width: 1.2rem;
		height: 1.2rem;
		fill: currentColor;
	}
</style>

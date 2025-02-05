<script lang="ts">
	let className = "";
	export { className as class };
</script>

<button class={className}>
	<slot></slot>
</button>

<style lang="scss">
	button {
		border: 1px solid var(--outline);
		background: var(--button-bg);
		border-radius: 10px;
		padding: 5px;
	}
</style>

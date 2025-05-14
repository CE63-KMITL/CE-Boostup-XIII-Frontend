<script lang="ts">
	export let margin = true;
	export let border = true;
</script>

<div {...$$restProps} class:margin class:border>
	<slot></slot>
</div>

<style lang="scss">
	div {
		background: var(--bg-50);
		border-radius: 10px;
		padding: 5px;
		transition: all 0.2s ease-out;
	}

	.margin {
		margin: 5px;
	}

	.border {
		border: 1px solid var(--outline);
	}

	div[blur-bg="true"] {
		backdrop-filter: blur(5px);
	}
</style>

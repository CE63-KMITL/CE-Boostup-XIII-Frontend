<script lang="ts">
	export let margin = true;
	export let border = true;
	export let shadow = false;
</script>

<div {...$$restProps} class:margin class:border class:shadow>
	<slot></slot>
</div>

<style lang="scss">
	div {
		background: var(--bg-50);
		border-radius: var(--n-border-radius);
		padding: 5px;
		transition: all 0.2s ease-out;
	}

	.margin {
		margin: 5px;
	}

	.border {
		border: 1px solid var(--outline);
	}

	.shadow {
		box-shadow: 0 2px 4px var(--list-shadow);
	}

	div[blur-bg="true"] {
		backdrop-filter: blur(5px);
	}
</style>

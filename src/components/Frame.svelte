<div {...$$restProps}>
	<slot></slot>
</div>

<style lang="scss">
	div {
		border: 1px solid var(--outline);
		background: var(--bg-50);
		border-radius: 10px;
		padding: 5px;
		margin: 5px;
		transition: all 0.2s ease-out;
	}

	div[blur-bg="true"] {
		backdrop-filter: blur(5px);
	}
</style>

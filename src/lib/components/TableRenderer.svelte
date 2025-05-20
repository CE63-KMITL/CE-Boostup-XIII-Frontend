<div {...$$restProps}>
	<slot></slot>
</div>

<style lang="scss">
	div {
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		gap: var(--n-gap);
		container-type: size;
		position: relative;
	}
</style>

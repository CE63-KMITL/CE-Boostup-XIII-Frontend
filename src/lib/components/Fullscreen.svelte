<div {...$$restProps}>
	<slot></slot>
</div>

<style lang="scss">
	div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

<div data-list {...$$restProps}>
	<slot></slot>
</div>

<style lang="scss">
	[data-list] {
		transition: all 0.2s ease-out;
		outline: 1px solid var(--list-outline);
		cursor: pointer;
		user-select: none;
		border-radius: var(--n-border-radius);
		container-type: inline-size;
		gap: 10px;
		padding-block: 10px;

		&:not(#header) {
			filter: drop-shadow(0 2px 4px var(--list-shadow));
			background: var(--bg);

			&:hover:not([selected]) {
				background-color: var(--hover-list-bg);
				outline: 1px solid var(--hover-list-outline);
			}

			&[selected] {
				background-color: var(--selected-list-bg);
				outline: 1px solid var(--selected-list-outline);
			}
		}

		:global(> div) {
			align-content: center;
		}
	}
</style>

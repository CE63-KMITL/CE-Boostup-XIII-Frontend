<script lang="ts">
	export let style = {};

	let className = "";
	export { className as class };

	const formatToHTMLStyleFromObject = (styleObj) => {
        return Object.entries(style).reduce((acc, [key, value]) => `${acc} ${key}: ${value};`, '');
	};

	$: styleHTML = formatToHTMLStyleFromObject(style);
</script>

<button style={styleHTML} class={className}>
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
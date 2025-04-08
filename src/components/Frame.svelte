<script lang="ts">
	export let style: Record<string, string> = {};
	export let className = "";

	export { className as class };

	const formatToHTMLStyleFromObject = (styleObj: Record<string, string>) => {
		return Object.entries(styleObj)
			.map(([key, value]) => `${key}: ${value};`)
			.join(" ");
	};

	$: styleHTML = formatToHTMLStyleFromObject(style);
</script>

<div class={className} style={styleHTML}>
	<slot></slot>
</div>

<style lang="scss">
	div {
		border: 1px solid var(--outline);
		background: var(--bg-50);
		border-radius: 10px;
		padding: 5px;
		margin: 5px;
		backdrop-filter: blur(5px);
	}
</style>

<script lang="ts">
	export let hoverColor = "255, 255, 255, 0.1";

    const formatToHTMLStyleFromObject = (styleObj: Record<string, string>) => {
        return Object.entries(styleObj)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ');
    };

    $: styleHTML = formatToHTMLStyleFromObject(style);
</script>

<button style={styleHTML} class={className} on:click>
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

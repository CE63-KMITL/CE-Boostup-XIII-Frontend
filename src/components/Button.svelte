<script lang="ts">
    export let style: Record<string, string> = {};
    export let className = "";

    export { className as class };

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
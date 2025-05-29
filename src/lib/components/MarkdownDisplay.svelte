<script lang="ts">
	import MarkdownIt from "markdown-it";
	import ImagePopup from "./ImagePopup.svelte";

	//-------------------------------------------------------
	// Props
	//-------------------------------------------------------
	export let markdownContent: string = "";

	//-------------------------------------------------------
	// State
	//-------------------------------------------------------
	const md = new MarkdownIt({
		html: true, // Ensure HTML is enabled to render <img> tags for clicking
		linkify: true, // Autoconvert URL-like text to links
		typographer: true,
	});

	let showImagePopup = false;
	let popupImageSrc: string | null = null;
	let popupImageAlt: string | null = null;

	//-------------------------------------------------------
	// Computed
	//-------------------------------------------------------
	$: htmlContent = md.render(markdownContent || "");

	//-------------------------------------------------------
	// Event Handlers
	//-------------------------------------------------------
	function handleContentClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (target.tagName === "IMG") {
			const src = target.getAttribute("src");
			const alt = target.getAttribute("alt");
			if (src) {
				popupImageSrc = src;
				popupImageAlt = alt;
				showImagePopup = true;
			}
		}
	}

	function closeImagePopup() {
		showImagePopup = false;
		popupImageSrc = null;
		popupImageAlt = null;
	}
</script>

<div class="markdown-render-container" on:click={handleContentClick}>
	{@html htmlContent}
</div>
{#if showImagePopup && popupImageSrc}
	<ImagePopup src={popupImageSrc} alt={popupImageAlt || ""} on:close={closeImagePopup} />
{/if}
<style>
	.markdown-render-container :global(img) {
		cursor: pointer;
		max-width: 100%;
		height: auto;
		border-radius: var(--n-border-radius);
		margin-block: 0.5em; /* Optional: add some space around images */
	}
	/* Add more global styles for other markdown elements if needed, e.g., tables, blockquotes */
	.markdown-render-container :global(h1),
	.markdown-render-container :global(h2),
	.markdown-render-container :global(h3) {
		margin-top: 1.2em;
		margin-bottom: 0.6em;
	}
	.markdown-render-container :global(p) {
		color: var(--text);
		line-height: 1.7;
	}
	.markdown-render-container :global(code) {
		background-color: var(--hover-list-bg); /* Uses theme-aware variable from app.css */
		color: var(--text);
		padding: 0.2em 0.4em;
		border-radius: 3px;
		font-size: 0.9em;
	}
	.markdown-render-container :global(pre) {
		background-color: var(--darker); /* Uses theme-aware variable from app.css */
		color: var(--text);
		border: 1px solid var(--outline);
		padding: 1em;
		border-radius: 5px;
		overflow-x: auto;
	}
	.markdown-render-container :global(pre code) {
		background-color: transparent;
		color: inherit; /* Inherit color from pre */
		padding: 0;
		border: none;
	}
	.markdown-render-container :global(blockquote) {
		border-left: 4px solid var(--theme); /* Uses theme-aware variable for accent */
		padding-left: 1em;
		margin-left: 0;
		color: var(--description); /* Uses theme-aware variable for muted text */
	}
	.markdown-render-container :global(table) {
		border-collapse: collapse;
		width: auto;
		margin-block: 1em;
		color: var(--text);
	}
	.markdown-render-container :global(th),
	.markdown-render-container :global(td) {
		border: 1px solid var(--table-border, #ddd);
		padding: 0.5em 0.75em;
	}
	.markdown-render-container :global(th) {
		background-color: var(--hover-list-bg); /* Uses theme-aware variable */
		color: var(--text);
	}
</style>

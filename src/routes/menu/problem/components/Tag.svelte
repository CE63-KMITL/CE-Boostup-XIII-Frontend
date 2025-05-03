<script lang="ts">
	import { tagsColors } from "$lib/constants/problem";

	export let tag: string;
</script>

<span class="tag" style="background-color: {tagsColors[tag] ?? '#808080'};">{tag}</span>

<style lang="scss">
	.tag {
		display: inline-block;
		padding: 4px 10px;
		border-radius: 12px;
		font-size: 0.7em;
		color: var(--tag-text);
		font-weight: 800;
		text-shadow: 1px 1px 2px black;
	}
</style>

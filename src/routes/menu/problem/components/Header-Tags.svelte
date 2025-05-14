<script lang="ts">
	import { tagsColors } from "$lib/constants/problem";
	import Checkbox from "$lib/components/Checkbox.svelte";
	import { searchParams } from "../problem";
</script>

{#each Object.keys(tagsColors) as tag}
	<Checkbox
		selected={$searchParams.tag.includes(tag)}
		name="tag"
		color={tagsColors[tag]}
		onSelect={() => {
			const tempTag = $searchParams.tag;
			tempTag.push(tag);
			$searchParams.tag = tempTag;
		}}
		onUnselect={() => {
			$searchParams.tag = $searchParams.tag.filter((t) => t !== tag);
		}}
		>{tag}
	</Checkbox>
{/each}

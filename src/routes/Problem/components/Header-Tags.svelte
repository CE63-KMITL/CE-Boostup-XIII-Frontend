<script lang="ts">
	import Checkbox from "../../../components/Checkbox.svelte";
	import { searchParams, tagsColors } from "../problem";
</script>

{#each Object.keys(tagsColors) as tag}
	<Checkbox
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

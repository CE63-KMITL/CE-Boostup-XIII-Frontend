<script lang="ts">
	import RadioButton from "$lib/components/RadioButton.svelte";
	import { searchParams } from "../problem";

	let minDifficulty = $searchParams.minDifficulty;
	let maxDifficulty = $searchParams.maxDifficulty;
	let random = Math.random();

	let timeout;
	$: {
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => {
			$searchParams.minDifficulty = minDifficulty;
			$searchParams.maxDifficulty = maxDifficulty;
		}, 200);
	}
</script>

<div>เรียงลำดับ:</div>
<RadioButton
	name={random}
	onclick={() => {
		$searchParams.difficultySortBy = null;
	}}
	selected={(() => {
		console.log(!$searchParams.difficultySortBy);
		return !$searchParams.difficultySortBy;
	})()}
	>ไม่เรียง
</RadioButton>
<RadioButton
	name={random}
	onclick={() => {
		$searchParams.difficultySortBy = "ASC";
	}}
	selected={$searchParams.difficultySortBy === "ASC"}
	>น้อยไปมาก
</RadioButton>
<RadioButton
	name={random}
	onclick={() => {
		$searchParams.difficultySortBy = "DESC";
	}}
	selected={$searchParams.difficultySortBy === "DESC"}
	>มากไปน้อย
</RadioButton>
<div>ช่วงความยาก:</div>
<input
	type="range"
	min="0.5"
	max="5"
	step="0.5"
	bind:value={minDifficulty}
	on:input={() => {
		if (minDifficulty > maxDifficulty) {
			maxDifficulty = minDifficulty;
		}
	}}
/>
<input
	type="range"
	min="0.5"
	max="5"
	step="0.5"
	bind:value={maxDifficulty}
	on:input={() => {
		if (maxDifficulty < minDifficulty) {
			minDifficulty = maxDifficulty;
		}
	}}
/>
<div class="range-values">
	<span>{minDifficulty}</span>
	<span>ถึง</span>
	<span>{maxDifficulty}</span>
</div>

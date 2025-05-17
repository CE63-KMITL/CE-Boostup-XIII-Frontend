<script lang="ts">
	import RadioButton from "$lib/components/RadioButton.svelte";
	import RangeSliderDouble from "$lib/components/RangeSliderDouble.svelte";
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
<RangeSliderDouble min={1} max={5} step={1} bind:minValue={minDifficulty} bind:maxValue={maxDifficulty}
></RangeSliderDouble>

<div class="range-values">
	<span>{minDifficulty}</span>
	<span>ถึง</span>
	<span>{maxDifficulty}</span>
</div>

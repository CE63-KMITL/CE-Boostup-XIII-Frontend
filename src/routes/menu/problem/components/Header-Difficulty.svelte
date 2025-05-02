<script lang="ts">
	import * as api from "$lib/fetchApi";
	import { onMount } from "svelte";
	import RadioButton from "../../../../components/RadioButton.svelte";
	import { searchParams } from "../problem";
</script>

<div>เรียงลำดับ:</div>
<RadioButton
	name="difficulty-sort"
	onclick={() => {
		$searchParams.difficultySortBy = null;
	}}
	selected={true}
	>ไม่เรียง
</RadioButton>
<RadioButton
	name="difficulty-sort"
	onclick={() => {
		$searchParams.difficultySortBy = "ASC";
	}}
	>น้อยไปมาก
</RadioButton>
<RadioButton
	name="difficulty-sort"
	onclick={() => {
		$searchParams.difficultySortBy = "DESC";
	}}
	>มากไปน้อย
</RadioButton>
<div>ช่วงความยาก:</div>
<input
	type="range"
	min="0"
	max="5"
	step="0.5"
	bind:value={$searchParams.minDifficulty}
	on:input={() => {
		if ($searchParams.minDifficulty > $searchParams.maxDifficulty) {
			$searchParams.maxDifficulty = $searchParams.minDifficulty;
		}
	}}
/>
<input
	type="range"
	min="0"
	max="5"
	step="0.5"
	bind:value={$searchParams.maxDifficulty}
	on:input={() => {
		if ($searchParams.maxDifficulty < $searchParams.minDifficulty) {
			$searchParams.minDifficulty = $searchParams.maxDifficulty;
		}
	}}
/>
<div class="range-values">
	<span>{$searchParams.minDifficulty}</span>
	<span>ถึง</span>
	<span>{$searchParams.maxDifficulty}</span>
</div>

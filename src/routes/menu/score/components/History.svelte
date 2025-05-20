<script lang="ts">
	import * as api from "$lib/fetchApi";
	import { onMount } from "svelte";

	export let userDataHistory: any;

	//-------------------------------------------------------
	// Variables
	//-------------------------------------------------------
	let dataScoreHistory: any[] = [];

	//-------------------------------------------------------
	// Functions
	//-------------------------------------------------------
	function formatDate(dateString: string): { date: string; time: string } {
		const date = new Date(dateString);
		const datePart = date.toLocaleDateString("th-TH", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
		const timePart = date.toLocaleTimeString("th-TH", {
			hour: "2-digit",
			minute: "2-digit",
		});
		return { date: datePart, time: timePart };
	}

	//-------------------------------------------------------
	// Lifecycle
	//-------------------------------------------------------
	onMount(async () => {
		const scoreHistory = await api.call(`/user/score/${userDataHistory.id}`, {
			withToken: true,
		});
		dataScoreHistory = scoreHistory.scoreLogs;
	});
</script>

{#each dataScoreHistory as data}
	<div class="sc-history-score-main">
		{#if data.amount < 0}
			<div style="color: var(--sc-minus);">{data.amount}</div>
		{:else if data.amount > 0}
			<div style="color: var(--sc-plus);">+{data.amount}</div>
		{/if}
		<div class="message">{data.message}</div>
		<div id="sc-right-history">
			<span class="modified-by-name">{data.modifiedBy.name}</span>
			<span class="time" style="color: var(--sc-orangedark);">{formatDate(data.date).time}</span>
			<span class="date" style="color: var(--sc-orangedark);">{formatDate(data.date).date}</span>
		</div>
	</div>
{/each}

<style lang="scss">
	//-------------------------------------------------------
	// Element/Class Styles
	//-------------------------------------------------------
	.date {
		text-align: end;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: inline-block;
		width: 100%;
	}

	.time {
		text-align: end;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: inline-block;
		width: 100%;
	}

	.message {
		padding-inline: 10px;
		flex: 1 1 0;
		min-width: 0;
	}

	.sc-history-score-main {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border: 1px solid var(--outline);
		margin-bottom: 10px;
		padding: 10px;
		border-radius: 10px;
		width: 100%;
		height: auto;

		& > div:first-child {
			flex: 0 0 60px;
		}

		#sc-right-history {
			display: flex;
			flex-direction: column;
			align-items: end;
			min-width: 0;
			width: 30%;
		}

		.modified-by-name {
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			display: inline-block;
		}
	}
</style>

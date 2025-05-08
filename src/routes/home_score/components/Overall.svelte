<script lang="ts">
    import List from "$lib/components/List.svelte";
    import BadgeGold from "$lib/components/Icons/Badge_Gold.svelte";
    import BadgeSilver from "$lib/components/Icons/Badge_Silver.svelte";
    import BadgeBronze from "$lib/components/Icons/Badge_Bronze.svelte";

    export type OverallData = {
		name: string;
		id: string;
		house: string;
		score: number;
	};

    let {index, data}: {index: number; data: OverallData} = $props();
</script>

<List class="homescorelist {index < 3 ? 'top' : ''}>">
    <div class:image={index<=2}>
        {#if index == 0}
            <BadgeGold></BadgeGold>
        {:else if index == 1} 
            <BadgeSilver></BadgeSilver>
        {:else if index == 2} 
            <BadgeBronze></BadgeBronze>
        {:else}
            {String(+index + 1).padStart(2, "0")}
        {/if}
    </div>
    <div>{data.name}</div>
	<div>{data.id}</div>
	<div>{data.house}</div>
	<div>{data.score}</div>
</List>

<style>
    :global(.homescorelist) {
		display: flex;
		container-type: inline-size;
		justify-content: space-between;
		margin-top: 20px;
		padding: 10px;
		height: 50px;
		background-color: rgba(255, 255, 255, 0.8);
		box-sizing: border-box;
		overflow: visible;
		:global(> div) {
            text-align: center;
			&:nth-child(1) {
				width: 5%;
				min-width: 10%;
				max-width: 10%;
				z-index: 3;
			}
			&:nth-child(2) {
				width: 15%;
				min-width: 150px;
				min-width: 35%;
			}
			&:nth-child(3) {
				width: 10%;
			}
			&:nth-child(4) {
				width: 20%;
			}
			&:nth-child(5) {
				width: 8%;
			}
        }
	}

    .image {
		margin-top: -25px;
	}
</style>
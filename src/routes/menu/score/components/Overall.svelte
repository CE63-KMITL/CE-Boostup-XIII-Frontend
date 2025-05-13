<script lang="ts">
    import RankOrdering from "./RankOrdering.svelte";

    let dataOverall = [
    { name: "Veerapat Pirultham", id: "67010852", house: "bard", score: 700 },
    { name: "Nattapong Suksiri", id: "67010853", house: "mage", score: 680 },
    { name: "Kamonchai Lekbun", id: "67010854", house: "rogue", score: 660 },
    { name: "Somsak Pradchaphet", id: "67010855", house: "warrior", score: 640 },
    { name: "Patsorn Chaiyawan", id: "67010846", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    ];

</script>

{#each dataOverall as user, i}
    <RankOrdering index={i}>
    	<div>{user.name}</div>
    	<div>{user.id}</div>
    	<div>{user.house}</div>
    	<div>{user.score}</div>
    </RankOrdering>
{/each}

<style lang="scss">
    :global(.OverallSize) {
		display: flex;
        background-color: var(--sc-bg);
    }
</style>
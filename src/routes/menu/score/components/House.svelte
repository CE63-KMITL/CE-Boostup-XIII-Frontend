<script lang="ts">
    import RankOrdering from "./RankOrdering.svelte";

    let dataHouse = [
    { house: "bard", score: 2750 },
    { house: "mage", score: 2600 },
    { house: "rogue", score: 2480 },
    { house: "warrior", score: 2405 },
    { house: "healer", score: 2380 },
    ];

</script>

{#each dataHouse as user, i}
    <RankOrdering index={i}>
        <div style="width: 60%; text-align: left;">{user.house}</div>
    	<div>{user.score}</div>
    </RankOrdering>
{/each}


<style lang="scss">
    :global(.TEST){
        width: 60%;
        text-align: left;
    }
</style>
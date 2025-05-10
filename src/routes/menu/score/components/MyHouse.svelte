<script lang="ts">
    import RankOrdering from "./RankOrdering.svelte";

    let dataMyHouse = [
    { name: "Veerapat Pirultham", id: "67010852", score: 720 },
    { name: "Nattapong Suksiri", id: "67010853", score: 700 },
    { name: "Kamonchai Lekbun", id: "67010854", score: 680 },
    { name: "Somsak Pradchaphet", id: "67010855", score: 650 },
    { name: "Patsorn Chaiyawan", id: "67010856", score: 640 },
    ];

</script>

{#each dataMyHouse as user, i}
    <RankOrdering index={i}>
    	<div>{user.name}</div>
    	<div>{user.id}</div>
    	<div>{user.score}</div>
    </RankOrdering>
{/each}
<script lang="ts">
    import RankOrdering from "./RankOrdering.svelte";
    
    let selectedOptionDropdown: string = "Barbarian";
    const optionDropdown: { value: string; }[] = [
    { value: 'Barbarian' }, { value: 'Rogue' }, { value: 'Sorcerer' },{ value: 'Bard' }, 
    { value: 'Monk' }, { value: 'Paladin' }, { value: 'Wizard' }, { value: 'Priest' }, 
    { value: 'Ranger' }, { value: 'Fighter' }, { value: 'Warlock' }, { value: 'Samurai' },
    ];

    let dataMyHouse = [
    { name: "Veerapat Pirultham", id: "67010852", score: 720 },
    { name: "Nattapong Suksiri", id: "67010853", score: 700 },
    { name: "Kamonchai Lekbun", id: "67010854", score: 680 },
    { name: "Somsak Pradchaphet", id: "67010855", score: 650 },
    { name: "Patsorn Chaiyawan", id: "67010856", score: 640 },
    ];

</script>

<div class="myHouseLeaderboard">
    <select id="dropdown" bind:value={selectedOptionDropdown}>
        {#each optionDropdown as option}
            <option>{option.value}</option>
        {/each}
    </select>
    <!-- <p>choice: {selectedOptionDropdown}</p> -->
    <!-- <p>{selectedOptionDropdown}</p> -->
</div>
{#each dataMyHouse as user, i}
    <RankOrdering index={i}>
        <div>{user.name}</div>
        <div>{user.id}</div>
        <div>{user.score}</div>
    </RankOrdering>
{/each}

<style lang="scss">
    .myHouseLeaderboard {
        display: flex;
        flex-direction: column;
        align-items: center;

        #dropdown {
            background-color: var(--list-bg);
            width: 40%;
            border: 0.5px solid var(--outline);
            border-radius: 20px;
            padding: 7px;
        }
    }

    

</style>
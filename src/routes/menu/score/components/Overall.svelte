<script lang="ts">
	import LoadingList from "$lib/components/LoadingList.svelte";
	import RankOrdering from "./RankOrdering.svelte";
    import UserIcon from "$lib/components/UserIcon.svelte";
    import { selectData } from "../score";

    export let data;

    // let dataOverall = [
    // { name: "Veerapat Pirultham", id: "67010852", house: "bard", score: 700 },
    // { name: "Nattapong Suksiri", id: "67010853", house: "mage", score: 680 },
    // { name: "Kamonchai Lekbun", id: "67010854", house: "rogue", score: 660 },
    // { name: "Somsak Pradchaphet", id: "67010855", house: "warrior", score: 640 },
    // { name: "Patsorn Chaiyawan", id: "67010846", house: "healer", score: 620 },
    // { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    // { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    // { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    // { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    // { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    // { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    // ];

    function handleUserClick(event: CustomEvent<{ user: any }>) {
        const clickedUser = event.detail.user;
        $selectData = clickedUser;
    }

</script>

{#each data as user, i}
    {#if user == "loading"}
		<LoadingList></LoadingList>
	{:else}
        <RankOrdering index={i} id={user.id} on:select={handleUserClick}>
            <div id="overall-userIcon"> <UserIcon data={user?.icon}/> </div>
        	<div>{user.name}</div>
        	<div>{user.id}</div>
        	<div>{user.house}</div>
        	<div>{user.score}</div>
        </RankOrdering>
    {/if}
{/each}

<style lang="scss">
    #overall-userIcon {
        height: 100%;
        // width: 10%;
    }
</style>

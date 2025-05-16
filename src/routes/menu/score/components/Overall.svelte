<script lang="ts">
	import LoadingList from "$lib/components/LoadingList.svelte";
	import RankOrdering from "./RankOrdering.svelte";
    import UserIcon from "$lib/components/UserIcon.svelte";
    import { selectData } from "../score";

    export let data;

    // let data = [
    // { name: "Veerapat Pirultham", id: "67010852", house: "bard", score: 700 },
    // ];

    function handleUserClick(event: CustomEvent<{ user: any }>) {
        const clickedUser = event.detail.user;
        $selectData = clickedUser;
        console.log(clickedUser);
        console.log($selectData);
    }

</script>

{#each data as user, i}
    {#if user == "loading"}
		<LoadingList></LoadingList>
	{:else}
        <RankOrdering index={i} id={user.id} user={user} on:select={handleUserClick}>
            <div id="overall-userIcon"> <UserIcon data={user?.icon}/> </div>
        	<div>{user.name}</div>
        	<div>{user.studentId}</div>
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

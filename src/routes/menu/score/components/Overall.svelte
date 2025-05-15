<script lang="ts">
	import LoadingList from "$lib/components/LoadingList.svelte";
	import RankOrdering from "./RankOrdering.svelte";
    import UserIcon from "$lib/components/UserIcon.svelte";
    import { selectData } from "../score";

    export let data;

    function handleUserClick(event: CustomEvent<{ user: any }>) {
        let clickedUser = event.detail.user;
        $selectData = clickedUser;
        console.log(clickedUser);
    }

</script>

{#each data as user, i}
    {#if user == "loading"}
		<LoadingList></LoadingList>
	{:else}
        <RankOrdering index={i} id={user.id} user={user} on:select={handleUserClick}>
            <div><UserIcon data={user?.icon}/></div>
        	<div>{user.name}</div>
        	<div>{user.studentId}</div>
        	<div>{user.house}</div>
        	<div>{user.score}</div>
        </RankOrdering>
    {/if}
{/each}

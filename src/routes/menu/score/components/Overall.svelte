<script lang="ts">
	import LoadingList from "$lib/components/LoadingList.svelte";
	import RankOrdering from "./RankOrdering.svelte";
    import UserIcon from "$lib/components/UserIcon.svelte";
    import { selectData } from "../score";

    export let data;

    // let data = [
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "barbarian", score: 2700 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "sorcerer", score: 1700 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "rogue", score: 700 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "wizard", score: 100 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "bard", score: 30 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "paladin", score: 1 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "monk", score: 20 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "samurai", score: 3300 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "ranger", score: 7400 },
    // ];

    function handleUserClick(event: CustomEvent<{ user: any }>) {
        let clickedUser = event.detail.user;
        $selectData = clickedUser;
        console.log(clickedUser);
    }

</script>

{#each data as user, i}
    <!-- {#if user == "loading"}
		<LoadingList></LoadingList>
	{:else} -->
        <RankOrdering index={i} id={user.id} user={user} on:select={handleUserClick}>
            <div><UserIcon data={user?.icon}/></div>
        	<div>{user.name}</div>
        	<div>{user.studentId}</div>
        	<div>{user.house}</div>
        	<div>{user.score}</div>
        </RankOrdering>
    <!-- {/if} -->
{/each}

<style lang="scss">
    :global(> div) {
        text-align: center;

        &:nth-child(1) {
            width: 10%;
            min-width: 10%;
            max-width: 10%;
        }
        &:nth-child(2) {
            width: 20%;
            min-width: 20%;
            max-width: 20%;
        }
        &:nth-child(3) {
            width: 20%;
            min-width: 20%;
            max-width: 20%;
        }
        &:nth-child(4) {
            width: 20%;
            min-width: 20%;
            max-width: 20%;
        }
        &:nth-child(5) {
            width: 10%;
            min-width: 10%;
            max-width: 10%;
        }
    }
</style>

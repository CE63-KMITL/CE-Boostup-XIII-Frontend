<script lang="ts">
    import UserIcon from "$lib/components/UserIcon.svelte";
    import RankOrdering from "./RankOrdering.svelte";
    import { currentSelectStudent } from "../score";

    let dataOverall: any = [
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

    function handleUserClick(event: CustomEvent<{ user: any }>) {
        const clickedUser = event.detail.user;
        $currentSelectStudent = clickedUser;
        console.log($currentSelectStudent)
    }
    
</script>

{#each dataOverall as user, i}
    <RankOrdering index={i} user={user} on:select={handleUserClick}>
        <div id="overall-userIcon"> <UserIcon data={user?.icon}/> </div>
    	<div>{user.name}</div>
    	<div>{user.id}</div>
    	<div>{user.house}</div>
    	<div>{user.score}</div>
    </RankOrdering>
{/each}

<style lang="scss">
    #overall-userIcon {
        height: 100%;
        // width: 10%;
    }
</style>
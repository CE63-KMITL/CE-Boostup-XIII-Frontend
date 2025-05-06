<script lang="ts">
    /*
     -------------------------------------------------------
     Imports
     -------------------------------------------------------
     */
    // import './HomeScore.css';
    import Fullscreen from "../../components/Fullscreen.svelte";
    import Button from "../../components/Button.svelte";
    // import { page } from '$app/stores';
    // import { goto } from "$app/navigation";
    import BadgeGold from "../../components/Icons/Badge_Gold.svelte";
    import BadgeSilver from "../../components/Icons/Badge_Silver.svelte";
    import BadgeBronze from "../../components/Icons/Badge_Bronze.svelte";
    // import Frame from "../../components/Frame.svelte";
    // $: query = $page.url.searchParams.get('page') || 'overall';
    export let data;
    const { users, houseScores, myHouseMembers, myHouseName } = data;

    const profile = {
      name: 'เพ็ญพิชชา ปานจันทร์',
      studentId: '68010662',
      rank: 23,
      score: 300,
      houseRank: 5,
      houseScore: 1200,
      cardImg: '/house/warlock.png'
   };

</script>

<Fullscreen>
    <!-- Left Card -->
   <div class="profile-section">
        <img src={profile.cardImg} alt="" class="profile-image">
            <div class="profile-info">
                <div class="profile-name-id-box">
                    <span>{profile.name}</span>
                    <span class="profile-id">{profile.studentId}</span>
                </div>
                <div class="profile-detail-top">นักผจญภัยอันดับที่ {profile.rank}</div> 
                <div class="profile-detail-bottom">{profile.score}</div>
                <div class="profile-detail-top">บ้านอันดับที่ {profile.houseRank}</div> 
                <div class="profile-detail-bottom">{profile.houseScore}</div>
                <Button class="profile-button">ประวัติคะแนน</Button>
            </div>
    </div>

    <div>
        sdasdasdasdas
    </div>
</Fullscreen>

<style lang="scss">
    :global(*) {
        transition: all 0.2s ease-out;
    }
    // -------------------------------------------------------
    // Left Side Score GUI
    // -------------------------------------------------------
    .profile-section {
        background: var(--bg-50);
        border-radius: 24px;
        box-shadow: 0 4px 24px var(--list-shadow, rgba(0,0,0,0.08));
        padding: 30px 30px;
        margin: 64px 0px 64px 110px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 26%;
        height: 87%;
    }
    .profile-image {
        width: 350px;
        height: auto;
    }
    .profile-info {
        background: var(--bg);
        border: 1px solid var(--outline);
        border-radius: 10px;
        padding: 18px 18px;
        margin: 0px 15px 20px 15px;
        width: 100%;
    }
    .profile-detail-top {
        background-color: #F1D5A1;
        border: 1px solid var(--outline);
        border-radius: 10px 10px 0px 0px;
        margin: 25px 0px 0px 0px;
        padding: 5px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .profile-detail-bottom {
        border: 1px solid var(--outline);
        border-top-width: 0;
        border-radius: 0px 0px 10px 10px;
        padding: 5px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .profile-name-id-box {
        display: flex;
        justify-content: space-between;
    }
    .profile-id {
        color: #A9844D;
    }
    :global(.profile-button) {
        border: 1px solid #000000;
    }
</style>
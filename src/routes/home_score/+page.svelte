<script>
   import './HomeScore.css';
   import Score from '../../components/Score.svelte';
   import { goto } from '$app/navigation';
   import { page } from '$app/stores';
   import Button from '../../components/Button.svelte';
   import Fullscreen from '../../components/Fullscreen.svelte';
   $: query = $page.url.searchParams.get('page') || 'overall';
   export let data;
   const { users, houseScores, myHouseMembers, myHouseName } = data;

   // ตัวอย่างข้อมูลโปรไฟล์ (ควรดึงจาก backend จริง)
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
   <div class="header-bar">
      <div class="header-left">
         <img src="/logo.png" alt="logo" class="header-logo" />
         <img src="/logo-text.png" alt="CE BOOSTUP" class="header-logo-text" />
      </div>
      <div class="header-center">
         <a class="header-menu {($page.url.pathname === '/Problem') ? 'active' : ''}" href="/Problem">โจทย์</a>
         <a class="header-menu {($page.url.pathname === '/home_score') ? 'active' : ''}" href="/home_score">คะแนน</a>
      </div>
      <div class="header-right">
         <Button class="header-icon-btn" on:click={() => goto('/home_score')}>
            <img src="/favicon.png" alt="home_score" />
         </Button>
         <Button class="header-icon-btn" on:click={() => goto('/home_score')}>
            <img src="/favicon.png" alt="home_score" />
         </Button>
      </div>
   </div>

   <div class="main-leaderboard-container">
      <!-- ซ้าย: โปรไฟล์การ์ด -->
      <div class="profile-section">
         <div class="profile-card">
            <img src={profile.cardImg} alt="profile-card" class="profile-card-img" />
            <div class="profile-info">
               <div class="profile-name-id">
                  <span class="profile-name">{profile.name}</span>
                  <span class="profile-id">{profile.studentId}</span>
               </div>
               <div class="profile-rank-box highlight-box">
                  <div class="profile-rank-title">นักผจญภัยอันดับที่ {profile.rank}</div>
                  <div class="profile-rank-score">{profile.score}</div>
               </div>
               <div class="profile-house-box highlight-box">
                  <div class="profile-house-title">บ้านอันดับที่ {profile.houseRank}</div>
                  <div class="profile-house-score">{profile.houseScore}</div>
               </div>
               <Button class="profile-history-btn">ประวัติคะแนน</Button>
            </div>
         </div>
      </div>

      <!-- ขวา: Leaderboard -->
      <div class="leaderboard-section">
         <div class="leaderboard-tabs">
            <a class="tab {query === 'overall' ? 'active' : ''}" href="?page=overall">Overall</a>
            <a class="tab {query === 'house_score' ? 'active' : ''}" href="?page=house_score">House</a>
            <a class="tab {query === 'my_house_score' ? 'active' : ''}" href="?page=my_house_score">My House</a>
         </div>
         <div class="leaderboard-table" style="max-height: 420px; overflow-y: auto;">
            {#if query === 'overall'}
               {#each users as user, index}
                  <div class="leaderboard-row {index < 3 ? 'top3' : ''}">
                     <span>
                        {#if index === 0}
                           <img src="/path/to/gold-medal.png" class="medal" />
                        {:else if index === 1}
                           <img src="/path/to/silver-medal.png" class="medal" />
                        {:else if index === 2}
                           <img src="/path/to/bronze-medal.png" class="medal" />
                        {:else}
                           {String(index + 1).padStart(2, '0')}
                        {/if}
                     </span>
                     <span>{user.firstName} {user.lastName}</span>
                     <span>{user.studentId}</span>
                     <span>{user.house}</span>
                     <span>{user.score}</span>
                  </div>
               {/each}
            {:else if query === 'house_score'}
               {#each houseScores as house, index}
                  <div class="leaderboard-row {index < 3 ? 'top3' : ''}">
                     <span>
                        {#if index === 0}
                           <img src="/path/to/gold-medal.png" class="medal" />
                        {:else if index === 1}
                           <img src="/path/to/silver-medal.png" class="medal" />
                        {:else if index === 2}
                           <img src="/path/to/bronze-medal.png" class="medal" />
                        {:else}
                           {String(index + 1).padStart(2, '0')}
                        {/if}
                     </span>
                     <span>{house.houseName}</span>
                     <span>-</span>
                     <span>-</span>
                     <span>{house.score}</span>
                  </div>
               {/each}
            {:else if query === 'my_house_score'}
               <div class="leaderboard-row header" style="background: #fffbe6;">
                  <div style="width:100%; text-align:center;">บ้าน {myHouseName}</div>
               </div>
               {#each myHouseMembers as user, index}
                  <div class="leaderboard-row {index < 3 ? 'top3' : ''}">
                     <span>{String(index + 1).padStart(2, '0')}</span>
                     <span>{user.firstName} {user.lastName}</span>
                     <span>{user.studentId}</span>
                     <span>{user.house}</span>
                     <span>{user.score}</span>
                  </div>
               {/each}
            {/if}
         </div>
      </div>
   </div>
</Fullscreen>

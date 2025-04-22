
<script>
   import './HomeScore.css';
   import Score from '../../components/Score.svelte';
   import { page } from '$app/stores';
   $: query = $page.url.searchParams.get('page');
   export let data
   const { users }= data
   import Fullscreen from '../../components/Fullscreen.svelte';
</script>
<Fullscreen>



   <div class="OptionsMenu">
      <nav class="menu">
         <ul>
            <li><a href="?page=overall">Overall</a></li>
            <li><a href="?page=house_score">House</a></li>
            <li><a href="?page=my_house_score">My House</a></li>
         </ul>
      </nav>
   </div>
{#if query == 'overall'}
<div style="display: flex;justify-content:center; margin-top: 20px; ">
   <div style="width:80%; border:1px solid #767676; border-radius :20px; padding:20px; box-sizing: border-box; overflow:scroll; height:420px; " >
   {#each users as user, index}
   <Score number={index + 1} name={user.firstName} score={Math.floor(Math.random() * 1000)} highlight={user.firstName.toLowerCase() === 'james' } /> 
   <!-- ทดสอบ component Score highlight เอาไว้ใส่ user ที่ login อยู่ ณ ปัจจุบัน -->
    
   {/each}
</div>
</div>
{/if}
</Fullscreen>


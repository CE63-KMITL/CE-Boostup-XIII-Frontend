
<script >
   import './HomeScore.css';
   import Score from './Score.svelte';
   import { page } from '$app/stores';
   $: query = $page.url.searchParams.get('page');
   export let data
   const { users }= data
   import Fullscreen from '../../components/Fullscreen.svelte';
</script>
<Fullscreen>




{#if query == 'overall'}
<div style="display: flex;justify-content:center; margin-top: 20px; ">
   <div style="width:100%; border:1px solid #767676; border-radius :20px; padding:20px; box-sizing: border-box; overflow:scroll; height:420px; background-color:rgba(255,255,255,0.8); " >
      <div class="OptionsMenu">
         <nav class="menu">
            <ul>
               <li><a href="?page=overall">Overall</a></li>
               <li><a href="?page=house_score">House</a></li>
               <li><a href="?page=my_house_score">My House</a></li>
            </ul>
         </nav>
      </div>
   <Score/>
</div>
</div>
{/if}
</Fullscreen>


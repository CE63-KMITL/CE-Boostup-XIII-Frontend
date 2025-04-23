<script lang="ts">
  import "./HomeScore.css";
  import Score from "./Score.svelte";
  import House from "./House.svelte"; // ใช้กับ House
  import MyHouse from "./MyHouse.svelte"; // ใช้กับ MyHouse
  import type { DataHouse } from "./House.svelte";
  import type { DataMyhouse } from "./MyHouse.svelte";
  import { onMount } from "svelte";
  import type { Data } from "./Score.svelte";
  import { page } from "$app/stores";
  import { derived } from "svelte/store";
  const query = derived(page, ($page) => $page.url.searchParams.get("page"));
  let scoreData: Data[] = [
    { name: "Veerapat Pirultham", id: "67010852", house: "bard", score: 700 },
    { name: "Nattapong Suksiri", id: "67010853", house: "mage", score: 680 },
    { name: "Kamonchai Lekbun", id: "67010854", house: "rogue", score: 660 },
    {
      name: "Somsak Pradchaphet",
      id: "67010855",
      house: "warrior",
      score: 640,
    },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
  ]; // ใช้กับ Overall
  let houseData: DataHouse[] = [
    { house: "bard", score: 2750 },
    { house: "mage", score: 2600 },
    { house: "rogue", score: 2480 },
    { house: "warrior", score: 2405 },
    { house: "healer", score: 2380 },
  ]; // แสดง house และ score
  let myHouseData: DataMyhouse[] = [
    { name: "Veerapat Pirultham", id: "67010852", score: 720 },
    { name: "Nattapong Suksiri", id: "67010853", score: 700 },
    { name: "Kamonchai Lekbun", id: "67010854", score: 680 },
    { name: "Somsak Pradchaphet", id: "67010855", score: 650 },
    { name: "Patsorn Chaiyawan", id: "67010856", score: 640 },
  ]; // แสดง name id score

  //  export let data
  //  const { users }= data;
  import Fullscreen from "../../components/Fullscreen.svelte";
  import Nav from "./Nav.svelte";

  onMount(async () => {
    if ($query === "Overall") {
      const res = await fetch("/api/score");
      scoreData = await res.json();
    } else if ($query === "House") {
      const res = await fetch("/api/house");
      houseData = await res.json();
    } else if ($query === "My House") {
      const res = await fetch("/api/myhouse");
      myHouseData = await res.json();
    }
  });
</script>

<Fullscreen>
  <div style="display: flex;justify-content:center; margin-top: 20px; ">
    <div
      style="width:95%; 
   border:1px solid #767676; 
   border-radius :20px; 
   padding:20px; box-sizing: 
   border-box; overflow:scroll; 
   height:600px; 
   background-color:rgba(255,255,255,0.8); "
    >
      <!-- ไม่ใส่ Nav ก็ได้ -->
      <Nav />
      {#if $query === "Overall" || $query === null}
        {#each scoreData as user, i}
          <Score index={i} data={user} />
        {/each}
      {:else if $query === "House"}
        {#each houseData as house, i}
          <House index={i} data={house} />
        {/each}
      {:else if $query === "My House"}
        {#each myHouseData as user, i}
          <MyHouse index={i} data={user} />
        {/each}
      {:else}
        {#each scoreData as user, i}
          <Score index={i} data={user} />
        {/each}
      {/if}
    </div>
  </div>
</Fullscreen>

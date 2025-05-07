<script lang="ts">
  
  import "./HomeScore.css";
  // import Button from '../../components/Button.svelte';
  import HistoryButton from './HistoryButton.svelte'
  import Score from "./Score.svelte";
  import House from "./House.svelte";
  import MyHouse from "./MyHouse.svelte";
  import type { DataHouse } from "./House.svelte";
  import type { DataMyhouse } from "./MyHouse.svelte";
  import { onMount } from "svelte";
  import type { Data } from "./Score.svelte";
  import { page } from "$app/stores";
  import { derived } from "svelte/store";
  import { goto } from '$app/navigation';
  import Fullscreen from "../../components/Fullscreen.svelte";
  import Nav from "./Nav.svelte";
  import Setting from "../../components/Icons/Setting.svelte";
  import User from "../../components/Icons/User.svelte";
  import { IsRole, userData } from "$lib/auth.local";
  import { Role } from "$lib/enum/role";
  import { pushState } from "$app/navigation";

  const items = { problem: "โจทย์", score: "คะแนน" };

  if (IsRole(Role.STAFF)) {
    items["create_problem"] = "สร้างโจทย์";
  }

  let currentPage;
  const updatePage = (name) => {
    if (name == currentPage) return;
    let url = new URL(window.location.href);
    url.searchParams.set("page", name);
    currentPage = name;
    pushState(url, null);
    document.title = items[currentPage];
  };

  onMount(() => {
    let url = new URL(window.location.href);
    if (!url.searchParams.get("page")) {
      url.searchParams.append("page", "score");
      window.history.pushState(null, null, url);
    }
    currentPage = url.searchParams.get("page");
    document.title = items[currentPage];
  });

  const query = derived(page, ($page) => $page.url.searchParams.get("page"));
  let scoreData: Data[] = [
    { name: "Veerapat Pirultham", id: "67010852", house: "bard", score: 700 },
    { name: "Nattapong Suksiri", id: "67010853", house: "wizard", score: 680 },
    { name: "Kamonchai Lekbun", id: "67010854", house: "rogue", score: 660 },
    {
      name: "Somsak Pradchaphet",
      id: "67010855",
      house: "warlock",
      score: 640,
    },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "priest", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "priest", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "priest", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "priest", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "priest", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "priest", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "priest", score: 620 },
  ]; // ใช้กับ Overall
  let houseData: DataHouse[] = [
    { house: "bard", score: 2750 },
    { house: "wizard", score: 2600 },
    { house: "rogue", score: 2480 },
    { house: "warlock", score: 2405 },
    { house: "priest", score: 2380 },
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

  // Interface สำหรับข้อมูลผู้ใช้
  interface UserProfile {
    name: string;
    studentId: string;
    rank: number;
    score: number;
    houseRank: number;
    houseScore: number;
    cardImg: string;
  }

  // ตัวแปรสำหรับเก็บข้อมูลผู้ใช้ที่ login
  let currentUser: UserProfile | null = null;

  async function fetchUserProfile() {
    const res = await fetch('/api/user/profile');
    return await res.json();
  }

  onMount(async () => {
    // TODO: เปลี่ยนเป็น API call จริงในอนาคต
    // ตัวอย่างการดึงข้อมูลผู้ใช้จาก API
    try {
      // const response = await fetch('/api/user/profile');
      // currentUser = await response.json();
      
      // ข้อมูลตัวอย่างชั่วคราว
      const user = {
        name: "David King",
        studentId: "68000001",
        house: "priest",
        rank: 1,
        score: 70000,
        houseRank: 1,
        houseScore: 1000000
      };
      currentUser = {
        ...user,
        cardImg: `/house/${user.house}.png`
      };
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }

    // โค้ดเดิมสำหรับดึงข้อมูล score
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
  <div id="topbar">
    <div id="start">
      <img id="logo" src="/logo.png" alt="LOGO" />
      <img id="logo-text" src="/logo-text.png" alt="CE BOOSTUP" />
    </div>
    <div id="page-selector-container">
      {#each Object.keys(items) as item}
        <button
          class="page-selector"
          data-currentPage={currentPage == item}
          on:click={() => updatePage(item)}
        >
          {items[item]}
        </button>
      {/each}
    </div>
    <div id="end">
      <div class="circle-bg" role="button" tabindex="0" on:click={() => window.location.href = '/login'}>
        ล็อคอิน
      </div>
      <div class="circle-bg">
        <Setting />
      </div>
    </div>
  </div>

  <div style="
  display: flex; 
  justify-content: 
  center; 
  margin-top: 20px;">

    <div style="
    width:95%; 
    border:none; 
    border-radius:20px; 
    padding:0; 
    box-sizing:border-box; 
    background:transparent;">

      <div class="score-flex-container">
        <!-- ซ้าย: โปรไฟล์การ์ด -->
        <div class="profile-card-box">
          {#if currentUser}
            <div class="profile-card-main">
              <div class="profile-card-image-frame">
                <img src={currentUser.cardImg} alt="profile-card" class="profile-card-image" />
              </div>
              <div class="profile-card-info">
                <div class="profile-card-name-id">
                  <span class="profile-card-name">{currentUser.name}</span>
                  <span class="profile-card-id">{currentUser.studentId}</span>
                </div>
                <div class="profile-card-section">
                  <div class="profile-card-section-title">นักผจญภัยอันดับที่ {currentUser.rank}</div>
                  <div class="profile-card-section-value">{currentUser.score}</div>
                </div>
                <div class="profile-card-section">
                  <div class="profile-card-section-title">บ้านอันดับที่ {currentUser.houseRank}</div>
                  <div class="profile-card-section-value">{currentUser.houseScore}</div>
                </div>
                <button class="profile-card-history-btn">ประวัติคะแนน</button>
              </div>
            </div>
          {:else}
            <div class="profile-card loading">
              <div class="loading-text">กำลังโหลดข้อมูล...</div>
            </div>
          {/if}
        </div>
        <!-- ขวา: ตาราง -->
        <div class="main-leaderboard-container leaderboard-box">
          <Nav />
          <div class="leaderboard-table">
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
      </div>
    </div>
  </div>
</Fullscreen>
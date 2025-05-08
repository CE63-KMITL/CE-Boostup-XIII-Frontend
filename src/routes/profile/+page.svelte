<script lang="ts">
  //import NavBar from '../../components/NavBar.svelte'
  import { onMount } from 'svelte';
  import * as api from "$lib/fetchApi";
  import icon from "./placeholder.jpg";

  // convert date to dd/mm format
  function convertDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit' };
    return date.toLocaleDateString('th-TH', options);
  }

  let user = null;
  let scoreInfo = null;
  let scoreLog = null;

  onMount(async () => {
      // Fetch user data
      user = await api.call('/user/me', { method: 'GET', withToken: true });
      scoreInfo = await api.call('/user/me/scorelog', { method: 'GET', withToken: true });
      scoreLog = scoreInfo.scoreLogs;
      console.log(scoreLog)
      console.log(user);
  })
</script>

<div class="Container">
  <div class="profile">
    <h1>ข้อมูลนักผจญภัย</h1>
    <div class="profile_box">
      <div>
        <img src={icon} alt="การ์ดนักผจญภัย" class="icon" />
        <table class="score_table">
          <thead>
            <tr>
              <th class="score_header">คะแนนนักผจญภัย</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="score_body">{user?.score}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="profile_info">
        <div class="bio_info">
          <img src={icon} alt="รูปนักผจญภัย" class="icon" />
          <div class="name_id">
            <div class="name">{user?.name}</div>
            <div class="id">{user?.studentId}</div>
          </div>
        </div>

        <div>
          <div CLASS="personal_info">
            <div>อีเมล : {user?.email?user?.email:"NULL"}</div>
            <div>บ้าน : {user?.house?user?.house:"NULL"}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="score_history">
    <h2>ประวัติคะแนน</h2>
    <div class="score_table">
      {#each scoreLog as log, i}
      <div class="score_body">
        <div class="score_number">{scoreLog[i]?.amount}</div>
        <div class="staff_and_time">
          <div class="staff">{scoreLog[i]?.modifiedBy?.name}</div>
          <div class="time">{convertDate(scoreLog[i]?.date)}</div>
        </div>
      </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  h1 {
    font-size: 2vw;
    font-weight: 700;
    text-align: center;
    margin-top: 4.5vh;
    color:var(--text);
  }

  h2 {
    font-size: 1.3vw;
    font-weight: 4000;
    text-align: left;
    margin-top: 3vh;
    margin-left: 2vw;
    color:var(--text);
  }

  .Container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2vw;
    min-height: 100vh;
    width: 100vw;
    padding-top: 2.5vh;
    padding-bottom: 2.5vh;
  }

  .profile {
    width: 45vw;
    height: 80vh;
    background-color: var(--profile-bg);
    border-radius: 20px;
    outline: 2px solid;
    border-color: var(--list-border);
  }

  .profile_box {
    display: flex;
    margin-top: 2vh;
  }

  .score_history {
    width: 45vw;
    height: 80vh;
    background-color: var(--profile-bg);
    border-radius: 20px;
    outline: 2px solid;
    border-color: var(--list-border);
  }

  .score_history .score_table {
    overflow-y:auto;
    width: 45vw;
    height: 70vh;
    padding-bottom:1.2vh;
    }

  .score_history .score_table .score_body {
    display:flex;
    height:10vh;
    width:40vw;
    margin-top:3vh;
    margin-left: auto;
    margin-right: auto;
    background-color: var(--list-bg);
    border-radius: 10px;
    outline: 1px solid;
  }

  .score_history .score_table .score_body .score_number {
    font-size: 1.2vw;
    color: green;
    margin-top:auto;
    margin-bottom:auto;
    margin-left: 1.5vw;
  }

  .score_history .score_table .score_body .staff_and_time {
    font-size: 1vw;
    margin-top:auto;
    margin-bottom:auto;
    margin-left: 32vw;
    text-align:center;
  }

  .score_history .score_table .score_body .staff_and_time .time {
    font-weight:600;
    color: var(--theme-dark-text);
  }

  .score_history .score_table .score_body .staff_and_time .staff {
    font-weight:600;
    color: var(--text);
  }

  .profile .icon {
    width: 13vw;
    height: 40vh;
    margin-top: 5vh;
    margin-left: 4vw;
    border-radius: 15px;
  }
  .profile .score_table {
    margin-top: 2vh;
    margin-left: 4vw;
    text-align: center;
    height: 10vh;
    width: 13vw;
    background-color: var(--profile-bg);
  }

  .profile .score_header {
    font-size: 1vw;
    background: var(--light-yellow, #F1D5A1);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    outline: 1px solid;
  }

  .profile .score_body {
    font-size: 1vw;
    background-color: var(--list-bg);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-top: 2vh;
    padding-bottom: 2vh;
    outline: 1px solid;
  }

  .profile_info {
    width: 20vw;
    height: 53vh;
    margin-left: 2.5vw;
    margin-top: 5vh;
    border-radius: 20px;
    outline: 1px solid;
    border-color: var(--list-border);
    background-color: var(--profile-bg);
  }

  .bio_info {
    display: flex;
  }

  .bio_info .icon {
    width: 5vw;
    height: 11vh;
    border-radius: 50%;
    margin-top: 2vh;
    margin-left: 2vw;
  }

  .bio_info .name_id {
    font-size: 1.1vw;
    margin-top: 4vh;
    margin-left: 1.5vw;
  }
  .bio_info .name_id .name {
    color: var(--text);
  }
  .bio_info .name_id .id {
    color: var(--theme-dark-text);
  }
  
  .personal_info {
    font-size: 1.1vw;
    margin-top: 3vh;
    margin-left: 2vw;
    color: var(--text);
  }
  @media only screen and (max-width: 500px) {
    h1 {
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      margin-top: 20px;
    }

    h2 {
      font-size: 18px;
      font-weight: 700; /* Changed from 4000 which is invalid */
      text-align: left;
      margin-top: 15px;
      margin-left: 10px;
    }

    .Container {
      display: flex;
      flex-direction: column; /* Stack items vertically on mobile */
      align-items: center;
      justify-content: flex-start; /* Changed from center for better mobile flow */
      gap: 15px;
      min-height: 100vh;
      width: 100%;
      padding: 15px 10px;
      box-sizing: border-box;
    }

    .profile {
      width: 100%;
      max-width: 480px;
      height: auto;
      min-height: 300px;
      background-color: var(--profile-bg);
      border-radius: 15px;
      outline: 2px solid;
      border-color: var(--list-border);
      padding: 10px;
      box-sizing: border-box;
    }

    .profile_box {
      display: flex;
      flex-direction: column; /* Stack items vertically */
      margin-top: 10px;
    }

    .score_history {
      width: 100%;
      max-width: 480px;
      height: auto;
      min-height: 300px;
      background-color: var(--profile-bg);
      border-radius: 15px;
      outline: 2px solid;
      border-color: var(--list-border);
      padding: 10px;
      box-sizing: border-box;
    }

    .profile .icon {
      width: 98px;
      height: 147px;
      margin: 15px auto; /* Centered */
      border-radius: 15px;
    }

    .profile .score_table {
      margin: 15px auto;
      text-align: center;
      height: auto;
      width: 80%;
    }

    .profile .score_body {
      font-size: 14px;
      background-color: var(--list-bg);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: 10px;
      outline: 1px solid;
    }

    .profile_info {
      width: 100%;
      height: auto;
      margin: 15px 0;
      border-radius: 15px;
      outline: 1px solid;
      border-color: var(--list-border);
      background-color: var(--profile-bg);
      padding: 10px;
      box-sizing: border-box;
    }

    .bio_info {
      display: flex;
      flex-direction: column; /* Stack items vertically */
      align-items: center;
    }

    .bio_info .name_id {
      font-size: 16px;
      margin: 10px auto;
      text-align: center;
    }

    .bio_info .name_id .id {
      color: var(--theme-dark-text);
      display: block;
      margin-top: 5px;
    }

    .personal_info {
      font-size: 14px;
      margin: 15px 10px;
      line-height: 1.5;
    }
  }
</style>

<script lang="ts">
  //import NavBar from '../../components/NavBar.svelte'
  import icon from "./placeholder.jpg";
</script>

<div class="Container">
  <div class="profile">
    <h1 class="header">ข้อมูลนักผจญภัย</h1>
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
              <td class="score_body">(score)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="profile_info">
        <div class="bio_info">
          <img src={icon} alt="รูปนักผจญภัย" class="icon" />
          <div class="name_id">
            <div>(name)</div>
            <div class="id">(id)</div>
          </div>
        </div>

        <div>
         <div CLASS="personal_info">
            <div>(EMAIL)</div>
            <div>(HOUSE)</div>
         </div>
        </div>
      </div>
    </div>
  </div>

  <div class="score_history"></div>
</div>

<style lang="scss">
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
    border: 2px solid;
    border-color: var(--list-border);
  }

  .profile_box {
    display: flex;
  }

  .score_history {
    width: 45vw;
    height: 80vh;
    background-color: var(--profile-bg);
    border-radius: 20px;
    border: 2px solid;
    border-color: var(--list-border);
  }
  .profile .header {
    font-size: 2vw;
    font-weight: 700;
    text-align: center;
    margin-top: 2vh;
  }

  .profile .icon {
    width: 14vw;
    height: 40vh;
    margin-top: 5vh;
    margin-left: 4vw;
    border-radius: 15px;
  }
  .profile .score_table {
    height: 10vh;
    width: 10vw;
    margin-top: 2vh;
    margin-left: 5.8vw;
    text-align: center;
  }

  .profile .score_header {
    background: var(--light-yellow, #f1d5a1);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .profile .score_body {
    background-color: var(--list-bg);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-top: 2vh;
    padding-bottom: 2vh;
  }

  .profile_info {
    width: 20vw;
    height: 53vh;
    margin-left: 2.5vw;
    margin-top: 5vh;
    border-radius: 20px;
    border: 1px solid;
    border-color: var(--list-border);
    background-color: var(--profile-bg);
  }

  .bio_info {
   display:flex;
  }

  .bio_info .icon {
    width: 6vw;
    height: 12vh;
    border-radius: 50%;
    margin-top: 2vh;
    margin-left: 2vw;
  }

  .bio_info .name_id {
      font-size: 1vw;
      margin-top: 3vh;
      margin-left: 1vw;
  }

  .bio_info .name_id .id {
    color: var(--theme-dark-text);
  }

  .personal_info {
    font-size: 1vw;
    margin-top: 3vh;
    margin-left: 2vw;
  }
</style>

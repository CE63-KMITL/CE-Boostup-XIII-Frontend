<script lang="ts">
	//import NavBar from '../../components/NavBar.svelte'
	import { onMount } from "svelte";
	import * as api from "$lib/fetchApi";
	import houseIcon from "./house-placeholder.png";
	import UserIcon from "$lib/components/UserIcon.svelte";

	// convert date to dd/mm format
	function convertDate(dateString) {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = {
			day: "2-digit",
			month: "numeric",
		};
		return date.toLocaleDateString("th-TH", options);
	}

	let user = null;
	let scoreInfo = null;
	let scoreLog = null;

	onMount(async () => {
		// Fetch user data
		user = await api.call("/user/data", { method: "GET", withToken: true });
		console.log(user);
	});
</script>

<div class="Container">
	<div class="profile">
		<h1>ข้อมูลนักผจญภัย</h1>
		<div class="profile_box">
			<div>
				<div class="houseicon">
          <img src={houseIcon} alt="house" class="icon" />
        </div>
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
					<div class="usericon">
						<UserIcon data={user?.icon} />
					</div>
					<div class="name_id">
						<div class="name">{user?.name}</div>
						<div class="id">{user?.studentId ? user?.studentId : "NULL"}</div>
					</div>
				</div>

				<div>
					<div CLASS="personal_info">
						<div>อีเมล : {user?.email ? user?.email : "NULL"}</div>
						<div>บ้าน : {user?.house ? user?.house : "NULL"}</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="score_history">
		<h2>ประวัติคะแนน</h2>
		<div class="score_table">
			<!-- {#each scoreLog as log, i}
				<div class="score_body">
					<div class="score_number">{scoreLog[i]?.amount}</div>
					<div class="staff_and_time">
						<div class="staff">{scoreLog[i]?.modifiedBy?.name}</div>
						<div class="time">{convertDate(scoreLog[i]?.date)}</div>
					</div>
				</div>
			{/each} -->
		</div>
	</div>
</div>

<style lang="scss">
  h1 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-top: 4.5vh;
    color:var(--text);
  }

  h2 {
    font-size: 1.3rem;
    font-weight: 4000;
    text-align: left;
    margin-top: 3vh;
    margin-left: 2vw;
    color:var(--text);
  }

  .Container {
    display: flex;
    justify-content: center;
    overflow:auto;
    gap: 2vw;
    min-height: 100vh;
    width: 100vw;
    padding-top: 2rem;
    padding-bottom: 5rem;
  }

  .profile {
    width: 45vw;
    height: 80vh;
    overflow:auto;
    background-color: var(--profile-bg);
    border-radius: 20px;
    outline: 2px solid;
    border-color: var(--list-border);
  }

  .profile_box {
    display: flex;
    margin-left:3vw;
    margin-bottom:5vh;
  }

  .score_history {
    width: 45vw;
    height: 80vh;
    background-color: var(--profile-bg);
    border-radius: 20px;
    outline: 2px solid;
    border-color: var(--list-border);
  }

  .profile .icon {
    aspect-ratio:3/4;
    width:100%;
    height:auto;
    border-radius: 15px;
  }

  .houseicon {
    width: 13vw;
    height: auto;
    margin-top:4.5vh;
    background-color: var(--profile-bg);
    border-radius: 20px;
  }
  
  .profile .score_table {
    margin-top:4vh;
    text-align: center;
    height: 10vh;
    width: 12.9vw;
    background-color: var(--profile-bg);
  }

  .profile .score_header {
    font-size: 1rem;
    background: var(--light-yellow, #F1D5A1);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    outline: 1px solid;
  }

  .profile .score_body {
    font-size: 1rem;
    background-color: var(--list-bg);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-top: 2vh;
    padding-bottom: 2vh;
    outline: 1px solid;
  }

  .profile_info {
    width: 25vw;
    height: 51.8vh;
    min-height: 8rem;
    margin-top: 5vh;
    margin-left:1.5vw;
    border-radius: 20px;
    outline: 1px solid;
    border-color: var(--list-border);
    background-color: var(--profile-bg);
  }

  .bio_info {
    display: flex;
  }

  .usericon {
    height:4rem;
    width:4rem;
    margin-top: 4vh;
    margin-left: 2vw;
    border-radius: 15px;
    background-color: var(--profile-bg);
  }
  .bio_info .name_id {
    font-size: 1.1rem;
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
    font-size: 1.1rem;
    margin-top: 3vh;
    margin-left: 2vw;
    color: var(--text);
  }

  @media only screen and (max-width: 1024px) and (min-height: 600px) {
    .Container {
      flex-direction: column;
      align-items: center;
    }

    .profile, .score_history {
      width: 100%;
      max-width: 90vw;
    }

    .profile {
      height:auto;
      padding-bottom:2rem;
      padding-left:5.5vw;
    }

    .houseicon {
      width: 25vw;
    }

    .score_history {
      height:9vh;
    }

    .profile_box {
      width: 100%;
      margin: 0;
      gap: 2rem;
    }

    .profile_info {
      height:34.2vh;
      width: 50vw;
      margin-bottom:4vh;
      padding-bottom:4vh;
    }

    .profile .score_table {
      margin-top:6vh;
      width: 100%;
      max-width: 500px; 
      height:1vh;
      margin-top:3vh;
      margin-left:auto;
      margin-right:auto;
    }
    

    h1 {
      font-size: 2rem; 
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 1.6rem;
    }
  }

  @media only screen and (max-width: 430px) and (min-height: 500px) {
    .Container {
      flex-direction: column;
      align-items: center;
    }

    .profile, .score_history {
      width: 100%;
      max-width: 90vw;
    }

    .bio_info, .personal_info {
      margin-left:25vw;
    }

    .profile {
      height:auto;
    }


    .score_history {
      height:9vh;
    }

    .profile_box {
      flex-direction: column;
      width: 100%;
      margin-left:-10px;
    }

    .profile_info {
      height:100%;
      width: 90%;
      margin:auto;
      margin-bottom:4vh;
      padding-bottom:4vh;
    }

    .houseicon {
      width: 50%;
      max-width: 250px;
      margin: 0 auto;
    }

    .profile .score_table {
      margin-top:6vh;
      width: 100%;
      max-width: 250px; 
      height:1vh;
      margin-top:3vh;
      margin-left:auto;
      margin-right:auto;
    }
    

    h1 {
      font-size: 2rem; 
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 1.6rem;
    }
  }
</style>

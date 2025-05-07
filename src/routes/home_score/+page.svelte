<script lang="ts">

    /*
     -------------------------------------------------------
     Imports
     -------------------------------------------------------
     */

    import Fullscreen from "../../components/Fullscreen.svelte";
    import Button from "../../components/Button.svelte";
    import Frame from "../../components/Frame.svelte";
    import BadgeGold from "../../components/Icons/Badge_Gold.svelte";
    import BadgeSilver from "../../components/Icons/Badge_Silver.svelte";
    import BadgeBronze from "../../components/Icons/Badge_Bronze.svelte";

    const profile = {
      name: 'เพ็ญพิชชา ปานจันทร์',
      studentId: '68010662',
      rank: 23,
      score: 300,
      houseRank: 5,
      houseScore: 1200,
      cardImg: '/house/warlock.png'
    };

    let dataScore = [
    { name: "Veerapat Pirultham", id: "67010852", house: "bard", score: 700 },
    { name: "Nattapong Suksiri", id: "67010853", house: "mage", score: 680 },
    { name: "Kamonchai Lekbun", id: "67010854", house: "rogue", score: 660 },
    { name: "Somsak Pradchaphet", id: "67010855", house: "warrior", score: 640 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    ];
    let dataHouse = [
    { house: "bard", score: 2750 },
    { house: "mage", score: 2600 },
    { house: "rogue", score: 2480 },
    { house: "warrior", score: 2405 },
    { house: "healer", score: 2380 },
    ];
    let dataMyHouse = [
    { name: "Veerapat Pirultham", id: "67010852", score: 720 },
    { name: "Nattapong Suksiri", id: "67010853", score: 700 },
    { name: "Kamonchai Lekbun", id: "67010854", score: 680 },
    { name: "Somsak Pradchaphet", id: "67010855", score: 650 },
    { name: "Patsorn Chaiyawan", id: "67010856", score: 640 },
    ];

    // const container = document.getElementById("myHouseTable");

    // dataMyHouse.forEach((item, index) => {
    //     const row = document.createElement("div");
    //     row.className = "row";

    //     row.innerHTML = `
    //         <div class="rank">${String(index+1).padStart(2,"0")}</div>
    //         <div class="name">${item.name}</div>
    //         <div class="id">${item.id}</div>
    //         <div class="score">${item.score}</div>
    //     `;
    //     container.appendChild(row);
    // });

</script>

<Fullscreen>
    <div id="Score">
        <!-- SC-Left Side -->
        <Frame id="sc-left" blur-bg>
            <div style="display: flex; justify-content: center;">
                <img src={profile.cardImg} alt="" id="scl-image">
            </div>
            <div id="scl-main">
                <div class="scl-top">
                    <span>{profile.name}</span>
                    <span style="color: var(--sc-text)">{profile.studentId} </span>
                </div>
                <Frame id="scl-detail-top">นักผจญภัยอันดับที่ {profile.rank}</Frame>
                <div id="scl-detail-bottom">{profile.score}</div>
                <Frame id="scl-detail-top">บ้านอันดับที่ {profile.houseRank}</Frame>
                <div id="scl-detail-bottom">{profile.houseScore}</div>
                <Button class="scl-btn">ประวัติคะแนน</Button>
            </div>
        </Frame>
        <!-- SC-Right Side -->
        <Frame id="sc-right" full="" blur-bg>
            <div class="scr-top">
                <Button class="scr-btn-Overall">Overall</Button>
                <Button class="scr-btn-House">House</Button>
                <Button class="scr-btn-MyHouse">MyHouse</Button>      
            </div>
            <div class="scr-bottom">
                <div id="myHouseTable"></div>
            </div>
        </Frame>
    </div>

</Fullscreen>

<style lang="scss">

    // -------------------------------------------------------
    // Left Side SC GUI
    // -------------------------------------------------------
    
    #Score {
        width: 100%;
		height: 100%;
        display: flex;
		flex-direction: row;
        gap: 1%;
		padding: 2% 5% 2% 5%;
		box-sizing: border-box;
		container-type: size;

        :global(#sc-left) {
            border-radius: 3%;
            box-shadow: 0 4px 24px var(--list-shadow);
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 38%;
        }

        #scl-image { width: 50%;}

        #scl-main { 
            display: flex; 
            flex-direction: column;
            background-color: var(--bg); 
            border: 1px solid var(--outline);
            border-radius: 10px;
            padding: 3% 4%;
            width: 87%;
            height: 100%;

            .scl-top { display: flex; justify-content: space-between; }

            :global(#scl-detail-top) {
                background-color: var(--sc-bg);
                border: 1px solid var(--outline);
                border-radius: 10px 10px 0 0;
                margin: 5% 0 0 0;
                padding: 2% 4%;
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 30%;
            }

            #scl-detail-bottom {
                background-color: var(--bg);
                border: 1px solid var(--outline);
                border-top-width: 0;
                border-radius: 0px 0px 10px 10px;
                padding: 2% 4%;
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 30%;
            }

            :global(Button.scl-btn) {
                background-color: var(--sc-bg);
                border: 1px solid var(--outline);
                padding: 3%;
                margin: 6% 0 0 0;
                box-shadow: 0 3px 5px var(--list-shadow);
            }
        }  

    // -------------------------------------------------------
    // Right Side SC GUI
    // -------------------------------------------------------
        
        :global(#sc-right) { 
            border-radius: 15px;
            box-shadow: 0 4px 24px var(--list-shadow); 
            padding: 1% 2%; 
            width: 60%;
        }

        .scr-top { 
            display: flex; 
            border-radius: 20px;
            border: 1px solid var(--outline);

            :global(Button.scr-btn-Overall) { 
                border-radius: 20px 0 0 20px; 
                background-color: var(--bg);
                &:hover {
			        background: var(--sc-button);
                    color: var(--bg)
		        }
            }
            :global(Button.scr-btn-House) { 
                border-radius: 0%; 
                background-color: var(--bg);
                &:hover {
			        background: var(--sc-button);
                    color: var(--bg)
		        }
            }
            :global(Button.scr-btn-MyHouse) { 
                border-radius: 0 20px 20px 0; 
                background-color: var(--bg);
                &:hover { 
                    background: var(--sc-button);
                    color: var(--bg)
		        }
            }

            // .scr-bottom{
            //     #myHouseTable{
            //         display: flex;
            //         flex-direction: column;
            //         gap: 8px;
            //     }

            //     .row {
            //         display: flex;
            //         justify-content: space-between;
            //         background-color: var(--bg);
            //         padding: 10px;
            //         border-radius: 10px;
            //         box-shadow: 0 2px 4px var(--list-shadow);
            //     }
            //     .rank, .name, .id, .score {
            //         width: 25%;
            //         text-align: center;
            //     }
            // }
        }

        
    
    }


</style>
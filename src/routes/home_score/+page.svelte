<script lang="ts">
    import Fullscreen from "$lib/components/Fullscreen.svelte";
    import Button from "$lib/components/Button.svelte";
    import Frame from "$lib/components/Frame.svelte";
    import Tab from "$lib/components/Tab.svelte";
    import ScoreTab from "./components/ScoreTab.svelte";

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
    <div id="Score">
        <!-- SC-Left Side -->
        <Frame id="sc-left" blur-bg>
            <div class="scl-image">
                <img src={profile.cardImg} alt="">
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
                <Button class="scl-btn" filter={false}>ประวัติคะแนน</Button>
            </div>
        </Frame>

        <!-- SC-Right Side -->
        <Frame id="sc-right" full="" blur-bg>
            <ScoreTab></ScoreTab>
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

        .scl-image { 
            display: flex; 
            justify-content: center;
            width: 50%;
        }

        #scl-main { 
            display: flex; 
            flex-direction: column;
            background-color: var(--bg); 
            border: 1px solid var(--outline);
            border-radius: 10px;
            padding: 3% 4%;
            width: 87%;
            height: 100%;

            .scl-top { 
                display: flex; 
                justify-content: space-between; 
                font-weight: 600;
                font-size: 17.5px;
            }

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
                font-weight: 600;
                font-size: 16.8px;
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
                font-size: 16.4px;
            }

            :global(Button.scl-btn) {
                background-color: var(--sc-bg);
                border: 1px solid var(--outline);
                padding: 3%;
                margin: 6% 0 0 0;
                box-shadow: 0 3px 5px var(--list-shadow);
                font-weight: 600;
                color: var(--text)
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
    
    }

    @media (max-width: 800px) {
        #Score {
            flex-direction: column;

            :global(#sc-left) {
                width: 100%;
                height: 40%;
                flex-direction: row;

                :global(#scl-image) {
                    width: 25%;
                }
                :global(#scl-main) {
                    width: 100%;
                }

            }

            :global(#sc-right) {
                width: auto;
                height: 60%
            }
        }


        
    }
</style>
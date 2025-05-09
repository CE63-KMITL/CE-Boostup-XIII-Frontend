<script lang="ts">
    import Fullscreen from "$lib/components/Fullscreen.svelte";
    import Frame from "$lib/components/Frame.svelte";
    import ProfileTab from "./components/ProfileTab.svelte";
    import ScoreTab from "./components/ScoreTab.svelte";
    import Test from "./components/TEST.svelte";

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
        <div id="sc-left">
            <Test></Test>
        </div>
       
        <!-- <Frame id="sc-left" blur-bg border={false}>
            
            <ProfileTab></ProfileTab>
        </Frame> -->

        <!-- SC-Right Side -->
        <Frame id="sc-right" full="" blur-bg border={false}>
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

    // -------------------------------------------------------
    // Left Side SC GUI
    // -------------------------------------------------------

        :global(#sc-left) {
            // border-radius: 20px;
            // box-shadow: 0 4px 24px var(--list-shadow);
            // display: flex;
            // flex-direction: column;
            // align-items: center;
            // padding: 15px 25px;
            width: 35%;
            // height: 100%;
        }

    // -------------------------------------------------------
    // Right Side SC GUI
    // -------------------------------------------------------
        
        :global(#sc-right) { 
            border-radius: 20px;
            box-shadow: 0 4px 24px var(--list-shadow); 
            padding: 1% 2%; 
            width: 60%;
            height: 100%;
        }
    
    }

    @media (max-width: 920px) {
        #Score {
            flex-direction: column;

            :global(#sc-left) {
                width: 100%;
                height: 35%;
                display: flex;
                flex-direction: row;
            }

            :global(#sc-right) {
                width: auto;
                height: 60%;
            }
        }
    }


</style>
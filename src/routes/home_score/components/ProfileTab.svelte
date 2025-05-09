<script lang="ts">
    import { azScale } from "$lib/transition";
    import Frame from "$lib/components/Frame.svelte";
    import Button from "$lib/components/Button.svelte";

    let headerTabs: { [key: string]: string } = 
        { scoreDetail: "คะแนนของฉัน", claimPrice: "ของรางวัล" };
    let activeTab = "scoreDetail";

    const profile = {
      name: 'เพ็ญพิชชา ปานจันทร์',
      studentId: '68010662',
      rank: 23,
      score: 300,
      houseRank: 5,
      houseScore: 1200,
      cardImg: '/house/warlock.png'
    };

    function selectTab(tabName: string) {
		activeTab = tabName;
	}
    
</script>

<Frame blur-bg {...$$restProps} class={"profiletab-container " + $$restProps.class}>
	<div class="profiletab-headers">
		{#each Object.keys(headerTabs) as headerId}
			<button class="profiletab-header" class:active={activeTab === headerId} on:click={() => selectTab(headerId)} style={$$restProps.style}}>
				{headerTabs[headerId]}
			</button>
		{/each}
	</div>
    <div class="profiletab-content">
        {#if activeTab === "scoreDetail"}
            <div id="scoreTab" in:azScale={{ delay: 250 }} out:azScale>
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
            </div>
        {:else if activeTab == "claimPrice"}
            <div in:azScale={{ delay: 250 }} out:azScale>
                wefwpoekfpwoekfpwoke
            </div>
        {/if}
    </div>
</Frame>

<style lang="scss">
    :global(div.profiletab-container) {
		display: flex;
		flex-direction: column;
		width: 100%;
        height: 100%;
		border: 1px solid var(--outline);
		border-radius: 20px;
        margin: 20px;
		overflow: hidden;
		padding: 0;
		overflow: clip;
	}

	.profiletab-headers {
		display: flex;
		width: 100%;
		flex-shrink: 0;
		flex-wrap: wrap;
	}

	.profiletab-header {
		flex-grow: 1;
		padding: 10px;
		border: none;
		background-color: var(--list-bg);
		color: var(--text);
		cursor: pointer;
		font-size: 1em;
		font-weight: 600;
		transition: background-color 0.2s ease;
		border-bottom: 2px solid transparent;
		outline: 1px solid var(--outline);
		z-index: 1;
	}

	.profiletab-header:hover {
		background-color: var(--hover-list-bg);
	}

	.profiletab-header.active {
        background-color: var(--selected-list-bg);
		border-bottom-color: var(--selected-list-outline);
        // color: var(--bg);
	}

    :global(div.profiletab-content) {
		// height: 100%;
		// overflow-y: auto;

        :global(#scoreTab) {
            padding: 1% 20px;
            display: flex;
            flex-direction: column;
            align-items: center;

            div.scl-image { 
                height: auto;
                width: 70%;
            }
        
            :global(#scl-main) { 
                display: flex; 
                flex-direction: column;
                background-color: var(--bg); 
                border: 0.5px solid var(--outline);
                border-radius: 10px;
                margin: 0;
                padding: 2px;
                width: 100%;
                height: 80%;
            
                .scl-top { 
                    display: flex; 
                    justify-content: space-between; 
                    padding: 5% 5% 0 5%;
                }
            
                :global(#scl-detail-top) {
                    background-color: var(--sc-bg);
                    border: 1px solid var(--outline);
                    border-radius: 10px 10px 0 0;
                    margin: 3% 20px 0px 20px;
                    padding: 1.5%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 80%;
                }
            
                #scl-detail-bottom {
                    background-color: var(--bg);
                    border: 1px solid var(--outline);
                    border-top-width: 0;
                    border-radius: 0px 0px 10px 10px;
                    margin: 0px 20px;
                    padding: 1.5%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 15px;
                    width: auto;
                }
            
                :global(Button.scl-btn) {
                    background-color: var(--sc-bg);
                    border: 1px solid var(--outline);
                    font-size: 14px;
                    padding: 2%;
                    box-shadow: 0 3px 5px var(--list-shadow);
                    width: auto;
                    margin: 5% 20px;
                    color: var(--text);
                }
            }
        }
            
    }

    @media (max-width: 920px) {
        :global(#scl-image) {
            width: 50%;
        }
        :global(#scl-main) {
            width: 75%;
            height: auto;
        }
            
    }

</style>
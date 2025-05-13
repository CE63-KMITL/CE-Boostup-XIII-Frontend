<script lang="ts">

    let dataScoreHistory = [
        {changeId: "111111", userId: "feefefef-efepfefef", amount: 100, date: "02/12", modifiedBy: "ฉันเองง", message: "จ๊ะเอ๋ตัวเองง 1"},
        {changeId: "222222", userId: "qeqeqeqe-qeqeqeqeq", amount: -100, date: "30/01", modifiedBy: "ฉันเองง", message: "จ๊ะเอ๋ตัวเองง 2"},
        {changeId: "333333", userId: "zczczczc-zczczczcz", amount: 100, date: "24/07", modifiedBy: "ฉันเองง", message: "จ๊ะเอ๋ตัวเองง 3"},
        {changeId: "444444", userId: "vrvrvrvr-vrvrvrvrv", amount: 100, date: "15/04", modifiedBy: "ฉันเองง", message: "จ๊ะเอ๋ตัวเองง 4"},
        {changeId: "555555", userId: "tqtqtqtq-tqtqtqtqt", amount: -100, date: "20/10", modifiedBy: "ฉันเองง", message: "จ๊ะเอ๋ตัวเองง 5"},
        {changeId: "555555", userId: "tqtqtqtq-tqtqtqtqt", amount: -100, date: "20/10", modifiedBy: "ฉันเองง", message: "จ๊ะเอ๋ตัวเองง 5"},
        {changeId: "555555", userId: "tqtqtqtq-tqtqtqtqt", amount: -100, date: "20/10", modifiedBy: "ฉันเองง", message: "จ๊ะเอ๋ตัวเองง 5"},
        {changeId: "555555", userId: "tqtqtqtq-tqtqtqtqt", amount: -100, date: "20/10", modifiedBy: "ฉันเองง", message: "จ๊ะเอ๋ตัวเองง 5"},
        {changeId: "555555", userId: "tqtqtqtq-tqtqtqtqt", amount: -100, date: "20/10", modifiedBy: "ฉันเองง", message: "จ๊ะเอ๋ตัวเองง 5"},
        {changeId: "555555", userId: "tqtqtqtq-tqtqtqtqt", amount: -100, date: "20/10", modifiedBy: "ฉันเองง", message: "จ๊ะเอ๋ตัวเองง 5"},
        {changeId: "555555", userId: "tqtqtqtq-tqtqtqtqt", amount: -100, date: "20/10", modifiedBy: "ฉันเองง", message: "จ๊ะเอ๋ตัวเองง 5"},

    ]


</script>

<div class="scroll">
    {#each dataScoreHistory as data}
        <div class="sc-history-score-main">
            {#if data.amount < 0}
                <div style="color: var(--sc-minus);">{data.amount}</div>
            {:else if data.amount > 0}
                <div style="color: var(--sc-plus);">+{data.amount}</div>
            {/if}
            <div>{data.message}</div>
            <div id="sc-right-history">
                <span>{data.modifiedBy}</span>
                <span style="color: var(--sc-orangedark);" >{data.date}</span>
            </div>
        </div>
    {/each}
</div>


<style lang="scss">
    .sc-history-score-main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border: 1px solid var(--outline);
        margin-top: 10px;
        padding: 10px;
		border-radius: 10px;
        width: 100%;
        height: auto;


        #sc-right-history {
            display: flex;
            flex-direction: column;
            align-items: end;
        }
    }
    
    .scroll {
        padding: 1%;
		height: 88%;
		overflow-y: auto;
    }
</style>
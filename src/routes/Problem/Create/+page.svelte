<script lang="ts">
    import '../../../app.css'

    //Test data
    let user = { 
        name: "John Doe"
    }
    let count = 1
    let options = [
        { id: "4", value: "K" },
        { id: "3", value: "H" },
        { id: "2", value: "O" },
        { id: "1", value: "M" },
    ];
    let first_option = ''

    //repeat add TestCase
    function* repeat(start = 0, end = count) {
        for (let i = start; i < end; i++) yield i;
    }
</script>

<div class="ProblemCreateContianer">
    <div class="Navbar"></div>
    <div class="ProblemInfo">
        <div class="ProblemHead">
            <h1 class="HeadText">Exercise Name</h1>
            <textarea class="ProblemNameInput" placeholder="Exercise Name"></textarea>
        </div>
        <div class="UserAndExDetails">
            <div class="Username">
                <h1 class="Avatar" style="color: green; font-weight:600">//Add avatar icon</h1>
                <p class="HeadText">{user.name}</p>
            </div>
            <div class="TagsBox">
                <h1 class="HeadText">Tags</h1>
                <select class="Tags" bind:value={first_option}>
                    {#each options as option}
                        <option value={option.id}>{option.value}</option>
                    {/each}
                </select>
            </div>
            <textarea class="ProblemDetailsInput" placeholder="Type exercise's detail here"></textarea>
        </div>
        <button class="DoneButton">Done</button>
    </div>
    <div class="CodeInputandOutput">
        <div class="CodeInputBox">
            <div class="CodeInputHead">
                <h1 class="HeadText">Code</h1>
                <button class="Run">Run</button>
            </div>
            <textarea class="CodeInput" placeholder="Code here"></textarea>
        </div>
        <div class="TerminalBox">
            <h1 class="HeadText">Terminal</h1>
            <textarea class="Output" placeholder="Output here"></textarea>
        </div>
    </div>
    <div class="TestCase">
        <div class="TestcaseBox">
            <button class="RunAll">Run All</button>
            {#each repeat() as i}
                <div>TestCase</div>
            {/each}
            <button class="AddTestCase" on:click={() => count++}>Add</button>
        </div>
    </div>
</div>

<style lang="scss">
    .ProblemCreateContianer{
        width: 100%;
        min-height: 100%;
        height: auto;
        background-color: var(--bg);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .Navbar{
        position: fixed;
        top: 0px;
        height: 5rem;
        width: 100%;
        background-color: gray;
    }
    .ProblemInfo{
        margin-top: 7rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }
    .ProblemHead{
        display: flex;
        flex-direction: column;
        width: 90%;
        gap: 12px;
    }
    .Username{
        display: flex;
        align-items: self-end;
        gap:16px;
    }
    .TagsBox{
        display: flex;
        align-items: self-end;
        gap:16px;
    }
    .HeadText{
        color: var(--text);
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-weight: 600;
    }
    .Tags{
        border: 1px solid var(--outline);
		border-radius: 10px;
		padding: 5px;
    }
    .ProblemNameInput{
        border: 1px solid var(--outline);
        border-radius: 5px;
        padding: 5px;
        width: 50%;
        height: 2.5rem;
        font-size: 1rem;
        line-height: 1.5rem;
        resize: none;
    }
    .UserAndExDetails{
        display: flex;
        flex-direction: column;
        width: 90%;
        gap: 12px;
    }
    .UsernameText{
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 300;
    }
    .ProblemDetailsInput{
        border: 1px solid var(--outline);
        border-radius: 5px;
        padding: 5px;
        width: 100%;
        height: 40rem;
        font-size: 1rem;
        line-height: 1.5rem;
        resize: none;
    }
    .DoneButton{
        position: fixed;
        bottom: 20px;
        right: 20px;
        border: 1px solid var(--outline);
		background: var(--button-bg);
		border-radius: 10px;
		padding: 5px;
    }
    .CodeInputandOutput{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2.5%;
        margin-top: 7rem;
    }
    .CodeInputBox{
        width: 55%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
    }
    .CodeInputHead{
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    .Run{
        border: 1px solid var(--outline);
		background: var(--button-bg);
		border-radius: 10px;
		padding: 5px;
    }
    .CodeInput{
        height: 40rem;
        width: 100%;
        border: 1px solid var(--outline);
        border-radius: 5px;
        padding: 5px;
        font-size: 1rem;
        line-height: 1.5rem;
        resize: none;
        white-space: nowrap;
        overflow: auto;
    }
    .CodeInput::-webkit-scrollbar{
        width: 1vh;
        height: 1vh;
    }
    .CodeInput::-webkit-scrollbar-thumb {
        background: var(--darker);
        border-radius: 10px;
    }
    .CodeInput::-webkit-scrollbar-thumb:hover {
        background: var(--darker-50);
    }
    .CodeInput:focus{
        box-shadow: none;
    }
    .TerminalBox{
        width: 32.5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }
    .HeadText{
        align-self: self-start;
    }
    .Output{
        height: 40rem;
        width: 100%;
        border: 1px solid var(--outline);
        border-radius: 5px;
        padding: 5px;
        font-size: 1rem;
        line-height: 1.5rem;
        resize: none;
        white-space: nowrap;
        overflow: auto;
    }
    .TestCase{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-top: 7rem;
    }
    .TestCaseBox{
        width: 90%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .RunAll{
        border: 1px solid var(--outline);
		background: var(--button-bg);
		border-radius: 10px;
		padding: 5px;
    }
    @media (max-width: 1000px){
        .CodeInputandOutput{
            flex-direction: column;
            gap:12px;
        }
        .CodeInputBox{
            width: 90%;
        }
        .TerminalBox{
            width: 90%;
        }
    }
</style>
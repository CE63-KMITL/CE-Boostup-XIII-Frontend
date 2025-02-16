<script lang="ts">
    import '../../../app.css'

    //Test data
    let user = { 
        name: "John Doe"
    }
    let options = [
        { id: "4", value: "K" },
        { id: "3", value: "H" },
        { id: "2", value: "O" },
        { id: "1", value: "M" },
    ];
    let first_option = ''
    let test_cases = [{ input: '', output: '', hidden: false }];

    //Add TestCase and Delete
    function addTestCase() {
        test_cases = [...test_cases, { input: '', output: '', hidden: false }];
    }
    function deleteTestCase(index: number) {
        test_cases = test_cases.filter((_, i) => i !== index);
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
                <h1 class="HeadText">{user.name}</h1>
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
        <button class="RunAll">Run All</button>
        <div class="TestCaseBox">
            {#each test_cases as test_case , i}
                <div class="TestCaseContainer">
                    <div class="TestCaseCover">
                        <h1 class="HeadText">Test Case {i+1}</h1>
                        <div class="HiddenTestcaseBox">
                            <input class="CheckBox" type="checkbox" bind:checked={test_case.hidden}>
                            <p>Hidden Test Case</p>
                        </div>
                        <textarea class="TestCaseInput" placeholder="Input here"  bind:value={test_case.input}></textarea>
                        <textarea  class="TestCaseOutput" placeholder="Output here" bind:value={test_case.output}></textarea>
                    </div>
                    <button class="Delete" on:click={() => deleteTestCase(i)}>Delete</button>
                </div>
            {/each}
            <button class="AddTestCase" on:click={() => addTestCase()}>+</button>
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
        align-self: self-start;
    }
    .Tags{
        border: 1px solid var(--outline);
		border-radius: 5px;
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
        margin-top: 9rem;
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
        max-width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-top: 9rem;
    }
    .TestCaseBox{
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 2rem;
        overflow-x: auto;        
        white-space: nowrap;         
        scroll-behavior: smooth;
        max-width: 100%;
        padding-bottom: 15px;
    }
    .TestCaseBox::-webkit-scrollbar{
        width: 1vh;
        height: 1vh;
    }
    .TestCaseBox::-webkit-scrollbar-thumb {
        background: var(--darker);
        border-radius: 10px;
    }
    .TestCaseBox::-webkit-scrollbar-thumb:hover {
        background: var(--darker-50);
    }
    .TestCaseBox:focus{
        box-shadow: none;
    }
    .RunAll{
        border: 1px solid var(--outline);
		background: var(--button-bg);
		border-radius: 10px;
		padding: 5px;
    }
    .TestCaseContainer{
        min-width: 25rem;
        max-width: 25rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }
    .TestCaseCover{
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 12px;
    }
    .HiddenTestcaseBox{
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--text);
        font-size: 1rem;
        line-height: 1.5rem;
    }
    .CheckBox{
        width: 1.25rem;
        height: 1.5rem;
        appearance: none;
        border: 1px solid var(--outline);
        border-radius: 5px; 
        cursor: pointer;
    }
    .CheckBox:checked::after{
        content: '✓';
        color: var(--text);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        font-size: 1rem;
    }
    .TestCaseInput{
        height: 25rem;
        width: 100%;
        border: 1px solid var(--outline);
        border-radius: 5px;
        padding: 5px;
        font-size: 1rem;
        line-height: 1.5rem;
        resize: none;
    }
    .TestCaseOutput{
        height: 15rem;
        width: 100%;
        border: 1px solid var(--outline);
        border-radius: 5px;
        padding: 5px;
        font-size: 1rem;
        line-height: 1.5rem;
        resize: none;
    }
    .AddTestCase{
        display: flex;      
        align-items: center;   
        justify-content: center; 
        position: relative;
        top: 14px;
        min-width: 7.5rem;
        max-width: 7.5rem;
        height: 40.7rem;
        border: 1px solid var(--outline);
        border-radius: 5px;
        padding: 5px;
        font-size: 2.25rem;
        line-height: 2.75rem;
        font-weight: 600;
    }
    .Delete{
        border: 1px solid var(--outline);
		background: var(--button-bg);
		border-radius: 10px;
		padding: 5px;
        color: var(--text);
        font-size: 1rem;
        line-height: 1.5rem;
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
        .TestCaseContainer{
            min-width: 17.5rem;
            max-width: 17.5rem;
        }
        .AddTestCase{
            min-width: 3.5rem;
            max-width: 3.5rem;
        }
    }
</style>
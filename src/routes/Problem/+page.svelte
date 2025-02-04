<script>
    import { onMount , onDestroy } from "svelte";

    let isMobileHorizon = false
    let isVertical = false

    function checkVertical(){
        let mobile = false, horizon = false, vertical = false
        window.innerHeight < 1000 && window.innerWidth < 1000? mobile= true:false
        window.innerWidth > window.innerHeight ? horizon= true:false
        window.innerWidth < 1100 && window.innerHeight > window.innerWidth ? vertical= true:false

        isMobileHorizon = mobile && horizon
        isVertical = vertical
    }

    onMount(() => {
        if (typeof window === "undefined") return;
        checkVertical();
        window.addEventListener('resize' , checkVertical);
        window.addEventListener('orientationchange' , checkVertical);
    })

    onDestroy(() => {
        if (typeof window === "undefined") return;
        window.removeEventListener('resize' , checkVertical);
        window.removeEventListener('orientationchange' , checkVertical);
    })

    $: Dynamic1 = isVertical ? "VerticalProblemContainer" : isMobileHorizon ? "HorizonProblemContainer" : "ProblemContainer"
    $: Dynamic2 = isVertical ? "VerticalCodeInputBox" : isMobileHorizon ? "HorizonCodeInputBox" : "CodeInputBox"
    $: Dynamic3 = isVertical ? "VerticalInfoAndTestcaseBox" : isMobileHorizon ? "HorizonInfoAndTestcaseBox" : "InfoAndTestcaseBox"
</script>

<div class={Dynamic1}>
    <div class={Dynamic2}>
        <div class="WrapButton">
            <button class="Run">Run</button>
            <button class="Submit">Submit</button>
        </div>
        <textarea class="CodeInput" placeholder="Enter your code..."></textarea>
    </div>
    <div class={Dynamic3}>
        <div class="HeadAndDescriptionBox">
            <h1 class="ProblemHead">Head</h1>
            <p class="ProblemDescription">Descriptionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
        </div>
        <div class="TestcaseBox">
            <div class="TestcaseWrap">
                <p class="TestcaseNo">Test case1</p>
                <p class="InputAndOutput">Input: </p>
                <p class="InputAndOutput">Output: </p>
            </div>
            <div class="TestcaseWrap">
                <p class="TestcaseNo">Test case1</p>
                <p class="InputAndOutput">Input: 11111111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaa</p>
                <p class="InputAndOutput">Output: </p>
            </div>
            <div class="TestcaseWrap">
                <p class="TestcaseNo">Test case1</p>
                <p class="InputAndOutput">Input: </p>
                <p class="InputAndOutput">Output: </p>
            </div>
            <div class="TestcaseWrap">
                <p class="TestcaseNo">Test case1</p>
                <p class="InputAndOutput">Input: </p>
                <p class="InputAndOutput">Output: </p>
            </div>
            <div class="TestcaseWrap">
                <p class="TestcaseNo">Test case1</p>
                <p class="InputAndOutput">Input: </p>
                <p class="InputAndOutput">Output: </p>
            </div>
        </div>
    </div>
</div>

<style>
    .ProblemContainer{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        background-color: wheat;
    }
    .CodeInputBox{
        height: 80%;
        width: 70%;
    }
    .WrapButton{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 7.5%;
        background-color: burlywood;
        border: 2px solid saddlebrown;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        gap: 20px;
    }
    .Run{
        width: 12.5vh;
        background-color: peachpuff;
        border: 1px solid saddlebrown;
        border-radius: 10px;
        padding: auto;
        font-size: 2vh;
        font-weight: 600;
    }
    .Submit{
        width: 12.5vh;
        background-color: peachpuff;
        border: 1px solid saddlebrown;
        border-radius: 10px;
        padding: auto;
        font-size: 2vh;
        font-weight: 600;
    }
    .CodeInput{
        width: 100%;
        height: 92.5%;
        background-color: antiquewhite;
        border: 2px solid saddlebrown;
        border-top: none;
        border-radius: 20px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        resize: none;
        padding: 15px;
        padding-left: 20px;
        padding-right: 20px;
        font-size: 2vh;
    }
    .CodeInput::-webkit-scrollbar{
        width: 1vh;
    }
    .CodeInput::-webkit-scrollbar-thumb {
        background: saddlebrown;
        border-radius: 10px;
    }
    .CodeInput::-webkit-scrollbar-thumb:hover {
        background: #8b5a2b;
    }
    .CodeInput:focus{
        border: 2px solid saddlebrown;
        border-top: none;
        outline: none;
        box-shadow: none;
    }
    .InfoAndTestcaseBox{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding-top: 20px;
        width: 25%;
        height: 80%;
        background-color: burlywood;
        border: 2px solid saddlebrown;
        border-radius: 20px;
    }
    .HeadAndDescriptionBox{
        width: 90%;
        height: 30%;
        background-color: antiquewhite;
        border: 2px solid saddlebrown;
        border-radius: 10px;
    }
    .ProblemHead{
        max-height: 30%;
        text-align: center;
        font-size: 4vh;
        font-weight: 500;
        border-bottom: 2px solid saddlebrown;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: peachpuff;
        padding-left: 15px;
        padding-right: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .ProblemDescription{
        max-height: 65%;
        margin: 5px 0px 10px 10px ;
        padding-right: 5px;
        font-size: 2vh;
        white-space: normal;
        word-break: break-word;
        overflow: auto;
    }
    .ProblemDescription::-webkit-scrollbar{
        width: 1vh;
    }
    .ProblemDescription::-webkit-scrollbar-thumb {
        background: saddlebrown;
        border-radius: 10px;
    }
    .ProblemDescription::-webkit-scrollbar-thumb:hover {
        background: #8b5a2b;
    }
    .TestcaseBox{
        display: flex;
        flex-direction: column;
        width: 90%;
        height: 60%;
        background-color: antiquewhite;
        border: 2px solid saddlebrown;
        border-radius: 10px;
        padding: 15px;
        padding-right: 10px;
        gap: 30px;
        font-size: 2vh;
        white-space: normal;
        word-break: break-word;
        overflow: auto;
    }
    .TestcaseBox::-webkit-scrollbar{
        width: 1vh;
    }
    .TestcaseBox::-webkit-scrollbar-thumb {
        background: saddlebrown;
        border-radius: 10px;
    }
    .TestcaseBox::-webkit-scrollbar-thumb:hover {
        background: #8b5a2b;
    }
    .TestcaseNo{
        font-size: 2.25vh;
        font-weight: 600;
    }
    .VerticalProblemContainer{
        display: flex;
        flex-direction: column-reverse;
        gap: 25px;
        align-items: center;
        width: 100%;
        height: 150vh;
        background-color: wheat;
    }
    .VerticalCodeInputBox{
        height: 50%;
        width: 90%;
        margin-bottom: 25px;
    }
    .VerticalInfoAndTestcaseBox{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-top: 25px;
        padding-top: 20px;
        padding-bottom: 20px;
        width: 90%;
        height: 50%;
        background-color: burlywood;
        border: 2px solid saddlebrown;
        border-radius: 20px;
    }
</style>
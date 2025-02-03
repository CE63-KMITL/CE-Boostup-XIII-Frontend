<script>

</script>

<div class="ProblemContainer">
    <textarea class="CodeInput"></textarea>
    <div class="InfoAndTestcaseBox">
        <div class="HeadAndDescriptionBox">
            <h1 class="ProblemHead">Head</h1>
            <p class="ProblemDescription">Description</p>
        </div>
        <div class="TestcaseBox">

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
    .CodeInput{
        width: 70%;
        height: 80%;
        background-color: antiquewhite;
        border: 2px solid saddlebrown;
        border-radius: 20px;
        resize: none;
        padding: 15px;
        padding-left: 20px;
        padding-right: 20px;
        font-size: 2vh;
    }
    .CodeInput:focus{
        border: 2px solid saddlebrown;
        outline: 1px auto saddlebrown;
        box-shadow: none;
    }
    .InfoAndTestcaseBox{
        display: flex;
        justify-content: center;
        padding-top: 20px;
        width: 25%;
        height: 80%;
        background-color: burlywood;
        border: 2px solid saddlebrown;
        border-radius: 20px;
    }
    .HeadAndDescriptionBox{
        width: 90%;
        height: 45%;
        background-color: antiquewhite;
        border: 2px solid saddlebrown;
        border-radius: 10px;
    }
    .ProblemHead{
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
        max-height: 80%;
        margin: 5px 5px 10px 10px ;
        font-size: 2vh;
        white-space: normal;
        word-break: break-word;
        overflow: hidden;
    }
</style>
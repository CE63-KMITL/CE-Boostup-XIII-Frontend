<script lang="ts">
    import '../../../app.css'

    let user = {
        name: "John Doe"
    }
</script>

<div class="ProblemCreateContianer">
    <div class="ProblemInfo">
        <div class="ProblemHead">
            <h1 class="HeadText">Exercise Name</h1>
            <textarea class="ProblemNameInput" placeholder="Exercise Name"></textarea>
        </div>
        <div class="UserAndExDetails">
            <h1 class="HeadText">User Name</h1>
            <p class="UsernameText">{user.name}</p>
            <textarea class="ProblemDetailsInput" placeholder="Type exercise's detail here"></textarea>
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
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .ProblemInfo{
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
    .HeadText{
        color: var(--text);
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-weight: 600;
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
        height: 30rem;
        font-size: 1rem;
        line-height: 1.5rem;
        resize: none;
    }
</style>
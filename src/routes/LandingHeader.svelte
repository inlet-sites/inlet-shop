<div class="LandingHeader">
    <a href="/about">About</a>

    <a href="/help">Help</a>

    <a class="right" href="http://vendor.inlet.shop">Become a vendor</a>
</div>

<style>
    .LandingHeader{
        display: flex;
        align-items: center;
        height: 50px;
        width: 100%;
        border-bottom: 1px solid rgba(255, 0, 0, 0.35);
        background: rgb(0, 0, 21);
        padding: 0 35px;
    }

    .LandingHeader > *{
        margin: 0 15px;
        color: var(--text);
        font-size: 20px;
    }

    .right{
        margin-left: auto;
    }

    @media screen and (max-width: 550px){
        .LandingHeader{
            padding: 0 15px;
        }

        .LandingHeader > *{
            font-size: 16px;
        }
    }
</style>

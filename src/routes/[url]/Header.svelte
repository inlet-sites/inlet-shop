<script>
    import {createEventDispatcher} from "svelte";
    import logo from "$lib/logo.png";

    const dispatch = createEventDispatcher();
    let {name} = $props();

    const changePage = (page)=>{
        dispatch("changePage", {page: page});
    }
</script>

<header>
    <a href="/" class="logoContainer">
        <img src={logo} alt="inlet.shop logo">
        <h3 class="inletShop">Inlet.Shop</h3>
    </a>
    <h3><span class="arrow"> > </span> {name}</h3>

    <div class="pages">
        <button onclick={()=>{changePage("about")}}>About</button>
        <button onclick={()=>{changePage("shop")}}>Shop</button>
    </div>
</header>

<div class="mobilePages">
    <button onclick={()=>{changePage("about")}}>About</button>
    <button onclick={()=>{changePage("shop")}}>Shop</button>
</div>

<style>
    header{
        display: flex;
        align-items: center;
        height: 50px;
        width: 100%;
        background: black;
        border-bottom: 1px solid rgba(255, 0, 0, 0.35);
        padding: 0 35px;
        color: var(--text);
    }

    header img{
        height: 90%;
    }

    header h3{
        font-size: 24px;
        margin-left: 15px;
    }

    .logoContainer{
        display: flex;
        align-items: center;
        height: 100%;
        text-decoration: none;
    }

    .pages{
        margin-left: auto;
    }

    .pages button, .mobilePages button{
        background: none;
        border: none;
        color: var(--text);
        font-size: 22px;
        text-decoration: underline;
        margin: 0 35px;
        cursor: pointer;
    }

    .pages button:hover{
        color: rgb(175, 175, 175);
    }

    .inletShop{
        color: rgba(255, 0, 0, 0.55);
    }

    .mobilePages{
        display: none;
    }

    @media screen and (max-width: 900px){
        header{
            flex-direction: column;
            height: 75px;
        }

        .logoContainer{
            height: 50%;
        }

        .arrow{
            display: none;
        }

        .pages{
            display: none;
        }

        .mobilePages{
            display: flex;
            justify-content: center;
            margin-top: 15px;
        }
    }
</style>

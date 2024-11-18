<script>
    import {createEventDispatcher} from "svelte";
    import logo from "$lib/logo.png";

    const dispatch = createEventDispatcher();

    let {name, url} = $props();
</script>

<header>
    <a href="/" class="logoContainer">
        <img src={logo} alt="inlet.shop logo">
        <h3 class="inletShop">Inlet.Shop</h3>
    </a>

    <p>></p>

    <a class="vendor" href="/{url}">{name}</a>
</header>

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
        font-size: 24px;
    }

    header img{
        height: 90%;
    }

    header p{
        margin: 0 15px;
    }

    .vendor{
        text-decoration: none;
        color: var(--text);
    }

    .logoContainer{
        display: flex;
        align-items: center;
        height: 100%;
        text-decoration: none;
    }

    .inletShop{
        color: rgba(255, 0, 0, 0.55);
    }

    @media screen and (max-width: 900px){
        header{
            flex-direction: column;
            height: 75px;
        }

        .logoContainer{
            height: 50%;
        }
    }
</style>

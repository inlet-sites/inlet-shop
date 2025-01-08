<script>
    import {createEventDispatcher} from "svelte";
    import logo from "$lib/logo.png";

    const dispatch = createEventDispatcher();
    let {storeUrl, storeName, home} = $props();

    const changePage = (page)=>{
        dispatch("changePage", {page: page});
    }
</script>

<header>
    <a href="/" class="logoContainer">
        <img src={logo} alt="inlet.shop logo">
        <h3 class="inletshop">Inlet.Shop</h3>
    </a>

    {#if storeName}
        <p class="arrow">></p>
        <a class="vendor" href="/{storeUrl}">{storeName}</a>

        <div class="pages">
            <button onclick={()=>{changePage("about")}}>About</button>
            <button onclick={()=>{changePage("shop")}}>Shop</button>
        </div>
    {/if}

    {#if home}
        <a
            class="becomeVendor"
            href="https://vendor.inlet.shop"
        >Become a vendor</a>
    {/if}

    <a class="cart" href="/cart" aria-label="Cart">
        <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M19.5 22C20.3284 22 21 21.3284 21 20.5C21 19.6716 20.3284 19 19.5 19C18.6716 19 18 19.6716 18 20.5C18 21.3284 18.6716 22 19.5 22Z" fill="#000000" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M9.5 22C10.3284 22 11 21.3284 11 20.5C11 19.6716 10.3284 19 9.5 19C8.67157 19 8 19.6716 8 20.5C8 21.3284 8.67157 22 9.5 22Z" fill="#000000" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M5 4H22L20 15H7L5 4ZM5 4C4.83333 3.33333 4 2 2 2" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M20 15H7H5.23077C3.44646 15 2.5 15.7812 2.5 17C2.5 18.2188 3.44646 19 5.23077 19H19.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
</header>

{#if storeName}
    <div class="mobilePages">
        <button onclick={()=>{changePage("about")}}>About</button>
        <button onclick={()=>{changePage("shop")}}>Shop</button>
    </div>
{/if}

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
        position: relative;
    }

    header img{
        height: 90%;
        margin-right: 15px;
    }

    header h3{
        font-size: 24px;
        font-weight: bold;
    }

    header p{
        margin: 0 15px;
    }

    .becomeVendor{
        color: var(--text);
        margin-left: auto;
        font-size: 14px;
    }

    .vendor{
        text-decoration: none;
        color: var(--text);
        font-weight: bold;
    }

    .logoContainer{
        display: flex;
        align-items: center;
        height: 100%;
        text-decoration: none
    }

    .inletshop{
        color: rgba(255, 0, 0, 0.55);
    }

    .pages{
        margin: 0 35px 0 auto;
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

    .mobilePages{
        display: none;
    }

    .cart{
        display: flex;
        align-items: center;
        position: absolute;
        height: 100%;
        top: 0;
        right: 35px;
    }

    @media screen and (max-width: 900px){
        header{
            flex-direction: column;
            height: 75px;
        }

        .becomeVendor{
            margin-left: initial;
        }

        .arrow{
            display: none;
        }

        .logoContainer{
            height: 50%;
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

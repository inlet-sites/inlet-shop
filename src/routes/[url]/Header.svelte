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
    <img src={logo} alt="Inlet.Shop logo">
    <h3><span class="inletShop">Inlet.Shop</span> > {name}</h3>

    <div class="pages">
        <button onclick={()=>{changePage("about")}}>About</button>
        <button onclick={()=>{changePage("shop")}}>Shop</button>
    </div>
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
    }

    header img{
        height: 90%;
    }

    header h3{
        font-size: 24px;
        margin-left: 15px;
    }

    .pages{
        margin-left: auto;
    }

    .pages button{
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
</style>

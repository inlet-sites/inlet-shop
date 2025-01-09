<script>
    import {onMount} from "svelte";
    import "../../global.css";
    import Notifier from "../../components/Notifier.svelte";
    import Loader from "../../components/Loader.svelte";

    let currentVendor = $state(0);
    let notifier = $state({type: "", message: ""});
    let loader = $state(false);

    const createNotifier = (type, message)=>{
        notifier.type = type;
        notifier.message = message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }

    const getCart = async ()=>{
        loader = true;
        const cartObj = localStorage.getItem("cart");
        if(!cartObj){
            return [];
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: cartObj
        });
        const cart = await response.json();
        loader = false;
        return cart;
    }
    let cart = getCart();
</script>

{#if notifier.type}
    <Notifier
        type={notifier.type}
        message={notifier.message}
    />
{/if}

{#if loader}
    <Loader/>
{/if}

<div class="container">
    <h1>Your Cart</h1>


    {#await cart}
        <p>Loading...</p>
    {:then data}
        <select bind:value={currentVendor}>
            {#each data as vendor, i}
                <option value={i}>{vendor.store}</option>
            {/each}
        </select>

        {#each data[currentVendor].items as item}
            <div class="item">
                <p>{console.log(item)}</p>
                <h2>{item.product.name}</h2>
            </div>
        {/each}
    {/await}
</div>

<style>
    .container{
        color: var(--text);
    }
</style>

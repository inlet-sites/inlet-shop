<script>
    import {onMount} from "svelte";
    import "../../global.css";
    import Notifier from "../../components/Notifier.svelte";
    import Loader from "../../components/Loader.svelte";
    import Header from "../../components/Header.svelte";

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

    const getImage = (item)=>{
        if(item.variation.images.length > 0){
            return `${import.meta.env.VITE_API_URL}/document/${item.variation.images[0]}`;
        }
        return `${import.meta.env.VITE_API_URL}/document/${item.product.images[0]}`;
    }

    const formatPrice = (price)=>{
        return `$${(price / 100).toFixed(2)}`;
    }

    const grandTotal = (cart)=>{
        let total = 0;
        for(let i = 0; i < cart.items.length; i++){
            total += (cart.items[i].variation.price + cart.items[i].variation.shipping) * cart.items[i].quantity;
        }
        return formatPrice(total);
    }

    const checkout = ()=>{
        console.log("checking out");
    }
</script>

{#if notifier.type}
    <Notifier
        type={notifier.type}
        message={notifier.message}
    />
{/if}

<Header
    cart={true}
/>
<div class="container">
    {#await cart}
        <Loader/>
    {:then data}
        <select class="vendorSelect" bind:value={currentVendor}>
            {#each data as vendor, i}
                <option value={i}>{vendor.store}</option>
            {/each}
        </select>

        <div class="items">
            {#each data[currentVendor].items as item}
                <div class="item">
                    <img src={getImage(item)} alt="*product*">
                    <div class="itemInfo">
                        <h2>{item.product.name}</h2>
                        <h3>{data[currentVendor].store}</h3>
                        {#if item.variation.descriptor !== item.product.name}
                            <p>{item.variation.descriptor}</p>
                        {/if}
                        <p>Price: {formatPrice(item.variation.price)}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>

                    <div class="cost">
                        <p>Total: {formatPrice(item.variation.price * item.quantity)}</p>
                        <p class="shipping">Shipping: {formatPrice(item.variation.shipping * item.quantity)}</p>
                        <h1>{formatPrice((item.variation.price + item.variation.shipping) * item.quantity)}</h1>
                    </div>
                </div>
            {/each}
            <div class="grandTotal">
                <h1>{grandTotal(data[currentVendor])}</h1>
            </div>
        </div>

        {#if data[currentVendor].items.length > 0}
            <div class="checkout">
                <h1>{grandTotal(data[currentVendor])}</h1>

                <button
                    class="button"
                    onclick={checkout}
                >Checkout</button>
            </div>
        {/if}
    {/await}
</div>

<style>
    .container{
        color: var(--text);
        padding: 35px;
    }

    .item{
        display: flex;
        border: 1px solid var(--text);
        width: 750px;
        height: 150px;
        padding: 10px;
    }

    .itemInfo{
        margin-left: 15px;
    }

    .vendorSelect{
        background: none;
        border: 1px solid var(--text);
        font-size: 35px;
        color: var(--text);
        margin-bottom: 35px;
        padding: 5px 15px;
    }

    .cost{
        margin-left: auto;
    }

    .shipping{
        border-bottom: 1px solid var(--text);
    }

    .grandTotal{
        display: flex;
        justify-content: flex-end;
        width: 750px;
        font-size: 28px;
    }

    .checkout{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        top: 75px;
        right: 35px;
        border: 1px solid var(--text);
        padding: 15px;
    }

    .checkout button{
        margin-top: 35px;
    }
</style>

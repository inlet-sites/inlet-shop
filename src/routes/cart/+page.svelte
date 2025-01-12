<script>
    import {onMount} from "svelte";
    import "../../global.css";
    import Notifier from "../../components/Notifier.svelte";
    import Loader from "../../components/Loader.svelte";
    import Header from "../../components/Header.svelte";

    let currentVendor = $state(0);
    let notifier = $state({type: "", message: ""});
    let loader = $state(false);
    let vendors = $state([]);

    const createNotifier = (type, message)=>{
        notifier.type = type;
        notifier.message = message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }

    const getCart = async ()=>{
        const cartObj = localStorage.getItem("cart");
        if(!cartObj) return;

        loader = true;
        fetch(`${import.meta.env.VITE_API_URL}/cart`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: cartObj
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    createNotifier("error", response.error.message);
                }else{
                    vendors = response;
                }
            })
            .catch((err)=>{
                createNotifier("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader = false;
            });
    }

    const getImage = (item)=>{
        if(item.variation.images.length > 0){
            return `${import.meta.env.VITE_API_URL}/document/${item.variation.images[0]}`;
        }
        return `${import.meta.env.VITE_API_URL}/document/${item.product.images[0]}`;
    }

    const formatPrice = (price)=>{
        return `$${(price / 100).toFixed(2)}`;
    }

    const grandTotal = (vendor)=>{
        let total = 0;
        for(let i = 0; i < vendor.items.length; i++){
            total += (vendor.items[i].variation.price + vendor.items[i].variation.shipping) * vendor.items[i].quantity;
        }
        return formatPrice(total);
    }

    const checkout = ()=>{
        console.log("checking out");
    }

    const clearFullCart = ()=>{
        localStorage.removeItem("cart");
        vendors = [];
        createNotifier("success", "Your cart has been emptied");
    }

    const removeVendor = ()=>{
        const name = vendors[currentVendor].store;
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart[vendors[currentVendor]._id] = undefined;
        localStorage.setItem("cart", JSON.stringify(cart));

        vendors.splice(currentVendor, 1);
        currentVendor = 0;
        createNotifier("success", `All items for ${name} removed from cart`);
    }

    const removeItem = (item)=>{
        let idx = vendors[currentVendor].items.indexOf(item);
        vendors[currentVendor].items.splice(idx, 1);
        vendors[currentVendor].cart.splice(idx, 1);

        const storageCart = JSON.parse(localStorage.getItem("cart"));
        const vendor = storageCart[vendors[currentVendor]._id];
        const itemIdx = vendor.findIndex(i => i.product === item.product._id && i.variation === item.variation._id);
        vendor.splice(itemIdx, 1);
        localStorage.setItem("cart", JSON.stringify(storageCart));

        createNotifier("success", `${item.product.name} removed from your cart`);
    }

    onMount(getCart);
</script>

<svelte:head>
    <title>My Cart | Inlet.Shop</title>
</svelte:head>

{#if notifier.type}
    <Notifier
        type={notifier.type}
        message={notifier.message}
    />
{/if}

{#if loader}
    <Loader/>
{/if}

<Header
    cart={true}
/>
<div class="container">
    {#if vendors[0]}
        <div class="vendorOption">
            <select class="vendorSelect" bind:value={currentVendor}>
                {#each vendors as vendor, i}
                    <option value={i}>{vendor.store}</option>
                {/each}
            </select>

            <button
                class="button clearCart"
                onclick={removeVendor}
            >Remove All Items</button>
        </div>

        <div class="items">
            {#each vendors[currentVendor].items as item}
                <div class="item">
                    <img src={getImage(item)} alt="*product*">
                    <div class="itemInfo">
                        <h2>{item.product.name}</h2>
                        <h3>{vendors[currentVendor].store}</h3>
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

                    <button 
                        aria-label="remove"
                        class="button removeItemBtn"
                        onclick={()=>{removeItem(item)}}
                    >
                        <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
                            <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>
            {/each}
            <div class="grandTotal">
                <h1>{grandTotal(vendors[currentVendor])}</h1>
            </div>
        </div>

        {#if vendors[currentVendor].items.length > 0}
            <div class="checkout">
                <h1>{grandTotal(vendors[currentVendor])}</h1>

                <button
                    class="button"
                    onclick={checkout}
                >Checkout</button>

                <button
                    class="button clearCart"
                    onclick={clearFullCart}
                >Empty Cart</button>
            </div>
        {/if}
    {:else}
        <div class="emptyCart">
            <h1>Your Cart is Empty</h1>
            <a href="/">Continue Shopping</a>
        </div>
    {/if}
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
        margin: 0 35px 0 auto;
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

    .emptyCart{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .emptyCart a{
        color: white;
        font-size: 22px;
        margin-top: 35px;
    }

    .removeItemBtn{
        background: none;
        border: none;
    }

    .clearCart{
        background: red;
        color: var(--text);
    }
</style>

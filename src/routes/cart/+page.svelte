<script>
    import {onMount} from "svelte";
    import "../../global.css";
    import Notifier from "../../components/Notifier.svelte";
    import Loader from "../../components/Loader.svelte";
    import Header from "../../components/Header.svelte";
    import CartItem from "../../components/CartItem.svelte";

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

    const grandTotal = (vendor)=>{
        let total = 0;
        for(let i = 0; i < vendor.items.length; i++){
            total += (vendor.items[i].variation.price + vendor.items[i].variation.shipping) * vendor.items[i].quantity;
        }
        return `$${(total / 100).toFixed(2)}`;
    }

    const checkout = ()=>{
        console.log(vendors[currentVendor]);
        window.location.href = `/checkout/${vendors[currentVendor]._id}`;
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

    const removeItem = (event)=>{
        const item = event.detail.item;
        let idx = vendors[currentVendor].items.indexOf(item);
        vendors[currentVendor].items.splice(idx, 1);
        vendors[currentVendor].cart.splice(idx, 1);

        const storageCart = JSON.parse(localStorage.getItem("cart"));
        const vendor = storageCart[vendors[currentVendor]._id];
        const itemIdx = vendor.findIndex(i => i.product === item.product._id && i.variation === item.variation._id);
        vendor.splice(itemIdx, 1);
        saveCart(storageCart);
        if(vendors[currentVendor].items.length === 0){
            vendors.splice(currentVendor, 1);
        }

        createNotifier("success", `${item.product.name} removed from your cart`);
    }

    const saveCart = (cart)=>{
        const vendors = Object.keys(cart);
        for(let i = 0; i < vendors.length; i++){
            if(cart[vendors[i]].length === 0) cart[vendors[i]] = undefined;
        }

        if(Object.keys(cart).length === 0){
            localStorage.removeItem("cart");
        }else{
            localStorage.setItem("cart", JSON.stringify(cart));
        }
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
                <CartItem
                    item={item}
                    vendor={vendors[currentVendor].store}
                    on:removeItem={removeItem}
                />
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
        width: 100vw;
    }

    .vendorOption{
        display: flex;
        align-items: center;
        margin-bottom: 35px;
    }

    .vendorSelect{
        background: none;
        border: 1px solid var(--text);
        font-size: 35px;
        color: var(--text);
        margin-right: 35px;
        padding: 5px 15px;
    }

    .items{
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .grandTotal{
        display: flex;
        justify-content: flex-end;
        width: 100%;
        max-width: 750px;
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
        width: 100%;
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

    .clearCart{
        background: red;
        color: var(--text);
    }

    @media screen and (max-width: 1100px){
        .container{
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .items{
            align-items: center;
        }

        .checkout{
            position: static;
            margin-top: 35px;
        }
    }

    @media screen and (max-width: 650px){
        .vendorOption{
            flex-direction: column;
        }

        .vendorSelect{
            margin: 0 0 15px 0;
            margin-right: 0;
        }

        .vendorOption button{
            font-size: 22px;
        }
    }
</style>

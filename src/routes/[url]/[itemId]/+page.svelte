<script>
    import Images from "./Images.svelte";
    import Notifier from "../../../components/Notifier.svelte";
    import Header from "../../../components/Header.svelte";

    let {data} = $props();
    let clickedImage = $state(0);
    let images = $state(false);
    let variationIndex = $state(0);
    let buyQuantity = $state(1);
    let notifier = $state({type: "", message: ""});
    let totalPrice = $state(0);
    let totalShipping = $state(0);
    let maxQuantity = $state(0);
    $effect(()=>{
        if(data.product.variations[variationIndex].quantity > 20){
            maxQuantity = 20;
        }else{
            maxQuantity = data.product.variations[variationIndex].quantity
        }
    });
    $effect(()=>{
        totalPrice = data.product.variations[variationIndex].price * buyQuantity;
    });
    $effect(()=>{
        totalShipping = data.product.variations[variationIndex].shipping * buyQuantity;
    });

    const showImages = (i)=>{
        clickedImage = i;
        images = true;
        document.body.style.overflow = "hidden";
    }

    const closeImages = ()=>{
        images = false;
        document.body.style.overflow = "initial";
    }

    const formatPrice = (price)=>{
        return (price / 100).toFixed(2);
    }

    const itemExists = (item)=>{
        if(
            item.product === data.product.id &&
            item.variation === data.product.variations[variationIndex].id
        ) return true;
        return false;
    }

    const createNotifier = (type, message)=>{
        notifier.type = type;
        notifier.message = message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }

    const validateQuantity = ()=>{
        if(!Number.isInteger){
            createNotifier("error", "Invalid quantity");
            buyQuantity = 1;
        }
    }

    const changePage = (event)=>{
        window.location.href = `/${data.vendor.url}`;
    }

    const addToCart = ()=>{
        const quant = data.product.variations[variationIndex].quantity;
        if(quant === 0){
            createNotifier("error", "Item not in stock");
            return;
        }

        if(data.product.variations[variationIndex].purchaseOption === "list"){
            createNotifier("error", "Available in-store only");
            return;
        }

        if(quant < buyQuantity){
            createNotifier("error", `Only ${quant} available for this product`);
            return;
        }

        let cart = localStorage.getItem("cart");
        const item = {
            product: data.product.id,
            variation: data.product.variations[variationIndex].id,
            quantity: buyQuantity
        };

        if(cart){
            cart = JSON.parse(cart);
            if(cart[data.vendor.id]){
                const product = cart[data.vendor.id].find(itemExists);
                if(product){
                    product.quantity += buyQuantity
                }else{
                    cart[data.vendor.id].push(item);
                }
            }else{
                cart[data.vendor.id] = [item];
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            buyQuantity = 1;
        }else{
            const cartObj = {};
            cartObj[data.vendor.id] = [item];
            localStorage.setItem("cart", JSON.stringify(cartObj));
            buyQuantity = 1;
        }

        createNotifier("success", "Item added to cart");
    }
</script>

<svelte:head>
    <title>{data.vendor.store} | Inlet.Shop</title>
</svelte:head>

{#if notifier.type}
    <Notifier
        type={notifier.type}
        message={notifier.message}
    />
{/if}

<Header
    storeUrl={data.vendor.url}
    storeName={data.vendor.store}
    on:changePage={changePage}
/>

<div class="container">
    {#if images}
        <Images
            images={data.product.variations[variationIndex].images.concat(data.product.images)}
            idx={clickedImage}
            on:close={closeImages}
        />
    {/if}

    <div class="images">
        {#each data.product.variations[variationIndex].images.concat(data.product.images) as image, i}
            <button onclick={()=>{showImages(i)}}>
                <img src="{import.meta.env.VITE_API_URL}/document/{image}" alt="{data.product.name} #{i+1}">
            </button>
        {/each}
    </div>

    <div class="otherDetails">
        <h1>{data.product.name}</h1>
        {#if data.product.variations.length > 1}
            <select class="variations" bind:value={variationIndex}>
                {#each data.product.variations as variation, idx}
                    <option value={idx}>{variation.descriptor}</option>
                {/each}
            </select>
        {/if}
        <h2>${formatPrice(data.product.variations[variationIndex].price)}</h2>
        {#if data.product.variations[variationIndex].quantity === 0}
            <h3 class="unavailable">Out of stock</h3>
        {:else if data.product.variations[variationIndex].quantity >= 0}
            <h3>{data.product.variations[variationIndex].quantity} available</h3>
        {/if}

        {#if data.product.variations[variationIndex].purchaseOption === "buy"}
            <h3 class="storeBuy">Shipping not available. Pick up in store.</h3>
        {/if}

        <div class="tags">
            {#each data.product.tags as tag}
                <p>{tag}</p>
            {/each}
        </div>

        <p class="description">{data.product.description}</p>
    </div>

    {#if data.product.variations[variationIndex].purchaseOption !== "list"}
        <div class="purchase">
            <h3>Purchase</h3>
            <p>Price: ${formatPrice(data.product.variations[variationIndex].price)}</p>
            <p>Shipping: ${formatPrice(data.product.variations[variationIndex].shipping)}</p>

            <h4>Quantity</h4>
            <select bind:value={buyQuantity}>
                {#each Array.from({length: maxQuantity}) as _, i}
                    <option value={i+1}>{i + 1}</option>
                {/each}
                {#if maxQuantity === 0}
                    <option
                        disabled
                        value={buyQuantity}
                    >Out of stock</option>
                {/if}
            </select>

            <p>Total: ${formatPrice(totalPrice)}</p>
            <p>Total shipping: ${formatPrice(totalShipping)}</p>
            <p>Grand Total: ${formatPrice(totalPrice + totalShipping)}</p>

            <button
                class="button"
                onclick={addToCart}
            >Add To Cart</button>
        </div>
    {/if}
</div>

<style>
    .container{
        display: flex;
        height: 100%;
        width: 100%;
        background: var(--background);
        padding: 35px;
    }

    .images{
        display: flex;
        flex-direction: column;
        width: 25%;
        height: 80vh;
        overflow-y: auto;
        margin: auto 0;
        padding: 15px;
        border: 1px solid rgba(255, 0, 0, 0.35);
        border-radius: 5px;
    }

    .images button{
        display: flex;
        background: none;
        border: 1px solid white;
        cursor: pointer;
        margin: 5px 0;
    }

    .images button:first-of-type{
        margin-top: 0;
    }

    .images img{
        width: 100%;
    }

    .otherDetails{
        display: flex;
        flex-direction: column;
        width: calc(100% - 250px);
        align-items: center;
        color: var(--text);
        padding: 0 35px;
    }

    .tags{
        display: flex;
        flex-wrap: wrap;
        margin: 15px 0;
    }

    .tags p{
        border: 1px solid rgba(255, 0, 0, 0.35);
        margin: 0 15px;
        border-radius: 10px;
        padding: 5px;
    }

    .description{
        font-size: 18px;
        line-height: 28px;
    }

    select{
        border 2px solid var(--text);
        font-size: 22px;
        padding: 5px 15px;
        margin-bottom: 35px;
    }

    .unavailable{
        color: red;
    }

    .storeBuy{
        color: orange;
    }

    .purchase{
        color: var(--text);
        border: 1px solid rgb(255, 0, 0, 0.35);
        padding: 15px;
        border-radius: 15px;
        width: 25%;
        position: relative;
    }

    .purchase h3{
        text-decoration: underline;
        margin-bottom: 15px;
    }

    .purchase h4{
        text-decoration: underline;
        margin-top: 15px;
    }

    .purchase input{
        margin-bottom: 35px;
        font-size: 22px;
        max-width: 100px;
    }

    .purchase button{
        position: absolute;
        bottom: 35px;
        left: calc(50% - 75px);
        width: 150px;
        font-size: 18px;
    }

    @media screen and (max-width: 1100px){
        .container{
            flex-direction: column;
            align-items: center;
        }

        .images{
            flex-direction: row;
            align-items: center;
            height: 150px;
            width: initial;
            max-width: 100%;
            overflow-x: auto;
        }

        .images button{
            height: 100%;
            margin: 0 15px;
        }

        .images img{
            width: initial;
        }

        .otherDetails{
            width: 100%;
        }

        .purchase{
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .purchase button{
            margin-top: 15px;
            position: static;
        }
    }

    @media screen and (max-width: 500px){
    }
</style>

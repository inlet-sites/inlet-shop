<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {item, vendor, edit} = $props();

    const getImage = (item)=>{
        if(item.variation.images.length > 0){
            return `${import.meta.env.VITE_API_URL}/document/${item.variation.images[0]}`;
        }
        return `${import.meta.env.VITE_API_URL}/document/${item.product.images[0]}`;
    }

    const formatPrice = (price)=>{
        return `$${(price / 100).toFixed(2)}`;
    }

    const removeItem = (thisItem)=>{
        dispatch("removeItem", {item: thisItem});
    }
</script>

<div class="CartItem">
    <img src={getImage(item)} alt="*product*">
    <div class="itemInfo">
        <h2>{item.product.name}</h2>
        <h3>{vendor}</h3>
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

    {#if edit !== false}
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
    {/if}
</div>

<style>
    .CartItem{
        display: flex;
        border: 1px solid var(--text);
        width: 750px;
        max-width: 100%;
        height: 150px;
        padding: 10px;
    }

    .itemInfo{
        margin-left: 15px;
    }

    .cost{
        margin: 0 35px 0 auto;
    }

    .shipping{
        border-bottom: 1px solid var(--text);
    }

    .removeItemBtn{
        background: none;
        border: none;
    }
</style>

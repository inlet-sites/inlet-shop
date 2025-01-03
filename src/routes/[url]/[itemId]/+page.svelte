<script>
    import Images from "./Images.svelte";
    import Header from "./Header.svelte";

    let {data} = $props();
    let clickedImage = $state(0);
    let images = $state(false);
    let variationIndex = $state(0);

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
</script>

<svelte:head>
    <title>{data.vendor.store} | Inlet.Shop</title>
</svelte:head>

<Header name={data.vendor.store} url={data.vendor.url}/>

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

        <div class="tags">
            {#each data.product.tags as tag}
                <p>{tag}</p>
            {/each}
        </div>

        <p class="description">{data.product.description}</p>
    </div>
</div>

<style>
    .container{
        display: flex;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: var(--background);
        padding: 35px;
    }

    .images{
        display: flex;
        flex-direction: column;
        width: 250px;
        max-height: 90%;
        overflow-y: auto;
    }

    .images button{
        display: flex;
        background: none;
        border: 1px solid white;
        cursor: pointer;
        margin: 25px 0;
        margin: 25px 5px 0 25px;
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
        background: none;
        color: var(--text);
        border 2px solid var(--text);
        font-size: 22px;
        padding: 5px 15px;
        margin-bottom: 35px;
    }

    .unavailable{
        color: red;
    }

    @media screen and (max-width: 800px){
        .container{
            flex-direction: column-reverse;
            align-items: center;
            justify-content: flex-end;
            padding: 15px 0 0 0;
        }

        .otherDetails{
            width: 100%;
            padding: 25px;
        }

        .images{
            flex-direction: row;
            justify-content: space-around;
            flex-wrap: wrap;
            width: 100%;
            overflow-y: initial;
            margin-top: 35px;
            max-height: initial;
        }

        .images button{
            width: 250px;
        }
    }
</style>

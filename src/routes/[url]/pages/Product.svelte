<script>
    import Images from "../components/Images.svelte";

    let {product} = $props();
    let images = $state(false);
    let clickedImage = $state(0);

    const showImages = (i)=>{
        clickedImage = i;
        images = true;
    }

    const closeImages = ()=>{
        images = false;
    }
</script>

<div class="Product">
    {#if images}
        <Images
            images={product.images}
            idx={clickedImage}
            on:close={closeImages}
        />
    {/if}

    <div class="images">
        {#each product.images as image, i}
            <button onclick={()=>{showImages(i)}}>
                <img src="{import.meta.env.VITE_API_URL}/document/{image}" alt="{product.name} #{i+1}">
            </button>
        {/each}
    </div>

    <div class="otherDetails">
        <h1>{product.name}</h1>
        <h2>${(product.price / 100).toFixed(2)}</h2>
        {#if product.quantity >= 0}
            <h3>{product.quantity} available</h3>
        {/if}

        <div class="tags">
            {#each product.tags as tag}
                <p>{tag}</p>
            {/each}
        </div>

        <p class="description">{product.description}</p>
    </div>
</div>

<style>
    .Product{
        display: flex;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
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
        margin: 15px auto 15px 0;
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

    @media screen and (max-width: 800px){
        .Product{
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

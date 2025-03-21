<script>
    import Product from "./Product.svelte";

    let {data} = $props();
    let displayProducts = $state(data.products);
    let selectedTag = $state("all");

    const getTags = (products)=>{
        const obj = {};
        obj["all"] = [];
        for(let i = 0; i < products.length; i++){
            obj["all"].push(products[i]);
            for(let j = 0; j < products[i].tags.length; j++){
                let tag = products[i].tags[j].toLowerCase();
                if(obj[tag]){
                    obj[tag].push(products[i]);
                }else{
                    obj[tag] = [products[i]];
                }
            }
        }
        return obj;
    }

    let tags = $state(getTags(data.products));

    const tagSearch = (tag)=>{
        displayProducts = tags[tag.toLowerCase()];
    }
</script>

<svelte:head>
    <title>{data.vendor.store} | Inlet.Shop</title>
</svelte:head>

<div class="container">
    <div class="tags">
        {#each Object.keys(tags) as tag}
            <button onclick={()=>{tagSearch(tag)}}>{tag.toUpperCase()}</button>
        {/each}
    </div>

    <div class="products">
        {#each displayProducts as product}
            <Product
                product={product}
                url={data.vendor.url}
            />
        {/each}
    </div>
</div>

<style>
    .container{
        color: white;
        padding: 35px;
    }

    .tags{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .tags button{
        padding: 5px 15px;
        margin: 5px 15px;
        border: 1px solid var(--red);
        background: none;
        color: var(--white);
        cursor: pointer;
        border-radius: 5px;
    }

    .tags button:active{
        color: var(--red);
    }

    @media screen and (max-width: 600px){
        .container{
            padding: 15px;
        }
    }
</style>

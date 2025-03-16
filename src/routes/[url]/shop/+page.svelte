<script>
    let {data} = $props();
    let selectedTag = $state("all");

    const getTags = (products)=>{
        const obj = {};
        obj["all"] = [];
        for(let i = 0; i < products.length; i++){
            obj["all"].push(products[i]);
            for(let j = 0; i < products.length; i++){
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
</script>

<svelte:head>
    <title>{data.vendor.store} | Inlet.Shop</title>
</svelte:head>

<div class="container">
    <div class="tags">
        {#each Object.keys(tags) as tag}
            <button>{tag.toUpperCase()}</button>
        {/each}
    </div>
</div>

<style>
    .container{
        color: white;
    }

    .tags{
        display: flex;
        justify-content: center;
    }

    .tags button{
        padding: 5px 15px;
        margin: 15px;
        border: 1px solid var(--red);
        background: none;
        color: var(--white);
        cursor: pointer;
        border-radius: 5px;
    }

    .tags button:active{
        color: var(--red);
    }
</style>

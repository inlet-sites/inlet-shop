<script>
    import {createEventDispatcher} from "svelte";
    import {slide} from "svelte/transition";

    const dispatch = createEventDispatcher();
    let {products, vendorUrl} = $props();
    let selectedTag = $state("all");
    let tagElems = $state();
    let displayProducts = $state();
    let tags = $derived.by(()=>{
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
    });
    displayProducts = tags.all;

    const setActiveTag = (elem)=>{
        for(let i = 0; i < tagElems.children.length; i++){
            tagElems.children[i].classList.remove("active");
        }
        elem.classList.add("active");
    }

    const tagSearch = (event, tag)=>{
        setActiveTag(event.target);
        displayProducts = tags[tag];
    }

    const tagSelect = ()=>{
        displayProducts = tags[selectedTag];
    }
</script>

<div class="Shop" transition:slide>
    <div class="tags" bind:this={tagElems}>
        {#each Object.keys(tags) as tag}
            <button class="tag" onclick={()=>{tagSearch(event, tag)}}>{tag.toUpperCase()}</button>
        {/each}
    </div>

    <select
        class="mobileTags"
        bind:value={selectedTag}
        onchange={tagSelect}
    >
        {#each Object.keys(tags) as tag}
            <option class="mobileTag" value={tag}>{tag.toUpperCase()}</option>
        {/each}
    </select>

    <div class="products">
        {#each displayProducts as product}
            <a class="product" href="/{vendorUrl}/{product.id}">
                <img
                    src="{import.meta.env.VITE_API_URL}/document/{product.images[0]}"
                    alt={product.name}
                >
                <h2>{product.name}</h2>
                <h3>${(product.price / 100).toFixed(2)}</h3>
            </a>
        {/each}
    </div>
</div>

<style>
    .Shop{
        position: relative;
        height: calc(100vh - 50px);
        overflow-y: auto;
    }

    .tags{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin: 35px;
    }

    .mobileTags{
        display: none;
        margin: 15px auto;
        font-size: 24px;
        text-align: center;
    }

    .tag{
        background: none;
        border: 1px solid rgba(255, 0, 0, 0.35);
        border-radius: 5px;
        padding: 5px 10px;
        margin: 5px 15px;
        color: var(--text);
        cursor: pointer;
        font-size: 14px;
    }

    :global(.tag.active){
        color: pink;
        background: rgba(255, 0, 0, 0.35);
    }

    .products{
        display: flex;
        justify-content: center;
        flex-wrap: wrap; 
    }

    .product{
        background: none;
        border: 1px solid var(--text);
        width: 250px;
        color: white;
        margin: 25px;
        cursor: pointer;
        text-decoration: none;
    }

    .product img{
        width: 100%;
    }

    .product h2, .product h3{
        text-align: center;
    }

    @media screen and (max-width: 900px){
        .Shop{
            height: initial;
        }

        .tags{
            display: none;
        }

        .mobileTags{
            display: block;
        }
    }
</style>

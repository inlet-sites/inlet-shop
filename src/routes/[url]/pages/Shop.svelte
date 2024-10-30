<script>
    import {onMount, createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {vendorId} = $props();
    let products = $state([]);
    let tagElems = $state();
    let tags = $state({});

    const setActiveTag = (elem)=>{
        for(let i = 0; i < tagElems.children.length; i++){
            tagElems.children[i].classList.remove("active");
        }
        elem.classList.add("active");
    }

    const tagSearch = (event, tag)=>{
        setActiveTag(event.target);
        products = tags[tag];
    }

    const createTagMap = (p)=>{
        const obj = {};
        obj["all"] = [];
        for(let i = 0; i < p.length; i++){
            obj["all"].push(p[i]);
            for(let j = 0; j < p[i].tags.length; j++){
                if(obj[p[i].tags[j]]){
                    obj[p[i].tags[j]].push(p[i]);
                }else{
                    obj[p[i].tags[j]] = [p[i]];
                }
            }
        }
        return obj;
    }

    onMount(()=>{
        dispatch("loader", {on: true});
        fetch(`${import.meta.env.VITE_API_URL}/product/vendor/${vendorId}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {
                        type: "error",
                        message: response.message
                    });
                }else{
                    tags = createTagMap(response);
                    products = tags.all;
                }
            })
            .catch((err)=>{
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                dispatch("loader", {on: false});
            });
    });
</script>

<div class="Shop">
    <div class="tags" bind:this={tagElems}>
        {#each Object.keys(tags) as tag}
            <button class="tag" onclick={()=>{tagSearch(event, tag)}}>{tag.toUpperCase()}</button>
        {/each}
    </div>

    <div class="products">
        {#each products as product}
            <button class="product">
                <img
                    src="{import.meta.env.VITE_API_URL}/document/{product.images[0]}"
                    alt={product.name}
                >
                <h2>{product.name}</h2>
                <h3>${(product.price / 100).toFixed(2)}</h3>
            </button>
        {/each}
    </div>
</div>

<style>
    .tags{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin: 35px;
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
    }

    .product img{
        width: 100%;
    }
</style>

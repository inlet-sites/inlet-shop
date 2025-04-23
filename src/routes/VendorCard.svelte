<script>
    let {vendor} = $props();
    const apiUrl = import.meta.env.VITE_API_URL;
</script>

<a class="VendorCard" href="/{vendor.url}/shop">
    <div class="imageContainer">
        {#if vendor.publicData.image}
            <img src="{apiUrl}/document/{vendor.publicData.image}" alt={vendor.store}>
        {:else}
            <img src="{apiUrl}/document/defaultVendorImage.png" alt={vendor.store}>
        {/if}
    </div>

    <div class="textContent">
        <p class="name">{vendor.store}</p>
        <p class="slogan">{vendor.slogan}</p>
    </div>
</a>

<style>
    .VendorCard{
        display: flex;
        align-items: center;
        height: 100px;
        width: 100%;
        max-width: 1000px;
        margin: 15px 0;
        color: white;
        text-decoration: none;
        border: 1px solid rgba(254, 2, 35, 0.15);
    }

    .imageContainer{
        display: flex;
        align-items: center;
        height: 100%;
        width: 150px;
    }

    img{
        max-height: 100%;
        max-width: 100%;
    }

    .textContent{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-grow: 0;
        height: 100%;
        width: calc(100% - 150px);
        padding: 5px;
    }

    .name{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .slogan{
        font-size: 14px;
    }

    @media screen and (max-width: 600px){
        .VendorCard{
            height: initial;
        }

        .name{
            font-size: 14px
        }

        .slogan{
            font-size: 12px;
        }
    }
</style>

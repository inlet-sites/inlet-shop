<script>
    import {createEventDispatcher} from "svelte";
    import {slide} from "svelte/transition";

    let {vendor} = $props();
</script>

<div class="About" transition:slide>
    <div class="top">
        <div class="left">
            <h1>{vendor.store}</h1>
            <h2>{vendor.slogan}</h2>
        </div>
        <img src="{import.meta.env.VITE_API_URL}/document/{vendor.image}" alt={vendor.name}>
    </div>

    <p class="description">{vendor.description}</p>

    <div class="divider"></div>

    <h2>Contact Information</h2>

    <ul>
        {#if vendor.contact?.phone}
            <li>
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <p>{vendor.contact.phone}</p>
            </li>
        {/if}
        {#if vendor.contact?.email}
            <li>
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M7 9L12 12.5L17 9" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="#ffffff" stroke-width="1.5"></path>
                </svg>
                <p>{vendor.contact.email}</p>
            </li>
        {/if}
        {#if vendor.contact?.address}
            <li>
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="#ffffff" stroke-width="1.5"></path>
                    <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" fill="#000000" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <p>{vendor.contact.address}
            </li>
        {/if}
    </ul>
</div>

<style>
    .About{
        color: white;
        padding: 35px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .top{
        display: flex;
        width: 100%;
        margin-bottom: 35px;
    }

    .left{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
    }

    .left h1{
        margin-bottom: 35px;
        font-size: 38px;
    }

    .left h2{
        font-size: 20px;
    }

    img{
        max-height: 50vh;
        max-width: 50%;
        border: 2px solid white;
        border-radius: 25%;
        margin: 0 auto;
    }

    .description{
        text-indent: 35px;
        font-size: 18px;
        line-height: 28px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .divider{
        border-bottom: 2px solid rgba(255, 0, 0, 0.35);
        margin: 35px 0;
    }

    ul{
        list-style-type: none;
    }

    li{
        display: flex;
        align-items: center;
        margin: 15px 0;
    }

    li svg{
        margin-right: 15px;
    }
</style>

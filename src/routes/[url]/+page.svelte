<script> 
    let {data} = $props();
    const apiUrl = import.meta.env.VITE_API_URL;
</script>

<div class="container">
    <img src="{apiUrl}/document/{data.vendor.image}" alt={data.vendor.store}>
    <h1>{data.vendor.store}</h1>
    <h2>{data.vendor.slogan}</h2>
    <p>{data.vendor.description}</p>
    <p class="contact">Contact Information:</p>

    {#if data.vendor.contact.phone}
        <a class="contactInfo" href="tel:{data.vendor.contact.phone}">
            <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
                <path d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                </path>
            </svg>

            <p>{data.vendor.contact.phone}</p>
        </a>
    {/if}

    {#if data.vendor.contact.email}
        <a class="contactInfo" href="mailto:{data.vendor.contact.email}">
            <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
                <path d="M7 9L12 12.5L17 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="currentColor" stroke-width="1.5"></path>
            </svg>

            <p>{data.vendor.contact.email}</p>
        </a>
    {/if}

    {#if data.vendor.contact.address}
        <div class="contactInfo">
            <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
                <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="currentColor" stroke-width="1.5"></path>
                <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" fill="#000000" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>

            <p>{data.vendor.contact.address}</p>
        </div>
    {/if}
</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
        color: var(--white);
        padding: 35px;
    }

    .container img{
        max-height: 350px;
        max-width: 100%;
        margin: 0 auto;
    }

    h1{
        font-size: 35px;
    }

    h2{
        font-size: 20px;
        margin-bottom: 35px;
    }

    p{
        line-height: 25px;
    }

    .contact{
        margin: 35px 0 15px 0;
        margin-top: 35px;
        font-size: 20px;
    }

    .contactInfo{
        display: flex;
        color: white;
        margin: 10px 0;
    }

    .contactInfo svg{
        margin-right: 15px;
    }
</style>

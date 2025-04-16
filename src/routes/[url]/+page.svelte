<script> 
    let {data} = $props();
    const apiUrl = import.meta.env.VITE_API_URL;
    const pd = data.vendor.publicData;

    const displayTime = (t)=>{
        if(t === "00:00") return "12:00 AM";
        if(t === "12:00") return "12:00 PM";

        const split = t.split(":");
        let period = "AM";
        split[0] = Number(split[0]);
        if(split[0] > 12){
            split[0] -= 12;
            period = "PM";
        }

        return `${split[0]}:${split[1]} ${period}`;
    }
</script>

<div class="container">
    <div class="head">
        <div class="headLeft">
            <h1>{data.vendor.store}</h1>

            {#if pd.slogan}
                <h2>{pd.slogan}</h2>
            {/if}

            {#if pd.website}
                <a class="website" href={pd.website}>{pd.website}</a>
            {/if}
        </div>

        {#if pd.image}
            <img src="{import.meta.env.VITE_API_URL}/document/{pd.image}" alt={data.vendor.store}>
        {/if}
    </div>

    {#if pd.description}
        <div class="description">
            {#each pd.description.split("\n") as p}
                <p>{p}</p>
            {/each}
        </div>
    {/if}

    {#if pd.hours}
        <h3>Business Hours</h3>
        <table>
            <tbody>
                {#if pd.hours.sunday.length === 2}
                    <tr>
                        <td class="day">Sunday</td>
                        <td>{displayTime(pd.hours.sunday[0])}</td>
                        <td class="dash">-</td>
                        <td>{displayTime(pd.hours.sunday[1])}</td>
                    </tr>
                {/if}
                {#if pd.hours.monday.length === 2}
                    <tr>
                        <td class="day">Monday</td>
                        <td>{displayTime(pd.hours.monday[0])}</td>
                        <td class="dash">-</td>
                        <td>{displayTime(pd.hours.monday[1])}</td>
                    </tr>
                {/if}
                {#if pd.hours.tuesday.length === 2}
                    <tr>
                        <td class="day">Tuesday</td>
                        <td>{displayTime(pd.hours.tuesday[0])}</td>
                        <td class="dash">-</td>
                        <td>{displayTime(pd.hours.tuesday[1])}</td>
                    </tr>
                {/if}
                {#if pd.hours.wednesday.length === 2}
                    <tr>
                        <td class="day">Wednesday</td>
                        <td>{displayTime(pd.hours.wednesday[0])}</td>
                        <td class="dash">-</td>
                        <td>{displayTime(pd.hours.wednesday[1])}</td>
                    </tr>
                {/if}
                {#if pd.hours.thursday.length === 2}
                    <tr>
                        <td class="day">Thursday</td>
                        <td>{displayTime(pd.hours.thursday[0])}</td>
                        <td class="dash">-</td>
                        <td>{displayTime(pd.hours.thursday[1])}</td>
                    </tr>
                {/if}
                {#if pd.hours.friday === 2}
                    <tr>
                        <td class="day">Friday</td>
                        <td>{displayTime(pd.hours.friday[0])}</td>
                        <td class="dash">-</td>
                        <td>{displayTime(pd.hours.friday[1])}</td>
                    </tr>
                {/if}
                {#if pd.hours.saturday === 2}
                    <tr>
                        <td class="day">Saturday</td>
                        <td>{displayTime(pd.hours.saturday[0])}</td>
                        <td class="dash">-</td>
                        <td>{displayTime(pd.hours.saturday[1])}</td>
                    </tr>
                {/if}
            </tbody>
        </table>
    {/if}

    {#if pd.links}
        <div class="links">
            {#each pd.links as link}
                <a href={link.url}>{link.text}</a>
            {/each}
        </div>
    {/if}

    <h3>Contact Information</h3>
    {#if pd.phone}
        <a class="contact" href="tel:{pd.phone}">
            <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
                <path d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <p>{pd.phone}</p>
        </a>
    {/if}

    {#if pd.email}
        <a class="contact" href="mailto:{pd.email}">
            <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
                <path d="M7 9L12 12.5L17 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="currentColor" stroke-width="1.5"></path>
            </svg>
            <p>{pd.email}</p>
        </a>
    {/if}

    {#if pd.address && pd.address.link}
        <a class="contact" href={pd.address.link} target="_blank">
            <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
                <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="currentColor" stroke-width="1.5"></path>
                <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" fill="#000000" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <p>{pd.address.text}</p>
        </a>
    {:else if pd.address}
        <div class="contact">
             <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
                <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="currentColor" stroke-width="1.5"></path>
                <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" fill="#000000" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <p>{pd.address.text}</p>       
        </div>
    {/if}
</div>

<style>
    .container{
        color: white;
        padding: 35px;
    }

    .head{
        display: flex;
        justify-content: space-between;
    }

    .headLeft{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 50%;
    }

    .headLeft h1{
        font-size: 35px;
    }

    .website{
        font-size: 25px;
    }

    .head img{
        max-width: 50%;
        border-radius: 15px;
    }

    h3{
        text-decoration: underline;
        margin-top: 35px;
    }

    .description{
        margin-top: 35px;
    }

    .description p{
        margin: 15px 0;
    }

    .day{
        width: 100px;
    }

    .dash{
        width: 50px;
        text-align: center;
    }

    .links{
        display: flex;
        flex-direction: column;
        font-size: 28px;
        margin-top: 35px;
    }

    .contact{
        display: flex;
        align-items: center;
        max-width: 750px;
        margin-top: 10px;
    }

    .contact svg{
        color: red;
        margin-right: 25px;
        width: 35px;
        height: 35px;
    }

    .contact p{
        color: white;
    }

    @media screen and (max-width: 800px){
        .head{
            flex-direction: column;
            align-items: center;
        }

        .headLeft{
            width: 100%;
            text-align: center;
        }

        .headLeft h2{
            font-size: 18px;
        }

        .head img{
            max-width: 75%;
            max-height: 250px;
            margin-top: 25px;
        }

        .website{
            font-size: 16px;
        }
    }
</style>

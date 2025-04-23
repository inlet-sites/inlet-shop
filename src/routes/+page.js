export const load = async ({fetch})=>{
    const vendors = await fetch(`${import.meta.env.VITE_API_URL}/vendor`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return {
        vendors: await vendors.json()
    };
}

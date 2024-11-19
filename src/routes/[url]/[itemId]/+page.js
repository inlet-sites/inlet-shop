export const load = async ({fetch, params})=>{
    const promises = [];
    promises.push(fetch(`${import.meta.env.VITE_API_URL}/product/${params.itemId}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    }));

    promises.push(fetch(`${import.meta.env.VITE_API_URL}/vendor/${params.url}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    }));

    const response = await Promise.all(promises);

    response[0] = response[0].json();
    response[1] = response[1].json();

    const result = await Promise.all(response);
    
    return {
        product: result[0],
        vendor: result[1]
    };
}

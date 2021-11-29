
 export const myFetch = async (url, options = null) => {
    let response;

    try {
        if(!options) {
            response = await fetch(url);
        } else {
            response = await fetch(url, options);
        }
        //console.log(response);

        const result = await response.json();
        result.response = {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText
        }
        return result;    
    }
    catch(err) {
        console.error(`myFetch Error: ${err}`)
    }
}
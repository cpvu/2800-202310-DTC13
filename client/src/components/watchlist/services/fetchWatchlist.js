// APi service to retrieve user's watchlist
export default async function fetchWatchlist(_id) {
    console.log(_id)
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({_id: _id}),
        credentials:"include"
    }

    try {
        const userWatchlist = await fetch(baseURL + "/api/getWatchlist", options);
        const userWatchlistJSON = await userWatchlist.json()

        return userWatchlistJSON;
    } catch (err) {
        console.log(err);
    }

}
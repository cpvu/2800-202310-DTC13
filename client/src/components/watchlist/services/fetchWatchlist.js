export default async function fetchWatchlist() {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
    const options = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
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
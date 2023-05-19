export default async function fetchCoinInformation() {
    try {
        const options = {
            "method": "GET", 
            "Content-header": "application/json"
        }

        const baseURL = process.env.NEXT_PUBLIC_CLIENT_BASE_URL;
        const endpoint = 

        let coinInformation = await fetch()
    } catch (e) {
        console.log("Error fetching coin information");
        console.log(e); 
    }
}
import { COIN_INFORMATION } from "@/constants/endpoints";

export default async function fetchCoinInformation(coin) {
    try {

        const payload = {
            "coin": coin
        }

        const options = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",   
            },
            body: JSON.stringify(payload),
        }

        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const endpoint = COIN_INFORMATION;

        let response = await fetch(baseURL + endpoint, options);

        return response.json();

    } catch (e) {
        console.log("Error fetching coin information");
        console.log(e); 
    }
}
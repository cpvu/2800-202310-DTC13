export default async function fetchCoinPrice(symbol) {
    const options = {
        "method": "GET", 
        "Content-header": "application/json"
    }
    try {
        let response = await fetch(`https://api.binance.com/api/v1/ticker/24hr?symbol=${symbol}`, options);
        return response.json();
    } catch (e) {
        console.log(e)
    }
}
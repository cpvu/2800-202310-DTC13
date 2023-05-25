export default async function fetchCoinNews(coin) {
    const options = {
        "method": "GET", 
        "Content-header": "application/json"
    }
    try {
        let response = await fetch(`https://newsdata.io/api/1/news?apikey=pub_22499c45bb1fac4bfbd4adfb4a135e94affbe&qInTitle=${coin}&language=en`, options);
        let responseJSON = await response.json();
        
        return responseJSON.results;
    } catch (e) {
        console.log(e)
    }
}
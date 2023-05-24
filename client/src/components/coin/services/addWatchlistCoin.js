import { ADD_WATCHLIST_COIN } from "@/constants/endpoints";

export default async function addWatchlistCoin(userCoinData) {
  try {
    const {name, symbol, amount, averagePrice} = userCoinData;

    const payload = {
      name: name,
      symbol: symbol,
      amount: amount,
      averagePrice: averagePrice
    }

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    };

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const endpoint = ADD_WATCHLIST_COIN;

    const response = await fetch(baseURL + endpoint, options)
    console.log(response)

  } catch (e) {
    console.log(e);
  }
}

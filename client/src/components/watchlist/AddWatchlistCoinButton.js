import { Button } from "@chakra-ui/react"
import addWatchlistCoin from "../coin/services/addWatchlistCoin"
import { useRouter } from "next/router";



export default function AddWatchlistCoinButton() {
    const router = useRouter();
    
    async function handleClick() {

        const {coin, symbol} = router.query;

        const coinData = {
            name: coin.toString(),
            symbol: symbol,
            amount: 0,
            averagePrice: 0,
        }

        await addWatchlistCoin(coinData);

        console.log("Added");
        return;
    

    }

    return(
        <Button my={"10px"} onClick={() => handleClick()}> Add Watchlist</Button>
    )
}
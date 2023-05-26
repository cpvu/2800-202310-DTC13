import { Button, useToast } from "@chakra-ui/react"
import addWatchlistCoin from "../coin/services/addWatchlistCoin"
import { useRouter } from "next/router";



export default function AddWatchlistCoinButton() {
    const router = useRouter();
    const toast = useToast();
    
    async function handleClick() {

        const {coin, symbol} = router.query;

        const coinData = {
            name: coin.toString(),
            symbol: symbol,
            amount: 0,
            averagePrice: 0,
        }

        let response = await addWatchlistCoin(coinData);

        if (response.success) {
            toast({
                title: "Success",
                description: `Added ${coin} to your watchlist`,
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
        } else {
            toast({
                title: "Error adding",
                description: `${coin} already exists in your watchlist`,
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
          
        }
        return;
    }

    return(
        <Button my={"10px"} onClick={() => handleClick()}> Add Watchlist</Button>
    )
}
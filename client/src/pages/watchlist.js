import fetchWatchlist from "@/components/watchlist/services/fetchWatchlist";
import fetchCoinPrice from "@/components/coin/services/fetchCoinPrice";
import { useState } from "react";
import { useEffect } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Image,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import handleColorChange from "@/utils/handleColorChange";

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState(false);
    const [userCoins, setUserCoins] = useState({});
    const [priceChangeColor, setPriceChangeColor] = useState(""); 
    let [colorMap] = useState({});

    useEffect(() => {
        const fetchWatchlistData = async () => {
          try {
            const response = await fetchWatchlist();
            const watchlistData = response.collection;
            setWatchlist(watchlistData);
      
            const fetchInitialPrices = watchlistData.map(coin => fetchCoinPrice(coin.symbol));
            const initialPrices = await Promise.all(fetchInitialPrices);
      
            const updatedUserCoins = {};
            initialPrices.forEach((data, index) => {
              const coin = watchlistData[index];
              updatedUserCoins[coin.symbol] = data.lastPrice;
              updatedUserCoins[`${coin.symbol}Change`] = data.priceChange;
              updatedUserCoins[`${coin.symbol}PercentChange`] = data.priceChangePercent;

              if (parseFloat(data.priceChange) < 0) {
                colorMap[[`${coin.symbol}Color`]] = "red"
              } else {
                colorMap[[`${coin.symbol}Color`]] = "green"
              }

            });
      
            setUserCoins(prevUserCoins => ({ ...prevUserCoins, ...updatedUserCoins }));
      
          } catch (e) {
            console.log(e);
          }
        };
      
        fetchWatchlistData();
      
      }, []);
      
      useEffect(() => {
        const interval = setInterval(async () => {
          try {
            if (watchlist) {
              const fetchUpdatedPrices = watchlist.map(coin => fetchCoinPrice(coin.symbol));
              const updatedPrices = await Promise.all(fetchUpdatedPrices);

              const updatedUserCoins = {};
              updatedPrices.forEach((data, index) => {
                const coin = watchlist[index];
                updatedUserCoins[`${coin.symbol}Color`] = handleColorChange(userCoins[coin.symbol], data.lastPrice)
                updatedUserCoins[coin.symbol] = data.lastPrice;
                updatedUserCoins[`${coin.symbol}Change`] = data.priceChange;
                updatedUserCoins[`${coin.symbol}PercentChange`] = data.priceChangePercent;
              });

              setUserCoins(prevUserCoins => ({ ...prevUserCoins, ...updatedUserCoins }));
            }
          } catch (e) {
            console.log(e);
          }
        }, 300);
      
        return () => clearInterval(interval);
      }, [watchlist]);
      

    return (
        <>
            <TableContainer>
                <Table align={"center"} minW={"60%"} maxW={"60%"} my={"auto"}>
                    <Thead>
                        <Tr>
                            {["Logo", "Name", "Symbol", "Price", "24h Price Change", "24h Price % Change", "Average Price"].map(heading => {
                                return (<Th key={heading}>{heading}</Th>)
                            })}

                        </Tr>
                    </Thead>
                    <Tbody>

                        {watchlist ? watchlist.map((coin, index) => {
                            return (<Tr key={index}>
                                <Td m={"0"} p={"0"} w="5%" align="center"><Image mx={"auto"}  w={"50%"} src={`./${coin.name}.png`}></Image></Td>
                                <Td>{coin.name}</Td>
                                <Td>{coin.symbol}</Td>
                                <Td >{userCoins[coin.symbol]}</Td>
                                <Td color={colorMap[`${coin.symbol}Color`]} >{userCoins[`${coin.symbol}Change`]}</Td>
                                <Td color={colorMap[`${coin.symbol}Color`]}>{userCoins[`${coin.symbol}PercentChange`]}</Td>
                                <Td>{coin.averagePrice}</Td>
                            </Tr>)
                        }) : <Tr></Tr>}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

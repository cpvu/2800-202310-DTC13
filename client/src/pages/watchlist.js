import fetchWatchlist from "@/components/watchlist/services/fetchWatchlist";
import fetchCoinPrice from "@/components/coin/services/fetchCoinPrice";
import { useState } from "react";
import { useEffect } from "react";
import { useSession, getSession } from "next-auth/react"
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Image,
    Tr,
    Th,
    Box,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import handleColorChange from "@/utils/handleColorChange";
import roundPrice from "@/utils/roundPrice";

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState(false);
    const [userCoins, setUserCoins] = useState({});
    const [priceChangeColor, setPriceChangeColor] = useState("");
    let [colorMap] = useState({});
    const { data: session } = useSession();

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
                    updatedUserCoins[coin.symbol] = roundPrice(data.lastPrice);
                    updatedUserCoins[`${coin.symbol}Change`] = parseFloat(roundPrice(data.priceChange)).toFixed(2);
                    updatedUserCoins[`${coin.symbol}PercentChange`] = parseFloat(roundPrice(data.priceChangePercent)).toFixed(2);

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
                        updatedUserCoins[coin.symbol] = roundPrice(data.lastPrice);
                        updatedUserCoins[`${coin.symbol}Change`] = parseFloat(roundPrice(data.priceChange)).toFixed(2);
                        updatedUserCoins[`${coin.symbol}PercentChange`] = parseFloat(roundPrice(data.priceChangePercent)).toFixed(2);
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
        <>            <Heading align="center" p={"20px"}>My Watchlist</Heading>
            <TableContainer w={{ xs: "100%", lg: "100%" }} fontSize={{ xs: "12px", lg: "14px" }}>
                <Table align="center" w={"20%"} minW={{ xs: "60%", lg: "60%" }} maxW={{ xs: "60%", lg: "60%" }} my="auto">
                    <Thead>
                        <Tr>
                            {["Coin", "Symbol", "Price($)", "24h Change", "24h % Change", "Average Price"].map(heading => (
                                <Box
                                    as={Th}
                                    key={heading}
                                    textAlign="center"
                                    m={{ xs: "0", lg: "0" }}
                                    p={{ xs: "11px", lg: "25px", }}
                                    w={{ xs: "20%", lg: "10%", }}
                                    fontSize={{ xs: "9px", lg: "14px" }}
                                >
                                    {heading}
                                </Box>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {watchlist ? (
                            watchlist.map((coin, index) => (
                                <Tr key={index}>

                                    <Box as={Td} textAlign={"center"} m={{ xs: "0", lg: "0" }} px={{ xs: "8px", lg: "10px" }} py={{ xs: "45px", lg: "60px" }}>
                                        <Image mx="auto" py={"10px"} w={{ xs: "60%", lg: "25%" }} src={`./${coin.name}.png`} />
                                        {coin.name}
                                    </Box>
                                    <Box as={Td} textAlign={"center"} m={{ xs: "0", lg: "0" }} p={{ xs: "6px", lg: "10px" }}>
                                        {coin.symbol}
                                    </Box>
                                    <Box as={Td} textAlign={"center"} m={{ xs: "0", lg: "0" }} p={{ xs: "5px", lg: "10px" }}>
                                        {userCoins[coin.symbol]}
                                    </Box>
                                    <Box
                                        as={Td}
                                        textAlign={"center"}
                                        m={{ xs: "0px", lg: "0" }}
                                        p={{ xs: "0px", lg: "1px" }}
                                        color={colorMap[`${coin.symbol}Color`]}
                                    >
                                        {userCoins[`${coin.symbol}Change`]}
                                    </Box>
                                    <Box
                                        textAlign={"center"}
                                        as={Td}
                                        m={{ xs: "0", lg: "0" }}
                                        p={{ xs: "0px", lg: "1px" }}
                                        color={colorMap[`${coin.symbol}Color`]}
                                    >
                                        {userCoins[`${coin.symbol}PercentChange`]}%
                                    </Box>
                                    <Box as={Td} textAlign={"center"} m={{ xs: "0", lg: "0" }} p={{ xs: "1px", lg: "1px" }}>
                                        {coin.averagePrice}
                                    </Box>
                                </Tr>
                            ))
                        ) : (
                            <Tr></Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>

        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
      props: {
        session: session,
      },
    };
  }
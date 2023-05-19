import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TokenPageDivider from "@/components/coin/TokenPageDivider";
import CoinPrice from "@/components/coin/CoinPrice";
import fetchCoinPrice from "@/components/coin/services/fetchCoinPrice";
import CoinDescription from "@/components/coin/CoinDescription";
import {
  Container,
  Heading,
  HStack,
  Box,
  Text
} from "@chakra-ui/react";

export default function CryptocurrencyCoinPage({coin, symbol, initialPrice, volume }) {
  const { data: session } = useSession();
  const [price, setPrice] = useState(initialPrice);

  //Update coin price dynamically at an interval of 1s
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        let updatedPrice = await fetchCoinPrice(symbol);

        if (updatedPrice.lastPrice > 1) {
          updatedPrice = (Math.floor(updatedPrice.lastPrice * 100) / 100).toFixed(2);
        } else {
          updatedPrice = updatedPrice.lastPrice
        }

        setPrice(updatedPrice);
      } catch (e) {
        console.log(e)
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [price]);

  return (
    <>
      {session ?
        <Container
          border={"1px"}
          borderColor={"gray.300"}
          mx={"auto"}
          mt={"60px"}
          minH={"100%"}
          width={"85%"}
          maxW={"85%"}
          boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}
        >
          <HStack
            border={"1px"}
            borderColor={"gray.300"}
            width={"100%"}
            maxWidth={"100%"}
            my={"25px"}
            p={"20px"}
            overflow={"hidden"}
          >
            <Box>{session ? <Heading>{coin}</Heading> : <p></p>}</Box>
            <TokenPageDivider />
            <CoinPrice price={price}></CoinPrice>
            <TokenPageDivider />
            <Box minH={"100%"} display={"flex"} flexDirection={"column"}>
              <Box display={"flex"} flexDirection={"row"}>
                <Heading py={"3px"} size={"md"}>Symbol:</Heading>
                <Text py={"4px"} mx={"5px"}>{symbol}</Text>
              </Box>
              <Box display={"flex"} flexDirection={"row"}>
                <Heading py={"3px"} size={"md"}>Volume:</Heading>
                <Text py={"4px"} mx={"5px"}>{volume}</Text>
              </Box>
            </Box>
            <TokenPageDivider />
          </HStack>
          <Box p={"20px"}>
            <CoinDescription></CoinDescription>
          </Box>
        </Container>
        : <h1>Unauthorized</h1>}
    </>
  );

}


export async function getServerSideProps(context) {

  const { coin, symbol } = context.query;

  if (!coin || !symbol) {
    return { notFound: true };
  }

  try {
    let price = await fetchCoinPrice(symbol);
    let coinInformation = await fetchCoinInformation(symbol)
    console.log(symbol)
  
    const volume = (Math.floor(price.volume * 100) / 100).toFixed(2)
    let lastPrice = price.lastPrice

    if (price.lastPrice > 1) {
      lastPrice = (Math.floor(price.lastPrice * 100) / 100).toFixed(2)
    }

    return {
      props: {
        initialPrice: lastPrice,
        coin: coin,
        symbol: symbol,
        volume: volume
      }
    }

  } catch (e) {
    return { notFound: true };
  }
}

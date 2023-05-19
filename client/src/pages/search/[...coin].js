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
  Text,
  Flex,
  useMediaQuery,
  Stack
} from "@chakra-ui/react";
import fetchCoinInformation from "@/components/coin/services/fetchCoinInformation";

export default function CryptocurrencyCoinPage({ coin, symbol, initialPrice, volume, description }) {
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
          mt={"50px"}
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
            mt={"25px"}
            mb={"10px"}
            p={"20px"}
            overflow={"hidden"}
          >
            <Box><Heading size={{ base: "lg", lg: "xl" }}>{coin}</Heading></Box>
            <TokenPageDivider></TokenPageDivider>
            <Flex w={{ xs: "10%", lg: "100%" }} justify={{ xs: "left", lg: "right" }}><CoinPrice price={price}></CoinPrice></Flex>
          </HStack>

          <Stack
            direction={{ base: "column", lg: "row" }}
            mb={"25px"}
            mx={"auto"}
            overflow={"hidden"}
            px={{ base: "5px", lg: "15px" }}>
      
            <Box display={"flex"} flexDirection={"row"}>
              <Heading py={"3px"} size={{ xs: "xs", lg: "sm" }}>Symbol:</Heading>
              <Text py={"4px"} mx={"5px"} fontSize={{ xs: "xs", lg: "0.8em" }}>{symbol}</Text>
            </Box>
            <Box display={"flex"} flexDirection={"row"}>
              <Heading py={"3px"} size={{ xs: "xs", lg: "sm" }}>Volume:</Heading>
              <Text fontSize={{ xs: "xs", lg: "0.8em" }} py={"4px"} mx={"5px"}>{volume}</Text>
            </Box>
            <Box display={"flex"} flexDirection={"row"}>
              <Heading py={"3px"} size={{ xs: "xs", lg: "sm" }}>Sentiment</Heading>
              <Text fontSize={{ xs: "xs", lg: "0.8em" }} py={"4px"} mx={"5px"}>{description.currentSentiment}</Text>
            </Box>
          </Stack>
          <Box p={"20px"}>
            <CoinDescription description={description}></CoinDescription>
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
    let coinDescription = await fetchCoinInformation(coin);

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
        volume: volume,
        description: coinDescription
      }
    }

  } catch (e) {
    return { notFound: true };
  }
}

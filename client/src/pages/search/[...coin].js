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
  Stack
} from "@chakra-ui/react";
import fetchCoinInformation from "@/components/coin/services/fetchCoinInformation";

export default function CryptocurrencyCoinPage({ coin, symbol, description }) {
  const { data: session } = useSession();
  const [price, setPrice] = useState("0");
  const [volume, setVolume] = useState("0");

  function roundPrice(price) {
    let roundedPrice = price;

    if (price > 1) {
      roundedPrice = (Math.floor(price * 100) / 100).toFixed(2);
    } 

    return roundedPrice;
  }

  useEffect(() => {
    fetchCoinPrice(symbol).then(data => {
      setVolume(data.volume);
      setPrice(roundPrice(data.lastPrice));
    }).catch(e => console.log(e));

  }, [])

  //Update coin price dynamically at an interval of 1s
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        let updatedPrice = await fetchCoinPrice(symbol);
        let newPrice = roundPrice(updatedPrice.lastPrice)
        setPrice(newPrice);

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

  const news = await fetch("https://newsdata.io/api/1/news?apikey=pub_22499c45bb1fac4bfbd4adfb4a135e94affbe&qInTitle=ethereum&language=en")
  const newsJSON = await news.json()
  console.log(newsJSON.results.slice(0, 5));

  try {
    let coinDescription = await fetchCoinInformation(coin);

    return {
      props: {
        coin: coin,
        symbol: symbol,
        description: coinDescription
      }
    }

  } catch (e) {
    console.log(e)
    return { notFound: true };
  }
}

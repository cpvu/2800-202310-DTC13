import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CoinNews from "@/components/coin/CoinNews";
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
  Stack,
  Image,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import fetchCoinInformation from "@/components/coin/services/fetchCoinInformation";
import fetchCoinNews from "@/components/coin/services/fetchCoinNews";
import CustomStatLabel from "@/components/common/CustomStatLabel";


export default function CryptocurrencyCoinPage({ news, coin, symbol, description }) {
  const { data: session } = useSession();

  const [price, setPrice] = useState("0");
  const [volume, setVolume] = useState("0");
  const [hourHigh, setHourHigh] = useState("0");
  const [hourLow, setHourLow] = useState("0");
  const [imageUrl, setImageURL] = useState("");

  useEffect(() => {
    fetchCoinPrice(symbol).then(data => {
      setImageURL(`/${coin}.png`);
      setVolume(data.volume);
      setHourHigh(roundPrice(data.highPrice));
      setHourLow(roundPrice(data.lowPrice));
      setPrice(roundPrice(data.lastPrice));
    }).catch(e => console.log(e));

  }, [])

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

  function roundPrice(price) {
    let roundedPrice = price;

    if (price > 1) {
      roundedPrice = (Math.floor(price * 100) / 100).toFixed(2);
    }
    return roundedPrice;
  }

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
            p={"15px"}
            overflow={"hidden"}
          >
            <Image w={{ xs: "11%", lg: "3%" }} src={imageUrl} alt={coin} ></Image>
            <Box><Heading size={{ base: "lg", lg: "xl" }}>{coin}</Heading></Box>
            <TokenPageDivider></TokenPageDivider>
            <Flex w={{ xs: "10%", lg: "100%" }} justify={{ xs: "left", lg: "right" }}><CoinPrice price={price}></CoinPrice></Flex>
          </HStack>

          <Stack direction={{ xs: "column", lg: "row" }} mx={{ xs: "11px", lg: "15px" }}>
            <Stat >
              <CustomStatLabel text={"24h Change"}></CustomStatLabel>
              <StatNumber fontSize={"0.85em"}> <StatArrow type='increase' />DOGEUSDT (23.36%)</StatNumber>
            </Stat>
            <Stat>
              <CustomStatLabel text={"Volume"}></CustomStatLabel>
              <StatNumber fontSize={"0.85em"}>{volume}</StatNumber>
            </Stat>
            <Stat>
              <CustomStatLabel text={"Sentiment"}></CustomStatLabel>
              <StatNumber fontSize={"0.85em"}>{description.currentSentiment}</StatNumber>
            </Stat>
            <Stat>
              <CustomStatLabel text={"24 Hour Low"}></CustomStatLabel>
              <StatNumber fontSize={"0.85em"}>{hourLow}</StatNumber>
            </Stat>
            <Stat>
              <CustomStatLabel text={"24 Hour High"}></CustomStatLabel>
              <StatNumber fontSize={"0.85em"}>{hourHigh}</StatNumber>
            </Stat>
          </Stack>
          <Box p={"20px"}>
            <CoinDescription description={description}></CoinDescription>
          </Box>

          <CoinNews news={news}></CoinNews>

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

    let [coinDescription, coinNews] = await Promise.all([
      fetchCoinInformation(coin),
      fetchCoinNews(coin)
    ]);

    return {
      props: {
        coin: coin,
        symbol: symbol,
        description: coinDescription,
        news: coinNews
      }
    }

  } catch (e) {
    console.log(e)
    return { notFound: true };
  }
}

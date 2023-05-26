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
  SimpleGrid,
  Flex,
  Stack,
  Wrap,
  Image,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Button,
} from "@chakra-ui/react";
import fetchCoinInformation from "@/components/coin/services/fetchCoinInformation";
import fetchCoinNews from "@/components/coin/services/fetchCoinNews";
import CustomStatLabel from "@/components/common/CustomStatLabel";
import AddWatchlistCoinButton from "@/components/watchlist/AddWatchlistCoinButton";
import roundPrice from "@/utils/roundPrice";
import handleColorChange from "@/utils/handleColorChange";

export default function CryptocurrencyCoinPage({
  news,
  coin,
  symbol,
  description,
}) {
  const { data: session } = useSession();

  const [price, setPrice] = useState("0");
  const [volume, setVolume] = useState("0");
  const [hourHigh, setHourHigh] = useState("0");
  const [hourLow, setHourLow] = useState("0");
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [openPrice, setOpenPrice] = useState(0);

  const [imageUrl, setImageURL] = useState("");
  const [priceChangeColor, setPriceChangeColor] = useState("");

  useEffect(() => {
    fetchCoinPrice(symbol)
      .then((data) => {
        setImageURL(`/${coin}.png`);
        setVolume(roundPrice(data.volume));
        setHourHigh(roundPrice(data.highPrice));
        setHourLow(roundPrice(data.lowPrice));
        setPrice(roundPrice(data.lastPrice));
        setPriceChange(roundPrice(parseFloat(data.priceChange).toFixed(2)));
        setPriceChangePercent(parseFloat(data.priceChangePercent).toFixed(2));
        setOpenPrice(roundPrice(data.openPrice));
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        let updatedPrice = await fetchCoinPrice(symbol);

        let newRoundedPrice = roundPrice(updatedPrice.lastPrice);

        setPrice(newRoundedPrice);
        setPriceChangeColor(handleColorChange(price, newRoundedPrice));
        setPriceChange(parseFloat(updatedPrice.priceChange).toFixed(2));
        setPriceChangePercent(parseFloat(roundPrice(updatedPrice.priceChangePercent)).toFixed(2));
      } catch (e) {
        console.log(e);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [price]);

  return (
    <>
      {session ? (
        <Container
          border={"1px"}
          borderColor={"gray.300"}
          mx={"auto"}
          mt={"25px"}
          minH={"100%"}
          width={"90%"}
          maxW={"90%"}
          boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}
        >
          <Flex justifyContent={"right"}>
            <AddWatchlistCoinButton></AddWatchlistCoinButton>
          </Flex>
          <HStack
            border={"1px"}
            borderColor={"gray.300"}
            width={"100%"}
            maxWidth={"100%"}

            mb={"10px"}
            p={"15px"}
            overflow={"hidden"}
          >
            <Image
              w={{ xs: "17%", lg: "4%" }}
              src={imageUrl}
              alt={coin}
            ></Image>
            <Wrap
              mx={"5px"}
              w={{ xs: "40%", lg: "70%" }}
              maxW={{ xs: "40%", lg: "70%" }}
            >
              <Heading size={{ base: "md", lg: "lg" }}>{coin}</Heading>
              <Heading
                margin={"0"}
                fontSize={{ base: "11px" }}
                size={{ lg: "lg" }}
              >
                ({symbol})
              </Heading>
            </Wrap>
            <TokenPageDivider></TokenPageDivider>
            <Flex
              w={{ xs: "45%", lg: "100%" }}
              justify={{ xs: "left", lg: "right" }}
            >
              <CoinPrice color={priceChangeColor} price={price}></CoinPrice>
            </Flex>
          </HStack>

          <SimpleGrid my={"15px"} pl={"35px"} columns={{ xs: 2, lg: 8 }} spacingX='20px' spacingY='15px'>
            <Stat>
              <CustomStatLabel text={"24h Change"}></CustomStatLabel>
              <StatNumber fontSize={"0.85em"} color={priceChangeColor}>
                {priceChange >= 0 ? (
                  <StatArrow type="increase" />
                ) : (
                  <StatArrow type="decrease" />
                )}{" "}
                {priceChange} ({priceChangePercent}%)
              </StatNumber>{" "}
            </Stat>
            <Stat>
              <CustomStatLabel text={"Volume"}></CustomStatLabel>
              <StatNumber fontSize={"0.85em"}>{volume}</StatNumber>
            </Stat>
            <Stat>
              <CustomStatLabel text={"Sentiment"}></CustomStatLabel>
              <StatNumber fontSize={"0.85em"}>
                {description.currentSentiment}
              </StatNumber>
            </Stat>
            <Stat>
              <CustomStatLabel text={"Open Price"}></CustomStatLabel>
              <StatNumber fontSize={"0.85em"}>{openPrice}</StatNumber>
            </Stat>
            <Stat>
              <CustomStatLabel text={"24 Hour Low"}></CustomStatLabel>
              <StatNumber fontSize={"0.85em"}>{hourLow}</StatNumber>
            </Stat>
            <Stat>
              <CustomStatLabel text={"24 Hour High"}></CustomStatLabel>
              <StatNumber fontSize={"0.85em"}>{hourHigh}</StatNumber>
            </Stat>

          </SimpleGrid>

          <Box p={"2px"}>
            <CoinDescription description={description}></CoinDescription>
          </Box>

          <CoinNews news={news}></CoinNews>
        </Container>
      ) : (
        <h1>Unauthorized</h1>
      )}
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
      fetchCoinNews(coin),
    ]);

    if (!coinDescription|| !coinNews) {
      return { notFound: true };
    }
    
    return {
      props: {
        coin: coin,
        symbol: symbol,
        description: coinDescription,
        news: coinNews,
      },
    };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
}

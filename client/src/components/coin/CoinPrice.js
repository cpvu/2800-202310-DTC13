import { Box, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import fetchCoinPrice from "./services/fetchCoinPrice";
import { useRouter } from "next/router";


export default function CoinPrice({ price, color }) {
  return (
    <Box>
      <Heading color={color} mx={"5px"} size={{ xs: "md", lg: "2xl" }}>
        ${price}
      </Heading>
    </Box>
  );
}

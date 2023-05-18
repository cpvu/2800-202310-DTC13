import { Box, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import fetchCoinPrice from "./services/fetchCoinPrice";
import { useRouter } from "next/router";

export default function CoinPrice({price}) {
    return (
        <Box>
            <Heading>{price}</Heading>
        </Box>
    )
}

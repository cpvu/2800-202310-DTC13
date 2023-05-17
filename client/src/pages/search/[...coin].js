import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Stack,
  Container,
  Heading,
  HStack,
  Box,
  Center,
  Divider,
} from "@chakra-ui/react";
import TokenPageDivider from "@/components/coin/TokenPageDivider";

export default function CryptocurrencyCoinPage() {
  const router = useRouter();
  const { data: session } = useSession();

  let { token } = router.query;

  return (
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
        <Box>{session ? <Heading>{token}</Heading> : <p></p>}</Box>
        <TokenPageDivider />
        <Box>{session ? <Heading>Price</Heading> : <p></p>}</Box>
        <TokenPageDivider />
      </HStack>
    </Container>
  );
}

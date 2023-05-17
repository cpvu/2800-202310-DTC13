import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Stack, Container, Heading } from "@chakra-ui/react";

export default function CryptocurrencyCoinPage() {
  const router = useRouter();
  const { data: session } = useSession();

  let { token } = router.query;

  return (
    <Container m={0} p={5}>
      <Stack align={"left"} pt={"10px"}>
        {session ? <Heading>{token}</Heading> : <p></p>}
      </Stack>
    </Container>
  );
}

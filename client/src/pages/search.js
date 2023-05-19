import { useSession, getSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Box,
  Stack,
  Heading,
} from "@chakra-ui/react";
import * as React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { COINS } from "@/constants/coins";

export default function SearchToken() {
  const router = useRouter();
  const { data: session } = useSession();

  async function handleSuggestions(coin) {
    router.push({
      pathname: `/search/${coin}`,
      query: { coin: `${coin}`, symbol: `${COINS[coin]}` },
    });
  }

  return (
    <>
      {session ? (
        <>
          <Box w={"100%"}>
            <Stack align={"center"} mt={{ lg: 300, xs: 100 }}>
              <Heading size="2xl">Welcome {session.user.name}</Heading>
              <Flex pt="2em" justify="center" align="center" w="full">
                <FormControl w="60">
                  <FormLabel>Search a token to get started!</FormLabel>
                  <AutoComplete openOnFocus>
                    <AutoCompleteInput variant="filled" />
                    <AutoCompleteList>
                      {Object.keys(COINS).map((coin, cid) => (
                        <AutoCompleteItem
                          key={`option-${cid}`}
                          value={COINS[coin]}
                          name={COINS[coin]}
                          textTransform="capitalize"
                          onClick={() => handleSuggestions(coin)}
                        >
                          {coin}
                        </AutoCompleteItem>
                      ))}
                    </AutoCompleteList>
                  </AutoComplete>
                  <FormHelperText>
                    Select from the list of suggestions
                  </FormHelperText>
                </FormControl>
              </Flex>
            </Stack>
          </Box>
        </>
      ) : (
        <h1>Sign up or login to get access!</h1>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
}

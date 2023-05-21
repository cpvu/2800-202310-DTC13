import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Box,
  Stack,
  Heading,
  Button,
  useToast
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
  const toast = useToast();
  const { data: session } = useSession();
  const [selectedCoin, setSelectedCoin] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const { success } = router.query;

    if (success === "true" && !authenticated) {
      toast({
        title: "Successfully logged in!",
        description: `Welcome back ${session.user.name}!`,
        position: "top",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
    router.replace("/search");
  }, [])

  async function handleSuggestions(coin) {
    setLoading(true);
    try {
      router.push({
        pathname: `/search/${coin}`,
        query: { coin: coin, symbol: COINS[coin] },
      });
      setSelectedCoin("");
    } catch (error) {
      console.error("Error handling suggestions:", error);
    }
  }

  const handleSubmit = () => {
    if (selectedCoin) {
      handleSuggestions(selectedCoin);
    }
  };

  return (
    <>
      {session ? (
        <>
          <Box w={"100%"}>
            <Stack align={"center"} mt={{ lg: 220, xs: 150 }}>
              <Heading size="2xl">Welcome {session.user.name}</Heading>
              <Flex pt="2em" justify="center" align="center" w="full" flexDirection={"column"}>
                <FormLabel w={"50%"} mt={"px"} textAlign={"center"}>Search a token to generate the latest info with AI!</FormLabel>
                <FormControl w={{ sm: "50%", lg: "35%" }} justify="center" align="center">
                  <AutoComplete openOnFocus>
                    <AutoCompleteInput
                      variant="filled"
                      value={selectedCoin}
                      onChange={(e) => setSelectedCoin(e.target.value)}
                    />
                    <AutoCompleteList>
                      {Object.keys(COINS).map((coin, cid) => (
                        <AutoCompleteItem
                          key={`option-${cid}`}
                          value={COINS[coin]}
                          name={COINS[coin]}
                          textTransform="capitalize"
                          onClick={() => setSelectedCoin(coin)}
                        >
                          {coin}
                        </AutoCompleteItem>
                      ))}
                    </AutoCompleteList>
                  </AutoComplete>
                  <FormHelperText>
                    Select from the list of suggestions
                  </FormHelperText>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={loading}
                    loadingText="Generating"
                    onClick={handleSubmit}
                  >
                    Generate
                  </Button>
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

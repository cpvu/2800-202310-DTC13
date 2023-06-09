import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import * as React from "react";
import { COINS } from "@/constants/coins";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
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


//Client search page
export default function SearchToken() {
  const router = useRouter();
  const toast = useToast(); 
  const { data: session } = useSession(); // Next Auth session state to manage client side user data
  const [selectedCoin, setSelectedCoin] = useState(""); // State to store user's selected coin
  const [loading, setLoading] = useState(false); // State for button loading
  const [authenticated, setAuthenticated] = useState(false)

  //On render, check if the user is newly signed in using URL params and if so it will display a welcome pop up
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

  //Handle selecting of coins in search/dropdown
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

  //Handle submit event button to create API requests to retrieve data related to coin
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

              <Flex pt="2em" justify="center" align="center" w="full" flexDirection={"column"}>
                <Heading align={"center"} mb={"20px"} size="2xl">Welcome {session.user.name}</Heading>
                <FormLabel w={"50%"} mt={"5px"} textAlign={"center"}>Search a token to generate the latest info with AI!</FormLabel>
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

//Retrieve data server side to be used by component before rendering
export async function getServerSideProps(context) {
  //Get the current user session and return it as a prop to the component
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
}

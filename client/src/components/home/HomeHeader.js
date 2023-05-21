import { Box, Heading, Text, Button, Container } from "@chakra-ui/react";
import SnakeMiniGame from "../home/SnakeMiniGame";
import { useEffect, useState } from "react";

export default function HomeHeader() {
  const [easterEggCount, setEasterEggCount] = useState(0);
  let clickTimeout;

  useEffect(() => {
    if (easterEggCount === 5) {
      SnakeMiniGame();
    }
  }, [easterEggCount]);

  const handleTextClick = () => {
    clearTimeout(clickTimeout);
    setEasterEggCount(easterEggCount + 1);

    clickTimeout = setTimeout(() => {
      setEasterEggCount(0);
    }, 3000);
  };

  return (
    <Box
      maxW="32rem"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignSelf={"center"}
      paddingLeft={"auto"}
      paddingRight={"auto"}
      my={100}
      boxShadow="rgba(0, 0, 0, 0.4) 0px 1px 8px"
    >
      <Container p={10} textAlign={"center"}>
        <Heading onClick={handleTextClick} fontSize={{ sm: "4xl", md: "7xl" }} mb={4}>
          Cryptoment AI
        </Heading>
        <Text fontSize="xl">Innovate your crypto learning and trading</Text>
        <Button
          size="lg"
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          mt="24px"
        >
          Create a free account
        </Button>
      </Container>
    </Box>
  );
}

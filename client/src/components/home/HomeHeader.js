import { Box, Heading, Text, Button, Container, Link } from "@chakra-ui/react";
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
      width={{xs:"85%", lg:"60%"}}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignSelf={"center"}
      my={100}
      boxShadow="rgba(0, 0, 0, 0.4) 0px 1px 8px"
    >
      <Container minW={{xs:"85%", lg:"60%"}} p={"40px"} textAlign={"center"}>
        <Heading onClick={handleTextClick} fontSize={{ xs: "3xl", lg: "7xl" }} mb={4}>
          Cryptoment AI
        </Heading>
        <Text fontSize="xl">Innovate your crypto learning and trading</Text>
        <Link href="/signup">
          <Button
            size="lg"
            bg={"teal.500"}
            color={"white"}
            _hover={{
              bg: "teal.600",
            }}
            mt="24px"
          >
            Create a free account
          </Button>
        </Link>
      </Container>
    </Box>
  );
}

import { Box, Heading, Text, Button, Container, Link, Image, Center } from "@chakra-ui/react";
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
      width={{ xs: "85%", lg: "50%" }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignSelf="center"
      my={20} 
      boxShadow="rgba(0, 0, 0, 0.4) 0px 1px 8px"
      borderRadius="md" 
      bgGradient="linear(to-r, teal.400, gray.400)"
      p={{ xs: 4, lg: 8 }} 
      textAlign="center"
    >
      <Container maxW="container.md">
        <Heading
          onClick={handleTextClick}
          fontSize={{ xs: "4xl", lg: "6xl" }} 
          mb={2} 
          color="white" 
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
        >
          Cryptoment AI
        </Heading>
        <Text fontSize="xl" color="white">Innovate your crypto learning and trading</Text>
        <Center>
        <Image my={"25px"} align={"center"} w="250px" src="https://media.tenor.com/oWUNWLVAPw4AAAAd/bogdanoff-he-sold.gif"></Image>
        </Center>
        <Link href="/signup">
          <Button
            size="lg"
            bg="white"
            color="teal.400" 
            _hover={{
              bg: "teal.700",
            }}
          >
            Create a free account
          </Button>
        </Link>
      </Container>
    </Box>
  );
}

import { Box, Heading, Text, Button, Container } from "@chakra-ui/react";
import SnakeMiniGame from "../home/SnakeMiniGame";
import { useEffect, useState } from "react";
import { buttonGroupStyles, containerStyles } from "@/styles/styles";

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
      
      <Container p={10} textAlign={"center"} style={containerStyles}>
        <Heading onClick={handleTextClick} fontSize={{ sm: "4xl", md: "7xl" }} mb={4}>
          CryptomentAI
        </Heading>
        <Text fontSize="xl">Innovate your crypto learning and trading</Text>
        <img src="https://penntoday.upenn.edu/sites/default/files/2022-01/cryptocurrency-main.jpg"></img>
        <Button style={buttonGroupStyles}
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

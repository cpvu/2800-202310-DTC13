import { Box, Heading, Text, Button, Container } from "@chakra-ui/react";

export default function HomeHeader() {
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
        <Heading fontSize={{ sm: "4xl", md: "7xl" }} mb={4}>
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

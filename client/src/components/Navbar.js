import {
  Link,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Navbar() {
  const isDesktop = useBreakpointValue({ md: false, xl: true });
  return (
    <Container
      py={{ sm: "1", base: "2", lg: "5" }}
      bg={useColorModeValue("gray.300", "gray.500")}
      minW={"100vw"}
      position={isDesktop ? "static" : "sticky"}
      bottom={isDesktop ? "auto" : "0"}
      zIndex={10}
    >
      <HStack spacing="11" justify="space-between">
        <Flex justify="space-between" flex="1">
          <ButtonGroup
            variant="link"
            spacing="10"
            justifyContent={"center"}
            py={{ base: "5", lg: "0" }}
          >
            {["Watchlist", "Search", "FAQ", "Settings"].map((item) => (
              <Button key={item}>{item}</Button>
            ))}
          </ButtonGroup>
        </Flex>

        {isDesktop ? (
          <Link href="./signup">
            <Button>Signup</Button>
          </Link>
        ) : null}

        {isDesktop ? (
          <Link href="./login">
            <Button>Login</Button>
          </Link>
        ) : null}
      </HStack>
    </Container>
  );
}

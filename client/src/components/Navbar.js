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

  const navigationButtons = [{ name: "Watchlist", route: "/" }, { name: "Search", route: "/searchcoin" }, { name: "FAQ", route: "/" }, { name: "Settings", route: "/" }]

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
            {navigationButtons.map((item, index) => (
              <Link key={index} href={item.route}><Button key={index}>{item.name}</Button></Link>
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

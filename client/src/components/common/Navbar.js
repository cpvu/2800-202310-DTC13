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

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const isDesktop = useBreakpointValue({ sm: false, xl: true });
  const { data: session, status } = useSession();

  const navigationButtons = [
    { name: "Watchlist", route: "/" },
    { name: "Search", route: "/search" },
    { name: "FAQ", route: "/" },
    { name: "Settings", route: "/" },
  ];

  return (
    <Container
      py={{ sm: "1", base: "1", lg: "2" }}
      bg={useColorModeValue("gray.300", "gray.500")}
      minW={"100%"}
      position={isDesktop ? "static" : "fixed"}
      bottom={isDesktop ? "auto" : "0"}
      zIndex={10}
      minH={"60px"}
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
              <Link key={index} href={item.route}>
                <Button key={index}>{item.name}</Button>
              </Link>
            ))}

            <Button visibility={"hidden"}></Button>
          </ButtonGroup>
        </Flex>

        <Button visibility={"hidden"}></Button>
        {isDesktop && status != "authenticated" && (
          <Link href="/signup">
            <Button>Signup</Button>
          </Link>
        )}

        {isDesktop && status != "authenticated" ? (
          <Link href="/login">
            <Button py={{ sm: "1", base: "1", lg: "2" }}>Login</Button>
          </Link>
        ) : null}

        {isDesktop && status == "authenticated" && (
          <LogoutButton py={{ sm: "1", base: "1", lg: "2" }}></LogoutButton>
        )}
      </HStack>
    </Container>
  );
}

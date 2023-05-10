import {
  Box,
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
  const isDesktop = useBreakpointValue({ base: true, lg: false });
  return (
    <Container
      py={{ sm: "1", base: "2", lg: "5" }}
      bg={useColorModeValue("gray.300", "gray.500")}
      minW={"100vw"}
      position={isDesktop ? "sticky" : "static"}
      bottom={isDesktop ? "0" : "auto"}
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
      </HStack>
    </Container>
  );
}

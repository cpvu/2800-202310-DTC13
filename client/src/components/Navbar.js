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

export const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Container
      py={{ sm: "1", base: "2", lg: "5" }}
      bg={useColorModeValue("gray.300", "gray.500")}
      minW={"100vw"}
    >
      <HStack spacing="11" justify="space-between">
        <Flex justify="space-between" flex="1">
          <ButtonGroup
            variant="link"
            spacing="10"
            justifyContent={"center"}
            py={{ base: "6", lg: "0" }}
          >
            {["Watchlist", "Search", "FAQ", "Settings"].map((item) => (
              <Button key={item}>{item}</Button>
            ))}
          </ButtonGroup>
        </Flex>
      </HStack>
    </Container>
  );
};

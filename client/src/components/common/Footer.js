import { Container, Stack, ButtonGroup, IconButton, Text } from "@chakra-ui/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Container as="footer" role="contentinfo" pt={{ base: "12", md: "16" }} pb={{ base: "4", md: "6" }} align="center">
      <Stack spacing={{ base: "4", md: "5" }}>
        <Stack justify="space-between" direction="row" align="center">
          <ButtonGroup variant="ghost">
            <IconButton as="a" href="#" aria-label="LinkedIn" />
            <IconButton as="a" href="#" aria-label="GitHub" />
            <IconButton as="a" href="#" aria-label="Twitter" />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="subtle">
          &copy; {currentYear} by Ankit Ahlwat, Bryan Fung, Calvin Vu, and Michael Yu
        </Text>
      </Stack>
    </Container>
  );
}

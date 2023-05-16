import {
  Container,
  Stack,
  ButtonGroup,
  IconButton,
  Text,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
      <Stack spacing={{ base: "4", md: "5" }}>
        <Stack justify="space-between" direction="row" align="center">
          <ButtonGroup variant="ghost">
            <IconButton as="a" href="#" aria-label="LinkedIn" />
            <IconButton as="a" href="#" aria-label="GitHub" />
            <IconButton as="a" href="#" aria-label="Twitter" />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights
          reserved.
        </Text>
      </Stack>
    </Container>
  );
}

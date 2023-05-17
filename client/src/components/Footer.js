import { Container, Stack, ButtonGroup, IconButton, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [easterEggCount, setEasterEggCount] = useState(0);
  let clickTimeout;

  useEffect(() => {
    if (easterEggCount === 5) {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
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
    <Container as="footer" role="contentinfo" pt={{ base: "12", md: "16" }} pb={{ base: "4", md: "6" }} align="center">
      <Stack spacing={{ base: "4", md: "5" }}>
        <Stack justify="space-between" direction="row" align="center">
          <ButtonGroup variant="ghost">
            <IconButton as="a" href="#" aria-label="LinkedIn" />
            <IconButton as="a" href="#" aria-label="GitHub" />
            <IconButton as="a" href="#" aria-label="Twitter" />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="subtle" onClick={handleTextClick}>
          &copy; {currentYear} by Ankit Ahlwat, Bryan Fung, Calvin Vu, and Micheal Yu
        </Text>
      </Stack>
    </Container>
  );
}

import Navbar from "./Navbar";
import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [isDesktop, setIsDesktop] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Set the desired breakpoint for desktop
    };

    handleResize(); // Set initial value

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isDesktop === null) {
    return null; // Render null or loading state while isDesktop is being determined
  }

  return (
    <>
      <Flex
        minH={"100vh"}
        minW={"100vw"}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        bg={useColorModeValue("white.50", "gray.800")}
      >
        {isDesktop && <Navbar />}
        {children}
        <Container flex={"1"}></Container>
        <Footer></Footer>
      </Flex>
      {!isDesktop && <Navbar />}
    </>
  );
}

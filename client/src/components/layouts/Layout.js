import Navbar from "../common/Navbar";
import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Footer from "../common/Footer";

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

  return (
    <>
      <Flex
        minH={"100vh"}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        bg={useColorModeValue("white.50", "gray.800")}
        justifyContent="center"
        alignItems="center"
      >
        {isDesktop && <Navbar />}
        {children}
        <Container flex={"1"}></Container>
        <div id="root"></div>
        <Footer></Footer>
        {!isDesktop && <Navbar />}
      </Flex>
    </>
  );
}
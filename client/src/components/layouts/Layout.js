import Navbar from "../common/Navbar";
import { Container, Flex, Box, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Footer from "../common/Footer";
import BottomNavbar from "../common/BottomNavbar";

export default function Layout({ children }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [shouldRenderBottomNavbar, setShouldRenderBottomNavbar] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      setIsDesktop(mediaQuery.matches);
      setShouldRenderBottomNavbar(!mediaQuery.matches);
    };

    handleResize(); // Set the initial value

    // Add event listener for resize
    mediaQuery.addEventListener("change", handleResize);

    // Clean up the event listener
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <>
      <Flex
        minW={"100%"} 
        minH={"100vh"}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        p={0}
      >
        {isDesktop && <Navbar />}
        {children}
        <Container id="root" flex={"1"}></Container>
        <Footer></Footer>
        {shouldRenderBottomNavbar && <BottomNavbar />}
      </Flex>
    </>
  );
}
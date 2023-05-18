import Navbar from "../common/Navbar";
import {
  Container,
  Flex,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Footer from "../common/Footer";
import dynamic from "next/dynamic";

const ComponentA = dynamic(() => import("../common/Navbar"));

export default function Layout({ children }) {
  const [isSmallerScreen] = useMediaQuery("(max-width: 48em)");
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
        minW={"100vw"}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        bg={useColorModeValue("white.50", "gray.800")}
      >
        {isSmallerScreen ? (
          <>
            {" "}
            {children}
            <Container flex={"1"}></Container>
            <Footer></Footer>
            {<Navbar />}
          </>
        ) : (
          <>
            {" "}
            {<Navbar />}
            {children}
            <Container flex={"1"}></Container>
            <Footer></Footer>
          </>
        )}
      </Flex>
    </>
  );
}

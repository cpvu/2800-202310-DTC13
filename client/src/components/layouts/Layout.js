import Navbar from "../common/Navbar";
import { Container, Flex, Box, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Footer from "../common/Footer";
import dynamic from "next/dynamic";

const DynamicNavbar = dynamic(() => import("../common/Navbar"), {
  ssr: true,
});

export default function Layout({ children }) {

  const [isDesktop] = useMediaQuery("(min-width: 768px)");

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
        {<DynamicNavbar />}
        {children}
        <Container id ="root" flex={"1"}></Container>
        <Footer></Footer>
      </Flex>
    </>
  );
}
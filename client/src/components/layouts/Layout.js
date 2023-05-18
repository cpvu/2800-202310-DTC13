import Navbar from "../common/Navbar";
import { Container, Flex, Box, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Layout({ children }) {

  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  
  return (
    <>
      <Flex
        minW={"100%"} 
        display="flex"
        flexDirection="column"
        overflow="hidden"
        p={0}
      >
        {isDesktop && <Navbar />}
        {children}
      </Flex>
      {!isDesktop && <Navbar />}
    </>
  );
}
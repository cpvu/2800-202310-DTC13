import Navbar from "./Navbar";
import { Box, Container, useBreakpointValue } from "@chakra-ui/react";

export default function Layout({ children }) {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <>
      {isDesktop ? <Navbar /> : <></>}
      <Container
        minH={"100vh"}
        minW={"100vw"}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        p={0}
      >
        {children}
      </Container>
      {isDesktop ? null : <Navbar></Navbar>}
    </>
  );
}

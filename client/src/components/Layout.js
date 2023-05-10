import Navbar from "./Navbar";
import { Box, useBreakpointValue } from "@chakra-ui/react";

export default function Layout({ children }) {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <>
      <Box
        w={"100%"}
        minH={"100vh"}
        minW={"100vw"}
        display="flex"
        flexDirection="column"
      >
        {isDesktop ? <Navbar /> : <></>}
        {children}
        {isDesktop ? null : <Navbar></Navbar>}
      </Box>
    </>
  );
}

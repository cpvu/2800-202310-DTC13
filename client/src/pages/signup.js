"use client";
import { Navbar } from "@/components/Navbar.js";
import SignUpForm from "../components/SignUpForm.js";
import { Box } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

export default function SignUp() {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Box w={"100%"} maxW={"lg"} minH={"100vh"}>
      {isDesktop ? <Navbar /> : <></>}
      <SignUpForm />
      {isDesktop ? <></> : <Navbar style={"align"}></Navbar>}
    </Box>
  );
}

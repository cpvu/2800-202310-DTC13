import LoginForm from "@/components/LoginForm";
import { Navbar } from "@/components/Navbar";
import { Box, useBreakpointValue } from "@chakra-ui/react";

export default function LoginPage() {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Box
      w={"100%"}
      maxW={"lg"}
      minH={"100vh"}
      display="flex"
      flexDirection="column"
    >
      {isDesktop ? <Navbar /> : <></>}
      <LoginForm></LoginForm>
      {isDesktop ? <></> : <Navbar style={"align"}></Navbar>}
    </Box>
  );
}

import { Navbar, LoginForm } from "@/components";
import { Box, useBreakpointValue } from "@chakra-ui/react";

export default function LoginPage() {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return <LoginForm />;
}

import { Navbar, SignUpForm } from "@/components";
import { Box } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

export default function SignUp() {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return <SignUpForm />;
}

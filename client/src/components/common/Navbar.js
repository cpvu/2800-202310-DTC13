import { useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Stack,
  useBreakpointValue,
  Heading,
  useColorModeValue,
  color,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigationButtons = [
    { name: "Watchlist", route: "/watchlist" },
    { name: "Search", route: "/search" },
    { name: "FAQ", route: "/faq" },
    { name: "Settings", route: "/settings" },
  ];

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const isMobile = useBreakpointValue({ base: true, lg: false });
  const colorScheme = useColorModeValue("gray.300");

  return (
    <Box bgGradient="linear(to-r, teal.400, teal.600)"  py={{ base: 2, lg: 3 }}>
      <Flex alignItems="center">
        <Box mx={"2px"}> 
          <Link href="/">
            <Heading color={"white"}display={"flex"} w={"100%"} mx={"25px"} size="xl">CryptomentAI</Heading>
          </Link>
        </Box>
        {isMobile ? (
          <>
            <Flex w={"100%"} justifyContent={"right"} px={"10px"}>
              <IconButton
                icon={<HamburgerIcon />}
                variant="ghost"
                onClick={handleDrawerOpen}
                aria-label="Open Navigation"
              />
              <Drawer
                isOpen={isDrawerOpen}
                placement="left"
                onClose={handleDrawerClose}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader>
                    <Flex justify="space-between" alignItems="center">
                      <Box>Menu</Box>
                      <IconButton
                        icon={<CloseIcon />}
                        variant="ghost"
                        onClick={handleDrawerClose}
                        aria-label="Close Navigation"
                      />
                    </Flex>
                  </DrawerHeader>
                  <DrawerBody>
                    <Stack spacing={4}>
                      {navigationButtons.map((item, index) => (
                        <Link key={index} href={item.route}>
                          <Button shadow={"lg"} w="100%" onClick={handleDrawerClose} bgColor={"teal.500"} color="white" _hover={{bgColor:"teal.800", color: "white"}}>
                            {item.name}
                          </Button>
                        </Link>
                      ))}
                      <Flex w={"100%"} justifyContent={"right"}>
                        {status === "authenticated" ? (
                          <LogoutButton />
                        ) : (
                          <>
                            <Link href="/signup">
                            <Button mx={"px"} onClick={() => handleDrawerClose()}>Signup</Button>
                            </Link>
                            <Link href="/login">
                            <Button mx={"7px"} onClick={() => handleDrawerClose()}>Login</Button>
                            </Link>
                          </>
                        )}
                      </Flex>
                    </Stack>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Flex>
          </>
        ) : (
          <>
            <Stack direction="row" spacing={4} px={"60px"}>
              {navigationButtons.map((item, index) => (
                <Link key={index} href={item.route}>
                  <Button shadow={"lg"} bgColor={"teal.500"} color="white" _hover={{bgColor:"teal.800", color: "white"}}>{item.name}</Button>
                </Link>
              ))}
              <Spacer />
            </Stack>
            <Flex w={"100%"} justifyContent="flex-end" mx={"15px"} spacing={"40px"}>
              {status === "authenticated" ? (
                <LogoutButton />
              ) : (
                <>
                  <Link href="/signup">
                    <Button mx={"px"}>Signup</Button>
                  </Link>
                  <Link href="/login">
                    <Button mx={"7px"}>Login</Button>
                  </Link>
                </>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  ButtonSpinner,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Router, { useRouter } from "next/router";

import {signIn, getSession} from "next-auth/react"

export default function LoginForm() {
  const router = useRouter();

  const initialValues = {
    username: "",
    password: "",
  };

  async function handleLogin(values, { setSubmitting }) {
    setTimeout(async () => {
      const result = await signIn('credentials', {
        username: values.username,
        password: values.password,
        callbackUrl: '/searchcoin'
      });

      const session = await getSession();

      console.log(session)

      setSubmitting(false);
    }, 1000);
  }

  return (
    <Flex
      py={{ base: "5", md: "auto" }}
      pb={{ md: "150px" }}
      align={"center"}
      justify={"center"}
      flex={"1"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        align={"center"}
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
      >
        <Stack>
          <Heading fontSize={"4xl"}>Log in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"} align={"center"}>
            Not a user? Sign up{" "}
            <Link color={"blue.400"} href="./signup">
              here
            </Link>
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          minW={"20vw"}
          align={"center"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik initialValues={initialValues} onSubmit={handleLogin}>
              {({ isSubmitting, values, handleChange, handleBlur }) => (
                <Form>
                  <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      value={values.username}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color={"blue.400"}>Forgot password?</Link>
                    </Stack>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <ButtonSpinner /> : "Sign In"}
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

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

export default function LoginForm() {
  const router = useRouter();

  const initialValues = {
    username: "",
    password: "",
  };

  async function handleLogin(values, { setSubmitting }) {
    setTimeout(async () => {
      const payload = {
        email: values.username,
        password: values.password,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      try {
        let response = await fetch("http://localhost:8000/api/login", options);
        let responseJSON = await response.json();

        if (responseJSON.authenticated) {
          router.push("/searchcoin");
        }

        console.log(responseJSON);
      } catch (err) {
        console.log(err);
      }

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
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="text"
                      name="email"
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

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

export default function ForgotPasswordForm() {
  const router = useRouter();

  const initialValues = {
    email: ""
  };

  async function handleLogin(values, { setSubmitting }) {
    setTimeout(async () => {

      const payload = {
        email: values.email,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };

      try {
        let response = await fetch("http://localhost:8000/api/forgotPassword", options);
        let responseJSON = await response.json();

        if (responseJSON.authenticated) {
          router.push("/");
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
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Reset your password</Heading>
          <Text fontSize={"md"} color={"gray.600"} align={"center"}>
            Reset your password by entering the email you signed up with.
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
                  <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                    />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >

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
                      {isSubmitting ? <ButtonSpinner /> : "Send my password reset"}
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

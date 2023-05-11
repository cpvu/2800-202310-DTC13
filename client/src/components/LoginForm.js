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
  ButtonSpinner
} from "@chakra-ui/react";
import React, { useRef } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

export default function LoginForm() {

  const initialValues = {
    email: '',
    password: '',
  };

  async function handleLogin(values, { setSubmitting }) {
    setTimeout(() => {
      await fetch("htto")
      setSubmitting(false)
    }, 1000)

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
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          minW={"13vw"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik initialValues={initialValues} onSubmit={handleLogin}>
              {({isSubmitting, values, handleChange, handleBlur}) => (
              <Form>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password}  />
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
                     {isSubmitting ? <ButtonSpinner /> : 'Sign In'}
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

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  FormErrorMessage,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { SignupSchema } from "./SignupSchema";
import { SIGN_UP_ENDPOINT } from "@/constants/endpoints";

export default function SignUpForm() {
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  async function handleSignUp(values, { setSubmitting, setErrors }) {
    setTimeout(async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };

      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

      try {
        let response = await fetch(baseURL + SIGN_UP_ENDPOINT, options);
        let responseJSON = await response.json();

        console.log(responseJSON)

        if (!responseJSON.success) {
          throw new Error(responseJSON.message)
        }

        toast({
          title: "Succesfully signed up! ",
          description: `Redirecting you to the login page`,
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        router.push("/login");

      } catch (err) {
        toast({
          title: "Sign up Error",
          description: `${err}`,
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(err);
      }
    });
    setSubmitting(false);
  }

  return (
    <Flex
      py={{ base: "5", md: "auto" }}
      pb={{ md: "150px" }}
      align={"center"}
      justify={"center"}
      flex={"1"}
    >
      <Stack spacing={4} px={{ base: 4, md: 6 }}>
        <Stack align={"center"} spacing={2}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Get started today!
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          minW={"20vw"}
          w={"100%"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          overflow="hidden"
        >
          <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleSignUp}>
            {({ isSubmitting, values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <FormControl id="username" isRequired isInvalid={!!errors.username && touched.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      value={values.username}
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage fontSize={"0.73em"}>{errors.username}</FormErrorMessage>
                  </FormControl>
                  <FormControl id="firstName" isRequired isInvalid={!!errors.firstName && touched.firstName}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      value={values.firstName}
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage fontSize={"0.73em"}>{errors.firstName}</FormErrorMessage>
                  </FormControl>
                  <FormControl id="lastName" isRequired isInvalid={!!errors.lastName && touched.lastName}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      value={values.lastName}
                      onBlur={handleBlur}

                    />
                    <FormErrorMessage fontSize={"0.73em"}>{errors.lastName}</FormErrorMessage>
                  </FormControl>
                  <FormControl id="email" isRequired isInvalid={!!errors.email && touched.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                      isRequired
                      isInvalid={!!errors.email && touched.email}
                    />
                    <FormErrorMessage fontSize={"0.73em"}>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                    isRequired
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel>Password</FormLabel >
                    <InputGroup>
                      <Input type={showPassword ? "text" : "password"} />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage fontSize={"0.73em"}>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Sign up
                  </Button>
                  <Text align={"center"}>
                    Already a user? <Link color={"blue.400"}>Login</Link>
                  </Text>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}

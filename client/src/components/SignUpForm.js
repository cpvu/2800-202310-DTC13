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
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik,Form, ErrorMessage } from 'formik';
import Router, { useRouter } from "next/router";

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  async function handleLogin(values, { setSubmitting, setErrors }) {

    setTimeout(async () => {
    const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      }

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      };

      try {
        let response = await fetch("http://localhost:8000/api/signup", options);

        let responseJSON = await response.json()

        if (response.status == 200) {
          router.push("/login")
        }
      } catch (err) {
        setErrors({ server: error.message });
        console.log(err)
      }
    })
  
      setSubmitting(false)
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
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik initialValues={initialValues} onSubmit={handleLogin}>
          {({isSubmitting, values, handleChange, handleBlur}) => (
            <Form>
            <Stack spacing={4}>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" name="firstName" onChange={handleChange} value={values.firstName} />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input type="text" name="lastName" onChange={handleChange} value={values.lastName}  />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" onChange={handleChange} value={values.email} />
              </FormControl>
              <FormControl id="password" name="password" onChange={handleChange} value={values.password} isRequired>
                <FormLabel>Password</FormLabel>
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
            </Form>   )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}

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
  FormErrorMessage,
  useToast
} from "@chakra-ui/react";
import { Formik, Form} from "formik";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import { LoginSchema } from "@/validators/loginValidator";

export default function LoginForm() {
  const router = useRouter();
  const toast = useToast();

  const initialValues = {
    username: "",
    password: "",
  };

  async function handleLogin(values, { setSubmitting }) {
    toast({
      title: "Redirecting you to log in...",
      description: `Welcome back ${values.username}!`,
      position: "top",
      status: "loading",
      duration: 1000,
      isClosable: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const baseURL = process.env.NEXT_PUBLIC_CLIENT_BASE_URL;

    try {
      let result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        callbackUrl: baseURL + "/search?success=true",
        redirect: false
      });

      if (result.error) { throw new Error(result.error) }
      
      router.push(baseURL + "/search?success=true");

    } catch (e) {
      console.log(e)

      toast({
        title: "Login error!",
        description: `${e}`,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          minW={"20vw"}
          align={"center"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={LoginSchema}>
              {({ isSubmitting, values, handleChange, handleBlur, errors, touched }) => (
                <Form>
                  <FormControl id="username" isRequired isInvalid={!!errors.username && touched.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      borderColor={"gray.200"}
                      type="text"
                      name="username"
                      onChange={handleChange}
                      value={values.username}
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage fontSize={"0.73em"}>{errors.username}</FormErrorMessage>
                  </FormControl>
                  <FormControl id="password" isRequired isInvalid={!!errors.password && touched.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      borderColor={"gray.200"}
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <FormErrorMessage fontSize={"0.73em"}>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Stack spacing={10} mt={"8px"}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link href="/forgot/password" color={"blue.400"}>
                        Forgot password?
                      </Link>
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

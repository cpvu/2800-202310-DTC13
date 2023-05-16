//import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";

const customTheme = extendTheme({
  breakpoints: {
    xs: "22em",
    sm: "32em",
    md: "48em",
    lg: "62em",
    xl: "80em",
  },
  styles: {
    global: {
      "html, body": {
        overscrollBehavior: "none",
        scrollBehavior: "smooth",
        height: "100%",
        width: "100%",
      },
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={customTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

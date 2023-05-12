//import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react"

const customTheme = extendTheme({
  styles: {
    global: {
      "html, body": {
        overscrollBehavior: "none",
        scrollBehavior: "smooth",
      },
    },
  },
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={customTheme}>
        <Layout>
          <Component {...pageProps}  />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

//import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "../components/Layout";

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

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

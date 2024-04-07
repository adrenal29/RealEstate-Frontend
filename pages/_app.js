import Router from "next/router";
import Head from "next/head";
import nProgress from "nprogress";
import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Layout from "../components/Layout";
import './globals.css'

function MyApp({ Component, pageProps }) {
  const activeChain = 'sepolia'
  return (
    <>
      <Head></Head>
      <ThirdwebProvider 
      activeChain={activeChain}
			clientId="43d05e641f828c1f61261ae42f079e12"
      >
      <ChakraProvider>
       
          <Layout>

            <Component {...pageProps} />

          </Layout>
        
      </ChakraProvider>
      </ThirdwebProvider >
    </>
  );
}

export default MyApp;

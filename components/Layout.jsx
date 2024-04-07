import Head from "next/head";
import { Box } from "@chakra-ui/react";

import Navbar from "./Navbar";

import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Real Estate App</title>
      </Head>
      {/* <div style={{ background: "black", color: "white" }}> */}
        <Box bg={{ base: "white", md: "white", lg: "black" }} color={{ base: "black", md: "black", lg: "black"}}>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </Box>
      {/* </div> */}

    </>
  );
};

export default Layout;

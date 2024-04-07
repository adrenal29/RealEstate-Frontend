import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import Property from "../components/Property";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { GoogleGeminiEffectDemo } from "../components/Macbook"
import { useState, useEffect } from "react";
const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageurl,
}) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      <Image src={imageurl} width={500} height={300} alt="banner" />
      <Box p="5">
        <Text color="gray.500" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {title1}
          <br />
          {title2}
        </Text>
        <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
          {desc1}
          <br />
          {desc2}
        </Text>
        <Button fontSize="xl">
          <Link href={linkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
};

function Home({ propertiesForSale, propertiesForRent }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Call the handleResize function initially and on window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this effect only runs once
  return (
    <div className="bg-black-500 text-white-500">
      <ThirdwebProvider desiredChainId="11155111">

        {isSmallScreen ? null : <GoogleGeminiEffectDemo />}

        <Box>
          <Banner
            purpose="SELL A HOME"
            title1="Sell Homes in decentralized way"
            title2="Everyone"
            desc1="Explore Apartments, Villas, Homes"
            desc2="and more"
            buttonText="Explore our buildings"
            linkName="/search?purpose=for-rent"
            imageurl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
          />
          <div style={{ paddingLeft: "8vw" }}>
            <Flex flexWrap="wrap">
              {propertiesForRent.map((property) => (
                <Property property={property} key={property.id} />
              ))}
            </Flex>
          </div>
          <Banner
            purpose="BUY A HOME"
            title1="Find, Buy & Own Your"
            title2="Dream Home"
            desc1="Explore Apartments, Villas, Homes"
            desc2="and more"
            buttonText="Explore Buying"
            linkName="/search?purpose=for-sale"
            imageurl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
          />
          <div style={{ paddingLeft: "8vw" }}>
            <Flex flexWrap="wrap">
              {propertiesForSale.map((property) => (
                <Property property={property} key={property.id} />
              ))}
            </Flex>
          </div>
        </Box>
      </ThirdwebProvider>
    </div>
  );
}
// api calls
export async function getStaticProps() {
  const propertiesForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );

  const propertiesForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );
  return {
    props: {
      propertiesForSale: propertiesForSale?.hits,
      propertiesForRent: propertiesForRent?.hits,
    },
  };
}

export default Home;

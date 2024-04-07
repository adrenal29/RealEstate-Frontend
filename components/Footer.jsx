import { Box } from "@chakra-ui/layout";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
const Footer = () => {
  const address = useAddress();
  return (
    <Box
      textAlign="center"
      p="5"
      color="gray.600"
      borderTop="1px"
      borderColor="gray.100"
    >
      © 2023 InDeState, Inc.
        {address}
    </Box>
  );
}

export default Footer;

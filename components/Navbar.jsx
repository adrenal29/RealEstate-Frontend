import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import {
  useContract,
  useContractRead,
  useContractWrite,
  useNFTs,
} from "@thirdweb-dev/react";
import {
  Web3Button,
} from "@thirdweb-dev/react";
const Navbar = () => {

  const { contract } = useContract("0x10BD6012Fb68b677773F819526cc8cF253d196fd");
  const { escrow } = useContract("0xE6f8ce9b26C9a4dA1083d82Fec7dbe217D08E5b4");
  const address = useAddress();
  const { mutate: mintNow, isLoading: settingName } = useContractWrite(
    contract,
    "mint",
  );
  const { mutate: approveNow, isLoading: settingName3 } = useContractWrite(
    contract,
    "approve",
  );
  const { mutate: listNow, isLoading: settingName2 } = useContractWrite(
    escrow,
    "list",
  );
  const { data: d, isLoading: s } = useContractRead(
    escrow,
    "isListed",
    { args: [0] }
  );
  const { data: nfts, isLoading, error } = useNFTs(contract, { start: 0, count: 100 });
  const mintNFT = () => {
    mintNow({ args: ["My Prop 1"] })
  }
  const listProperty = () => {
    console.log(settingName2)
    approveNow({ args: ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8", '1'] })
  }
  console.log(nfts)
  console.log(d)
  return (
    <div style={{ color: 'black' }}>
      <Flex p="4" borderBottom="1px" borderColor="gray.100">
        <Box fontSize="3xl" color="blue.400" fontWeight="bold">
          <Link href="/" paddingLeft="2">
            InDeState
          </Link>
        </Box>
        <Spacer />
        <Box fontSize="1xl" color="gray.400" fontWeight="bold" marginEnd="30px" marginTop="5px">
          <Link href="/registerProperty" paddingLeft="2">
            Register Property
          </Link>
        </Box>
        <Box fontSize="1xl" color="gray.400" fontWeight="bold" marginEnd="30px" marginTop="5px">
          <Link href="/SellProperty" paddingLeft="2">
            Sell 
          </Link>
        </Box>
        <Box fontSize="1xl" color="gray.400" fontWeight="bold" marginEnd="80px" marginTop="5px">
          <Link href="/" paddingLeft="2">
            Buy
          </Link>
        </Box>
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FcMenu />}
            variant="outline"
            color="red.400"
          />
          <MenuList>
            <button onClick={mintNFT} >Mint </button>
            <button onClick={listProperty} >List </button>
            <ConnectWallet />
            {/* <Web3Button
              contractAddress={address}
              action={() => minNFT({ args: ["1"] })}
            >
              Mint NFT
            </Web3Button> */}
            <Link href="/" passHref>
              <MenuItem icon={<FcHome />}>Home</MenuItem>
            </Link>
            <Link href="https://asliestate.netlify.app/" passHref>
              <MenuItem icon={<BsSearch />}>Search</MenuItem>
            </Link>
            <Link href="/search?purpose=for-sale" passHref>
              <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
            </Link>
            <Link href="/search?purpose=for-rent" passHref>
              <MenuItem icon={<FiKey />}>Sell Property</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
    </div >
  );
}

export default Navbar;

import React, { useState } from 'react';
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
function PropertyForm({ onSubmit }) {
  

  return (
    <>
    <iframe src="https://sepolia.etherscan.io/address/0x10BD6012Fb68b677773F819526cc8cF253d196fd" width="600" height="400" frameborder="0" scrolling="no"></iframe>

    </>
  );
}

export default PropertyForm;

"use client"
import React, { useState } from 'react'
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
import { Account, ConnectWallet, useAddress } from "@thirdweb-dev/react";

import {
    useContract,
    useContractRead,
    useContractWrite,
    useNFTs,
} from "@thirdweb-dev/react";
const Sell = () => {
    const [buyer, setBuyer] = useState('')
    const { contract } = useContract("0x10BD6012Fb68b677773F819526cc8cF253d196fd");
    const { escrow } = useContract("0xE6f8ce9b26C9a4dA1083d82Fec7dbe217D08E5b4");
    const address = useAddress();
    const { mutate: mintNow, isLoading: settingName } = useContractWrite(
        contract,
        "mint",
    );
    const { mutate: transferNow, isLoading: settingName3 } = useContractWrite(
        contract,
        "transferFrom",
    );
    const { mutate: approveNow, isLoading: settingName4 } = useContractWrite(
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
    const { data: nfts, isLoading: n, error } = useNFTs(contract, { start: 0, count: 100 });
    const mintNFT = () => {
        mintNow({ args: ["My Prop 1"] })
    }
    const sellProperty = (event,id) => {
        event.preventDefault();
        console.log(id)
        console.log(buyer)
        const res=transferNow({ args: [address, buyer, id] })
        console.log(res)
    }
    const approve = (event,id) => {
        event.preventDefault();
        console.log(id)
        console.log(buyer)
        const res=approveNow({ args: [buyer, id] })
        console.log(res)
    }
    console.log(nfts)
    if (n)
        return <>Loading data from out ethreum blockchain</>
    return (
        <div style={{ background: "white", minHeight: "80vh" }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #dddddd', padding: '8px' }}>Ethereum block number</th>
                        <th style={{ border: '1px solid #dddddd', padding: '8px' }}>Owner</th>
                        <th style={{ border: '1px solid #dddddd', padding: '8px' }}>Property Registration Number/Name</th>
                        <th style={{ border: '1px solid #dddddd', padding: '8px' }}>Sell </th>
                    </tr>
                </thead>
                <tbody>
                    {nfts.map((nft) => (

                        <tr key={nft.id}>
                            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{nft.metadata.id}</td>
                            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{nft.owner}</td>
                            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{nft.metadata.uri}</td>
                            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>
                                <form onSubmit={(e) => sellProperty(e,nft.metadata.id)}>
                                    <input placeholder='Buyer eth address' style={{ border: "1px solid black", padding: "6px" }} onChange={(e) => setBuyer(e.target.value)}></input>
                                    <button type='submit' style={{background:"black",color:"white",padding:"4px",width:"5vw",borderRadius:"10px",marginLeft:"20px"}}>Sell</button>
                                    
                                </form>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Sell
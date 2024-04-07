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
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [addressHouse, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [ownerName, setOwnerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const property = {
      registrationNumber,
      address,
      city,
      area,
      image,
      price,
      ownerName,
    };
    onSubmit(property);
    setRegistrationNumber('');
    setAddress('');
    setCity('');
    setArea('');
    setImage('');
    setPrice('');
    setOwnerName('');
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border:"1px solid black",
    borderRadius: '5px',
    marginBottom: '15px',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

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
  const mintNFT = async(e) => {
    e.preventDefault()
   const res=await mintNow({ args: [registrationNumber] })
   console.log(res)
  }
  

  return (
    <div style={{ background:"white"}}>
        <div style={{marginLeft: "30vw", marginRight: "30vw"}}>
      <form onSubmit={mintNFT}>
        <label style={{  display: 'block', marginBottom: '10px' }}>
          Registration Number:
          <input
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label style={ {display: 'block', marginBottom: '10px' }}>
          Address:
          <input
            type="text"
            value={addressHouse}
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label style={{  display: 'block', marginBottom: '10px' }}>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label style={{  display: 'block', marginBottom: '10px' }}>
          Area (sq.ft):
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Property Image:
          <input
            type="file" // Changed to file input for image upload
            onChange={(e) => setImage(e.target.files[0])} // Use files property to get uploaded file
            style={inputStyle}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>Register Property</button>
      </form>
      </div>
    </div>
  );
}

export default PropertyForm;

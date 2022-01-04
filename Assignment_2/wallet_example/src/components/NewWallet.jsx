import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export const NewWallet = () => {
  const [wallet, setWallet] = useState({});

  const handleSetWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    setWallet(wallet);
  };

  console.log(wallet);

  useEffect(handleSetWallet, []);

  return (
    <div>
      <div>
        <h3>Creating New Wallet</h3>
        <h4>Address : {wallet?.address}</h4>
      </div>
    </div>
  );
};

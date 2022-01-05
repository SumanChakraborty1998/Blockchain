import React, { useState } from "react";
import { ExistingWallet } from "./ExistingWallet";
import { NewWallet } from "./NewWallet";

export const Home = () => {
  const [walletStatus, setWalletStatus] = useState(0);

  const handleChange = (res) => {
    setWalletStatus((prev) => +res);
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "50%",
        padding: "50px",
        background: "lightblue",
      }}
    >
      <h2>Welcome To The Future</h2>
      <select onChange={(e) => handleChange(e.target.value)}>
        <option value={0}>Default</option>
        <option value={1}>Existing One</option>
        <option value={2}>New One</option>
      </select>
      <br />
      <br />
      <br />
      <br />
      <div>
        {walletStatus === 1 ? (
          <ExistingWallet />
        ) : walletStatus === 2 ? (
          <NewWallet />
        ) : null}
      </div>
    </div>
  );
};

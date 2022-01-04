// import CryptoJs from "crypto-js";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { SendFund } from "./SendFund";
const CryptoJS = require("crypto-js");

const JsonFormatter = {
  stringify: function (cipherParams) {
    // create json object with ciphertext
    var jsonObj = {
      ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
    };

    // optionally add iv or salt
    if (cipherParams.iv) {
      jsonObj.iv = cipherParams.iv.toString();
    }

    if (cipherParams.salt) {
      jsonObj.s = cipherParams.salt.toString();
    }
    // stringify json object
    return JSON.stringify(jsonObj);
  },
  parse: function (jsonStr) {
    // parse json string
    var jsonObj = JSON.parse(jsonStr);

    // extract ciphertext from json object, and create cipher params object
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct),
    });

    // optionally extract iv or salt

    if (jsonObj.iv) {
      cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
    }

    if (jsonObj.s) {
      cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
    }

    return cipherParams;
  },
};

export const ExistingWallet = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [password, setPassword] = useState("");
  const [walletDetails, setWalletDetails] = useState({});
  const [balance, setBalance] = useState({});
  const [keepOnEye, setKeepOnEye] = useState(1);

  const getWalletDetails = async () => {
    if (privateKey.trim() !== "") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const newProvider = new ethers.providers.JsonRpcProvider(
      //   "http://localhost:3001/",
      // );
      // const provider = new ethers.providers.getDefaultProvider("Rinkeby");
      const signer = provider.getSigner();
      const aa = await provider.getBlockNumber();
      const wallet = new ethers.Wallet(privateKey, provider);
      setWalletDetails(wallet);
      const balance = await wallet.getBalance();
      setBalance((prev) => balance);
      // const wallet2 = ethers.Wallet.createRandom();
      console.log(provider);
      // console.log(newProvider);
      console.log(signer);
      console.log(aa);
      console.log(wallet);
      console.log(balance);
      // console.log(wallet2);
    }
  };

  const handleSubmit = () => {
    if (privateKey !== "" && password !== "") {
      var encrypted = CryptoJS.AES.encrypt(privateKey, password, {
        format: JsonFormatter,
      });

      localStorage.setItem("key", encrypted);
      localStorage.setItem("password", password);

      getWalletDetails();
    } else {
      alert("Please enter private key and password");
    }
  };

  const handleReset = () => {
    localStorage.clear();
    setPrivateKey("");
    setPassword("");
    setWalletDetails({});
    setBalance({});
    // getUserDetailsFromLocalStorage();
  };

  const getUserDetailsFromLocalStorage = async () => {
    console.log("Hi");
    const encrypted = localStorage.getItem("key");
    const password = localStorage.getItem("password");
    console.log("Hi", encrypted);

    if (encrypted) {
      const decrypted = CryptoJS.AES.decrypt(encrypted, password, {
        format: JsonFormatter,
      }).toString(CryptoJS.enc.Utf8);
      setPrivateKey(decrypted);
      setPassword(password);
      console.log(decrypted);
      setKeepOnEye((prev) => prev + 1);
    } else {
      console.log("Key is not there in storage");
    }
  };

  console.log(balance);
  useEffect(() => getUserDetailsFromLocalStorage(), []);
  useEffect(() => getWalletDetails(), [keepOnEye]);

  return (
    <div>
      <h3>Enter Existing Wallet Details</h3>
      <input
        type="text"
        placeholder="Enter your Private key"
        onChange={(e) => setPrivateKey(e.target.value)}
        value={privateKey}
      />
      <br />
      <input
        type="text"
        placeholder="Enter your Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <button onClick={handleSubmit}>SUBMIT</button>
      <button onClick={handleReset}>RESET</button>
      {/* <div>
        <h2>{privateKey}</h2>
        <h3>{password}</h3>
      </div> */}
      <div>
        <h4>
          Address :
          {walletDetails?.address ? walletDetails.address : "No Address"}
        </h4>
        <h5>
          Balance :
          {balance?._hex ? formatUnits(balance?._hex, 18) : "No Balance"}
        </h5>
      </div>
      <div>
        {Object.keys(walletDetails).length >= 1 && (
          <SendFund walletDetails={walletDetails} />
        )}
      </div>
    </div>
  );
};

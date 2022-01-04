import React from "react";
import { ethers } from "ethers";

export const SendFund = ({ walletDetails }) => {
  const [recipient, setRecipient] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSendFundToRecipient = async () => {
    if (recipient === "" || amount === "") {
      alert("Recipient and Amount are required");
    } else {
      const connection = new ethers.providers.JsonRpcProvider(
        "https://rinkeby-light.eth.linkpool.io/",
      );
      const gasPrice = connection.getGasPrice();
      const signer = walletDetails.connect(connection);

      //Transaction Object to send Funds
      const tx = {
        from: walletDetails.address,
        to: recipient,
        value: ethers.utils.parseEther(amount, "ether"),
        gasPrice: gasPrice,
        gasLimit: ethers.utils.hexlify(100000), //100 gwei
        nonce: await connection.getTransactionCount(
          walletDetails.address,
          "latest",
        ), //To prevent the nonce from being used twice
      };
      const transaction = await signer.sendTransaction(tx);
      if (transaction) {
        setMessage(`Transaction Sent Successfully`);
      }
      console.log(transaction);
    }
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <h2>Sending to Another Address</h2>
      <h3>
        From <span style={{ color: "red" }}>{walletDetails?.address}</span>
      </h3>
      <input
        type="text"
        placeholder="Enter Receiver Address"
        onChange={(e) => setRecipient(e.target.value)}
        value={recipient}
      />
      <input
        type="text"
        placeholder="Enter Amount (in ETH)"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />
      <button onClick={handleSendFundToRecipient}>Send</button>
      <h3>
        To <span style={{ color: "red" }}>{recipient}</span>
      </h3>
      <h1>{message}</h1>
    </div>
  );
};

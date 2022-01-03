let CryptoJS = require("crypto-js"); //************Symmetric Encryption

let secretMessage = "Hello World";
let nonce = "Secret Key";

const doEncrypt = (message, key) => {
  let cipherText = CryptoJS.AES.encrypt(message, key).toString();
  return cipherText;
};

const doDecrypt = (encryptedMessage, key) => {
  let decryptedText = CryptoJS.AES.decrypt(encryptedMessage, key).toString(
    CryptoJS.enc.Utf8,
  );
  return decryptedText;
};

const encryptedMsg = doEncrypt(secretMessage, nonce);
console.log("Symmetric Encrypted Message : ", encryptedMsg); //Showing Encrypted Message */

const decryptedMsg = doDecrypt(encryptedMsg, nonce);
console.log("Symmetric Decrypted Message : ", decryptedMsg); //Showing Decrypted and Original Message */

//*****************Asymmetric Encryption
const nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");

//Genarating the keys
const suman = nacl.box.keyPair();
const prateek = nacl.box.keyPair();

const sumanEncrypting = (message) => {
  const nonce = nacl.randomBytes(24); //Generating the nonce means one time code

  const cipherText = nacl.box(
    nacl.util.decodeUTF8(message),
    nonce,
    prateek.publicKey,
    suman.secretKey,
  );

  const messageForChannel = { cipherText, nonce };
  return messageForChannel;
};

const prateekDecrypting = (message) => {
  //Decode the message
  let decodedMessage = nacl.box.open(
    message.cipherText,
    message.nonce,
    suman.publicKey,
    prateek.secretKey,
  );

  //Convert to Human understandable message
  decodedMessage = nacl.util.encodeUTF8(decodedMessage);
  return decodedMessage;
};

let encryptedMessage = sumanEncrypting("Hello World");
console.log(encryptedMessage);
let decryptedMessage = prateekDecrypting(encryptedMessage);
console.log(decryptedMessage);

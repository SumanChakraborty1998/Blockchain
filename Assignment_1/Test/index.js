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
    suman.publicKey,
    prateek.secretKey,
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

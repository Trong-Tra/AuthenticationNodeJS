const crypto = require("crypto");
const { generateMnemonicAndKey } = require("./KeyGenerate.js");

async function encryptData() {
  try {
    const { pubkey, address } = await generateMnemonicAndKey();
    console.log("Public key received:", pubkey.toString());
    const key = crypto.randomBytes(32); // 256-bit key
    const iv = crypto.randomBytes(16); // 128-bit IV

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv); // cipher object
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv); // decipher object

    // Encrypt
    let encryptedPubkey = cipher.update(pubkey.toString(), "utf-8", "hex");
    encryptedPubkey += cipher.final("hex");

    console.log("Encrypted:", encryptedPubkey);

    // Decrypt
    let decryptedPubkey = decipher.update(encryptedPubkey, "hex", "utf-8");
    decryptedPubkey += decipher.final("utf-8");

    console.log("Decrypted:", decryptedPubkey);
  } catch (error) {
    console.error("Error encrypting data:", error);
  }
}

// Testing
encryptData();

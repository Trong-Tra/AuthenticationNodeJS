const crypto = require("crypto");
const { KeyGen, MnemonicGen } = require("./KeyGenerate.js");

async function encryptData() {
  try {
    const mnemonic = await MnemonicGen();
    console.log("Mnemonic received:", mnemonic.mnemonic);
    const key = crypto.randomBytes(32); // 256-bit key
    const iv = crypto.randomBytes(16); // 128-bit IV

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv); // cipher object
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv); // decipher object

    // Encrypt
    let encryptedMnemonic = cipher.update(mnemonic.mnemonic, "utf-8", "hex");
    encryptedMnemonic += cipher.final("hex");

    console.log("Encrypted:", encryptedMnemonic);

    // Decrypt
    let decryptedMnemonic = decipher.update(encryptedMnemonic, "hex", "utf-8");
    decryptedMnemonic += decipher.final("utf-8");

    console.log("Decrypted:", decryptedMnemonic);
  } catch (error) {
    console.error("Error encrypting data:", error);
  }
}

// Testing
encryptData();

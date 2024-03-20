const bip39 = require("bip39");
const ethers = require("ethers");

// Generate a random mnemonic (12 words by default)
const mnemonic = bip39.generateMnemonic();

console.log("Generated mnemonic:", mnemonic);

// Generate a private key from mnemonic
const mnemonicWallet = ethers.Wallet.fromPhrase(mnemonic);
console.log(mnemonicWallet.privateKey);

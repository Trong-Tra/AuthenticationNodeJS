const bip39 = require("bip39");

// Generate a random mnemonic (12 words by default)
const mnemonic = bip39.generateMnemonic();

console.log("Generated mnemonic:", mnemonic);

// Generate a seed from mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);
console.log("Private Key generated:", seed);

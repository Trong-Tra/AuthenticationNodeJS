const bip39 = require("bip39");

// Generate a random mnemonic (12 words by default)
const mnemonic = bip39.generateMnemonic();

console.log("Generated mnemonic:", mnemonic);

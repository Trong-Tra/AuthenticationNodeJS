const bip39 = require("bip39");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");

// Generate key

async function KeyGen(Generate_mnemonic) {
  //const hdPath = "m/44'/118'/0'/0/0";
  try {
    // this function already generate the seed
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
      Generate_mnemonic,
      {
        prefix: "thasa",
      }
    );

    const [{ pubkey, address }] = await wallet.getAccounts();

    return { pubkey, address };
  } catch (error) {
    console.error("Error generating key:", error);
    return null;
  }
}

// Generate a random mnemonic (12 words by default)
async function MnemonicGen() {
  const mnemonic = await bip39.generateMnemonic();

  return { mnemonic };
}

// Test

// const userMnemonic = MnemonicGen();
// console.log("Generated mnemonic:", userMnemonic);
// const { pubkey, address } = KeyGen(userMnemonic);
// console.log("Public key:", pubkey.toString());
// console.log("Address:", address);

module.exports = { KeyGen, MnemonicGen };

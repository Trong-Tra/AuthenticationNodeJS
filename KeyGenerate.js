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
    console.log("Public key:", pubkey.toString());
    console.log("Address:", address);
  } catch (error) {
    console.error("Error generating key:", error);
  }
}

// Generate a random mnemonic (12 words by default)
async function generateMnemonicAndKey() {
  const mnemonic = await bip39.generateMnemonic();
  console.log("Generated mnemonic:", mnemonic);

  // Testing
  await KeyGen(mnemonic);
}

generateMnemonicAndKey();

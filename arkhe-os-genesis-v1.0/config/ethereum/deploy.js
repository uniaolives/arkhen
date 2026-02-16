const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
  const privateKeyArg = process.argv.find((arg) => arg.startsWith("--private-key="));
  const privateKey = privateKeyArg?.split("=")[1];
  if (!privateKey) throw new Error("Forneça --private-key=<chave>");

  const provider = new ethers.JsonRpcProvider(
    process.env.ETHEREUM_RPC || `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  const abiPath = path.join(__dirname, "ArkheLedger.abi.json");
  const bytecodePath = path.join(__dirname, "ArkheLedger.bytecode");
  if (!fs.existsSync(abiPath) || !fs.existsSync(bytecodePath)) {
    throw new Error("ABI/bytecode não encontrados. Compile o contrato com Hardhat/Foundry antes do deploy.");
  }

  const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
  const bytecode = fs.readFileSync(bytecodePath, "utf8").trim();

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  console.log("Contrato implantado em:", contract.target);

  const configPath = path.join(__dirname, "../base44/config.jsonc");
  let config = fs.readFileSync(configPath, "utf8");
  config = config.replace('"ArkheLedger": "0x..."', `"ArkheLedger": "${contract.target}"`);
  fs.writeFileSync(configPath, config);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

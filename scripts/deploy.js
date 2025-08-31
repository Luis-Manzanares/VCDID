import hre from "hardhat";

async function main() {
  const DIDRegistry = await hre.ethers.getContractFactory("DIDRegistry");
  const didRegistry = await DIDRegistry.deploy();

  await didRegistry.deployed();

  console.log(`DIDRegistry contract deployed to: ${didRegistry.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
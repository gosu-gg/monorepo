// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { Gosu } from "../typechain/Gosu";
import { Wallet } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  let provider = new ethers.providers.JsonRpcProvider(process.env.NODE);
  const myWallet = new Wallet(process.env.PV as string, provider);

  const Gosu = await ethers.getContractAt("Gosu", "address 0x...");

  const gosu = (await Gosu.connect(myWallet)) as Gosu;

  console.log("Greeter deployed to:", gosu.address);

  gosu.setWinner(
    1,
    "0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78",
    "0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

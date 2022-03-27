import axios from "axios"
import { ethers, Wallet } from "ethers";

import abi from './abi.json';


export default async function getClashBattleLog(playerTag: string) {
  const config = {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  };

  const data = await axios.get(
    `https://api.clashroyale.com/v1/players/${playerTag}/battlelog`,
    config
  );

  return data.data;
}

export async function setWinners() {
  const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
  const myWallet = new Wallet(`${process.env.PRIVATE_KEY}`, provider);

  const contract = new ethers.Contract('0x0bC52193F3b34abCC05b8b2C21c360d19675c9c5', abi.abi, provider);
  const contractWithSigner = contract.connect(myWallet);

  try {
    await contractWithSigner.setWinner(1,
      "0x13953eB914D40b09ab6b0fED67b0f64C6d95C4C4",
      "0xED4Dc638Dee44F7423d46b6A1Df41548bFdD3bb4");
  } catch(e) {
    console.log(e);
    console.log("[ERROR] Error setting the winner");
  }
}
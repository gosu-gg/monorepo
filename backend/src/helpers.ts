import axios from "axios";
import moment from 'moment';
import { ethers, Wallet } from "ethers";

import abi from './abi.json';


export default async function setGameResult(gameId: number, playerTag1: string, playerTag2: string, timeStamp: string) {
  const config = {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  };

  const data = await axios.get(
    `https://api.clashroyale.com/v1/players/${playerTag1.replace('#', '%23')}/battlelog`,
    config
  );

  const battleLog = data.data;
  const lastBattleTime = moment(battleLog[battleLog.length - 1].battleTime);
  const lastPossibleBattleTime = moment(timeStamp).add(30, 'minutes');
  if (lastBattleTime > lastPossibleBattleTime) {
    await setWinners(gameId, '', '');
    return {result: 'draw game'};
  }

  // eslint-disable-next-line
  const game = battleLog.find((tmpGame) => { 
    const now = moment();
    const battleTime = moment(tmpGame.battleTime);
    const playersInvolved = (tmpGame.team[0].name === playerTag1 ||  tmpGame.opponent[0].name  === playerTag1) && (tmpGame.team[0].name === playerTag2 ||  tmpGame.opponent[0].name  === playerTag2);
    return now <= lastPossibleBattleTime && now > battleTime && playersInvolved;
  });

  if (!game) {
    return {error: 'game not found'};
  }

  if (game.team[0].crowns > game.opponent[0].crowns) {
    await setWinners(gameId, game.team[0].tag, game.opponent[0].tag);
    return {result: `victory from ${game.team[0].player}`};
  }

  else if (game.team[0].crowns < game.opponent[0].crowns) {
    await setWinners(gameId, game.opponent[0].tag, game.team[0].tag);
    return {result: `victory from ${game.opponent[0].player}`};
  }

  await setWinners(gameId, '', '');
  return {result: 'draw game'};
}

export async function setWinners(gameId: number, player1: string, player2: string) {
  const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
  const myWallet = new Wallet(`${process.env.PRIVATE_KEY}`, provider);

  const contract = new ethers.Contract('0x0bC52193F3b34abCC05b8b2C21c360d19675c9c5', abi.abi, provider);
  const contractWithSigner = contract.connect(myWallet);

  try {
    await contractWithSigner.setWinner(gameId,
      player1,
      player2);
  } catch(e) {
    console.log(e);
    console.log("[ERROR] Error setting the winner");
  }
}

export async function getGameFromContract(gameId: number) {
  const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
  const contract = new ethers.Contract('0x0bC52193F3b34abCC05b8b2C21c360d19675c9c5', abi.abi, provider);

  try {
    const game =  await contract.games(gameId);
    const player1 = await contract.addressToTag(game.player);
    const player2 = await contract.addressToTag(game.opponent);
    return {player1, player2, gameId, timeStamp: game.dateOfGame};
  } catch(error) {
    console.error(error);
    return undefined;
  }
}
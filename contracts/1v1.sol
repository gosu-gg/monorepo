// SPDX-License-Identifier: MIT

// File: contracts/xxHusky.sol
pragma solidity ^0.8.1;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Gosu is Ownable {

    struct Game {
        uint BetAmount;
        address player;
        address opponent;
        uint256 dateOfGame;
        bool inGame = false;
    }
    
    mapping(address => Game[]) public games;
    mapping(address => uint256) public gains;
    mapping(address => uint) public currentGame;
    mapping(address => uint) public drawClaim;
    uint limitTime;

    constructor()  {}

    // join a game
    function joinGame(address opponent) public {   
        curGameP1 = currentGame[opponent];
        curGameP2 = currentGame[msg.sender];

        require(opponent != msg.sender, "not the same address in both parameters");
        require(msg.value >= games[opponent][curGameP1].BetAmount, "not enough amount to bet");
        require(games[opponent][curGameP1].inGame == false, "P1 already in game");
        
        if (games[msg.sender][curGameP2].inGame == true
        && (block.timestamp - games[msg.sender][curGameP2].dateOfGame) > limitTime) {
            drawClaim[msg.sender] = games[msg.sender][curGameP2].BetAmount;
            games[msg.sender][curGameP2].inGame = false;
        }
        else {
            require(games[msg.sender][curGameP2].inGame == false, "P2 is in game");
        }

        games[opponent][curGameP1].opponent = msg.sender;

        games[msg.sender][curGameP2].player = msg.sender;
        games[msg.sender][curGameP2].player = opponent;

        games[opponent][curGameP1].dateOfGame = block.timestamp;
        games[msg.sender][curGameP2].dateOfGame = block.timestamp;

        games[opponent][curGameP1].inGame = true;
        games[msg.sender][curGameP2].inGame = true;

    }

    function createGame(uint256 amountBet) public {
        require(msg.value >= amountBet);
        if (games[msg.sender][currentGame[msg.sender]].inGame == true
        && (block.timestamp - games[msg.sender][currentGame[msg.sender]].dateOfGame) > limitTime) {
            drawClaim[msg.sender] = games[msg.sender][currentGame[msg.sender]].BetAmount;
            games[msg.sender][currentGame[msg.sender]].inGame = false;
        }
        else {
            require(games[msg.sender][currentGame[msg.sender]].inGame == false, "You already have an active game");
        }
        games[msg.sender][currentGame[msg.sender]].BetAmount = msg.value;
        games[msg.sender][currentGame[msg.sender]].player = msg.sender;
    }

    function setWinner(address winner, address loser) public onlyOwner {
        //set winner states
        gains[winner] += games[winner][currentGame[winner]].BetAmount * 2;
        games[winner][currentGame[winner]].inGame = false;
        currentGame[winner] += 1;

        address loser = games[winner][currentGame[winner]].opponent;
        games[loser][currentGame[loser]].inGame = false;
        currentGame[loser] += 1;

    }

}
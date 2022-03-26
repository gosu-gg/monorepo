// SPDX-License-Identifier: MIT

// File: contracts/xxHusky.sol
pragma solidity ^0.8.0;


import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";


contract Gosu is Ownable {

    enum GameState {
        OFF,
        PLAYER_WIN,
        OPPONENT_WIN,
        RUNNING,
        DRAW,
        END
    }

    struct Game {
        uint256 betAmount;
        address player;
        address opponent;
        uint256 dateOfGame;
        GameState state;
    }
    
    mapping(address => Game[]) public gamesMapping;
    mapping(address => uint256) public gains;
    mapping(address => uint) public currentGame;
    mapping(address => uint) public drawClaim;
    uint limitTime;

    function createGame() public payable {
        Game[] storage games = gamesMapping[msg.sender];
        uint256 gameIndex = currentGame[msg.sender];
        if (games.length > gameIndex) {
            //The player is already in a game but time run out so we cancel his current game and let him claim his bet back
            if (games[gameIndex].state == GameState.RUNNING
            && (block.timestamp - games[gameIndex].dateOfGame) > limitTime) {
                drawClaim[msg.sender] = games[gameIndex].betAmount;
                games[gameIndex].state = GameState.DRAW;
            }
            else {
                require(games[gameIndex].state == GameState.OFF, "You already have an active game");
            }
        }
        else {
            Game memory newGame = Game(msg.value, msg.sender, address(0), block.timestamp, GameState.RUNNING);
            games.push(newGame);
        }
    }

    // join a game
    /*function joinGame(address opponent) public payable {   
        uint256 curGameP1 = currentGame[opponent];
        uint256 curGameP2 = currentGame[msg.sender];

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

    function setWinner(address winner) public onlyOwner {
        //set winner states
        gains[winner] += games[winner][currentGame[winner]].BetAmount * 2;
        games[winner][currentGame[winner]].inGame = false;
        currentGame[winner] += 1;

        address loser = games[winner][currentGame[winner]].opponent;
        games[loser][currentGame[loser]].inGame = false;
        currentGame[loser] += 1;

    }*/

}
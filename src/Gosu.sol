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
    uint256 limitTime = 1800;

    function createGame() public payable {
        Game[] storage games = gamesMapping[msg.sender];
        uint256 gameIndex = currentGame[msg.sender];
        if (games.length > gameIndex) {
            require(games[gameIndex].state != GameState.RUNNING, "You already have an active game");
        }
        Game memory newGame = Game(msg.value, msg.sender, address(0), block.timestamp, GameState.RUNNING);
        games.push(newGame);
    }

    // join a game
    function joinGame(address firstPlayer) public payable {
        Game[] storage gamesP1 = gamesMapping[firstPlayer];
        Game[] storage gamesP2 = gamesMapping[msg.sender];
        uint256 curGameP1 = currentGame[firstPlayer];
        uint256 curGameP2 = currentGame[msg.sender];
        require(gamesP1[curGameP1].state == GameState.RUNNING, "Player doesn't have active game");
        require(gamesP1[curGameP1].opponent == address(0), "Player already has an opponent");
        require(gamesP1[curGameP1].betAmount == msg.value, "Bet amount isn't equal");
        require(gamesP1[curGameP1].player != msg.sender, "Player is opponent");
        //msg.sender shoud not be in another game
        if (gamesP2.length > curGameP2) {
            require(gamesP2[curGameP2].state != GameState.RUNNING, "Player already in a game");
        }
        gamesP1[curGameP1].opponent = msg.sender;
        gamesP2.push(gamesP1[curGameP1]);
    }

    
    function setWinner(address winner) public onlyOwner {
        //set winner states
        Game[] storage gamesP1 = gamesMapping[firstPlayer];
        uint256 curGameP1 = currentGame[firstPlayer];

        Game storage curGame = gamesP1[curGameP1];
        if (curGame.player == winner) {
            curGame.state = GameState.PLAYER_WIN;
        }
        if (curGame.opponent == winner) {
            curGame.state = GameState.OPPONENT_WIN;
        }
    }

}
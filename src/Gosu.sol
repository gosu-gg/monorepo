// SPDX-License-Identifier: MIT

// File: contracts/xxHusky.sol
pragma solidity ^0.8.0;


import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";


contract Gosu is Ownable {

    event Lost(address indexed loser);
    event Win(address indexed winner);
    event Draw(address indexed p1, address indexed p2);

    enum GameState {
        OFF,
        PLAYER_WIN,
        OPPONENT_WIN,
        RUNNING,
        DRAW,
        END
    }
    struct Game {
        uint256 id;
        uint256 betAmount;
        address player;
        address opponent;
        uint256 dateOfGame;
        GameState state;
    }
    struct PlayerStat {
        uint win;
        uint defeat;
        uint draw;
    }

    Game[] public games;
    mapping(address => uint) public currentGame;
    mapping(uint256 => bool[]) public hasClaimed; //0 is player and 1 opponent
    mapping(address => bool) public playedFirstGame;
    mapping(address => PlayerStat) public statsPlayer; // oublie pas de set les stats des joueurs dans la fonction setWinner et/ou quand ya un draw dans les autres fonctions
    uint256 limitTime = 1800;

    function createGame() public payable {
        uint256 gameIndex = currentGame[msg.sender];

        //CHECK IF LAST GAME IS A DRAW BY LIMIT OF TIME
        if(gameIndex < games.length && games[gameIndex].state == GameState.RUNNING
        && games[gameIndex].dateOfGame + limitTime < block.timestamp) {
            games[gameIndex].state = GameState.DRAW;
            
            statsPlayer[games[gameIndex].player].draw += 1;
            statsPlayer[games[gameIndex].opponent].draw += 1;
            emit Draw(games[gameIndex].player, games[gameIndex].opponent);
        }

        if (games.length > gameIndex) {
            require(games[gameIndex].state != GameState.RUNNING, "You already have an active game");
        }
        Game memory newGame = Game(games.length, msg.value, msg.sender, address(0), block.timestamp, GameState.RUNNING);
        games.push(newGame);
        playedFirstGame[msg.sender] = true;
        currentGame[msg.sender] = games.length - 1;
    }

    // join a game
    function joinGame(uint256 gameId) public payable {
        Game storage game = games[gameId];
        uint256 curGameP2 = currentGame[msg.sender];

        //CHECK IF LAST GAME IS A DRAW BY LIMIT OF TIME
        if(curGameP2 < games.length && games[curGameP2].state == GameState.RUNNING
        && games[curGameP2].dateOfGame + limitTime < block.timestamp) {
            games[curGameP2].state = GameState.DRAW;
            
            statsPlayer[games[curGameP2].player].draw += 1;
            statsPlayer[games[curGameP2].opponent].draw += 1;
            emit Draw(games[curGameP2].player, games[curGameP2].opponent);
        }

        require(game.state == GameState.RUNNING, "Player doesn't have active game");
        require(game.opponent == address(0), "Player already has an opponent");
        require(game.betAmount == msg.value, "Bet amount isn't equal");
        require(game.player != msg.sender, "Player is opponent");
        //msg.sender shoud not be in another game
        if (games.length > curGameP2 && playedFirstGame[msg.sender]) {
            require(games[curGameP2].state != GameState.RUNNING, "Player already in a game");
        }
        game.opponent = msg.sender;
        playedFirstGame[msg.sender] = true;
        currentGame[msg.sender] = gameId;
    }

    
    function setWinner(uint256 gameId, address winner, address loser) public onlyOwner {
        Game memory game = games[gameId]; 
        //set winner states
        require(game.state == GameState.RUNNING);

        if (game.dateOfGame + limitTime < block.timestamp) {
            games[gameId].state = GameState.DRAW;
            
            statsPlayer[games[gameId].player].draw += 1;
            statsPlayer[games[gameId].opponent].draw += 1;
            emit Draw(games[gameId].player, games[gameId].opponent);
        }
        else if (game.player == winner) {
            games[gameId].state = GameState.PLAYER_WIN;
        }
        else if (game.opponent == winner) {
            games[gameId].state = GameState.OPPONENT_WIN;
        }
        else {
            games[gameId].state = GameState.DRAW;

            statsPlayer[games[gameId].player].draw += 1;
            statsPlayer[games[gameId].opponent].draw += 1;
            emit Draw(games[gameId].player, games[gameId].opponent);
        }
        //set stats of each player
        statsPlayer[winner].win += 1;
        statsPlayer[loser].defeat += 1;
        //events for leaderboard
        emit Win(winner);
        emit Lost(loser);
    }

    function claim(uint256 gameId) public {
        Game memory game = games[gameId];
        if (game.state == GameState.DRAW) {
            if (game.player == msg.sender) {
                require(hasClaimed[gameId][0] == false, "Already claimed");
                hasClaimed[gameId][0] = true;
                msg.sender.call{value: game.betAmount/2}("");
            }
            else if (game.opponent == msg.sender) {
                require(hasClaimed[gameId][1] == false, "Already claimed");
                hasClaimed[gameId][1] = true;
                msg.sender.call{value: game.betAmount/2}("");
            }
            if (hasClaimed[gameId][0] && hasClaimed[gameId][1]) {
                games[gameId].state = GameState.END;
            }
        }
        else if (game.state == GameState.PLAYER_WIN) {
            if (msg.sender == game.player) {
                uint amount = game.betAmount;
                (bool sent,) = payable(msg.sender).call{value: amount}("");
                require(sent, "Couldn't claim");
                games[gameId].state = GameState.END;
            }
        }
        else if (game.state == GameState.OPPONENT_WIN) {
            if (msg.sender == game.opponent) {
                uint amount = game.betAmount * 2;
                (bool sent,) = msg.sender.call{value: amount}("");
                require(sent, "Couldn't claim");
                games[gameId].state = GameState.END;
            }
        }
    }
}
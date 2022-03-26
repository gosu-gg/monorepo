// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.0;

import "ds-test/test.sol";
import "../Gosu.sol";

interface CheatCodes {

    function warp(uint256) external;
    // Set block.timestamp

    function prank(address) external;
    // Sets the *next* call's msg.sender to be the input address

    function startPrank(address, address) external;
    // Sets all subsequent calls' msg.sender to be the input address until `stopPrank` is called, and the tx.origin to be the second input

    function stopPrank() external;
    // Resets subsequent calls' msg.sender to be `address(this)`

    function deal(address who, uint256 newBalance) external;
    // Sets an address' balance

    function expectRevert() external;
    function expectRevert(bytes calldata) external;
    function expectRevert(bytes4) external;
    // Expects an error on next call
}

contract ContractTest is DSTest, Gosu {
    CheatCodes cheats = CheatCodes(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
    Gosu myGosu = new Gosu();
    function setUp() public {}

    function testCreateGame() public {
        myGosu.createGame{value: 1}();
        (uint256 id, uint256 betAmount, address player, address opponent, uint256 dateOfGame, GameState state) = myGosu.games(myGosu.currentGame(address(this)));
        DSTest.assertTrue(id == 0);
        DSTest.assertTrue(betAmount == 1);
        DSTest.assertTrue(state == GameState.RUNNING);
        DSTest.assertTrue(player == address(this));
        DSTest.assertTrue(opponent == address(0));
        DSTest.assertTrue(dateOfGame == block.timestamp);
        DSTest.assertTrue(address(myGosu).balance == 1);
    }

    function testFailCreateTwoGame() public {
        cheats.expectRevert("You already have an active game");
        myGosu.createGame{value: 5}();
        myGosu.createGame{value: 1}();
    }

    function testCreateAndJoinGame() public {
        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");
        cheats.startPrank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.joinGame{value: 1}(myGosu.currentGame(address(this)));
        cheats.stopPrank();

        (,,, address opponent,,) = myGosu.games(myGosu.currentGame(address(this)));
        DSTest.assertTrue(opponent == 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
    }

    function testCreateAndSetWinner() public {
        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");
        cheats.startPrank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.joinGame{value: 1}(myGosu.currentGame(address(this)));
        cheats.stopPrank();

        myGosu.setWinner(0, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, address(this));
        (,,,,, GameState state) = myGosu.games(myGosu.currentGame(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78));
        DSTest.assertTrue(state == GameState.OPPONENT_WIN);
        (,,,,,state) = myGosu.games(myGosu.currentGame(address(this)));
        DSTest.assertTrue(state == GameState.OPPONENT_WIN);
        
    }

    function testCreateAndSetWinner2() public {
        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");
        cheats.startPrank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.joinGame{value: 1}(myGosu.currentGame(address(this)));
        cheats.stopPrank();

        myGosu.setWinner(myGosu.currentGame(address(this)), address(this), 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        (,,,,, GameState state) = myGosu.games(myGosu.currentGame(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78));
        DSTest.assertTrue(state == GameState.PLAYER_WIN);
        (,,,,, state) = myGosu.games(myGosu.currentGame(address(this)));
        DSTest.assertTrue(state == GameState.PLAYER_WIN);
    }

    function testCreateAndTimeOver() public {
        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");
        cheats.startPrank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.joinGame{value: 1}(myGosu.currentGame(address(this)));
        cheats.stopPrank();

        uint timeNow = block.timestamp;
        cheats.warp(timeNow + 1801);

        myGosu.createGame{value: 1}();
        (,,,,, GameState state) = myGosu.games(myGosu.currentGame(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78));
        DSTest.assertTrue(state == GameState.DRAW);
        (,,,,,state) = myGosu.games(myGosu.currentGame(address(this)) - 1);
        DSTest.assertTrue(state == GameState.DRAW);
        
    }

    function testClaim() public {
        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");

        cheats.startPrank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.joinGame{value: 1}(myGosu.currentGame(address(this)));
        cheats.stopPrank();

        myGosu.setWinner(0, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, address(this));
        uint balanceBefore = address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).balance;
        (, uint256 betAmount,,,,) = myGosu.games(myGosu.currentGame(address(this)));

        cheats.prank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.claim(0);

        DSTest.assertTrue(balanceBefore + betAmount * 2 == address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).balance);
    }

    function testClaimDraw() public {
        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");

        cheats.startPrank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.joinGame{value: 1}(myGosu.currentGame(address(this)));
        cheats.stopPrank();

        myGosu.setWinner(0, address(0), address(0));
        uint balanceBefore = address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).balance;
        (, uint256 betAmount,,,,) = myGosu.games(myGosu.currentGame(address(this)));
        cheats.prank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.claim(0);
        DSTest.assertTrue(balanceBefore + betAmount == address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).balance);
    }

    function testStatsPlayersWinDefeat() public {
        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");
        cheats.startPrank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.joinGame{value: 1}(myGosu.currentGame(address(this)));
        cheats.stopPrank();

        myGosu.setWinner(0, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, address(this));
        (,,,,, GameState state) = myGosu.games(myGosu.currentGame(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78));
        DSTest.assertTrue(state == GameState.OPPONENT_WIN);
        (,,,,,state) = myGosu.games(myGosu.currentGame(address(this)));
        DSTest.assertTrue(state == GameState.OPPONENT_WIN);
        
        (uint win, uint defeat, uint draw) = myGosu.statsPlayer(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        DSTest.assertTrue(win == 1);
        DSTest.assertTrue(defeat == 0);
        DSTest.assertTrue(draw == 0);

        (win, defeat, draw) = myGosu.statsPlayer(address(this));
        DSTest.assertTrue(win == 0);
        DSTest.assertTrue(defeat == 1);
        DSTest.assertTrue(draw == 0);
        
    }

    function testStatsPlayersDraw() public {
        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");

        cheats.startPrank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.joinGame{value: 1}(myGosu.currentGame(address(this)));
        cheats.stopPrank();

        myGosu.setWinner(0, address(0), address(0));
        
        (uint win, uint defeat, uint draw) = myGosu.statsPlayer(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        DSTest.assertTrue(win == 0);
        DSTest.assertTrue(defeat == 0);
        DSTest.assertTrue(draw == 1);

        (win, defeat, draw) = myGosu.statsPlayer(address(this));
        DSTest.assertTrue(win == 0);
        DSTest.assertTrue(defeat == 0);
        DSTest.assertTrue(draw == 1);
        
    }

    function testStatsPlayers2Draw() public {
        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");

        cheats.startPrank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.joinGame{value: 1}(myGosu.currentGame(address(this)));
        cheats.stopPrank();

        myGosu.setWinner(0, address(0), address(0));
        
        (uint win, uint defeat, uint draw) = myGosu.statsPlayer(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        DSTest.assertTrue(win == 0);
        DSTest.assertTrue(defeat == 0);
        DSTest.assertTrue(draw == 1);

        (win, defeat, draw) = myGosu.statsPlayer(address(this));
        DSTest.assertTrue(win == 0);
        DSTest.assertTrue(defeat == 0);
        DSTest.assertTrue(draw == 1);

        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");

        cheats.startPrank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.joinGame{value: 1}(myGosu.currentGame(address(this)));
        cheats.stopPrank();

        myGosu.setWinner(1, address(0), address(0));
        
        (win, defeat, draw) = myGosu.statsPlayer(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        DSTest.assertTrue(win == 0);
        DSTest.assertTrue(defeat == 0);
        DSTest.assertTrue(draw == 2);

        (win, defeat, draw) = myGosu.statsPlayer(address(this));
        DSTest.assertTrue(win == 0);
        DSTest.assertTrue(defeat == 0);
        DSTest.assertTrue(draw == 2);
    }

    function testStatsPlayerLimitTimeDraw() public {
        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");

        cheats.startPrank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.joinGame{value: 1}(myGosu.currentGame(address(this)));
        cheats.stopPrank();

        uint timeNow = block.timestamp;
        cheats.warp(timeNow + 1801);

        myGosu.createGame{value: 1}();
        
        (uint win, uint defeat, uint draw) = myGosu.statsPlayer(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        DSTest.assertTrue(win == 0);
        DSTest.assertTrue(defeat == 0);
        DSTest.assertTrue(draw == 1);

        (win, defeat, draw) = myGosu.statsPlayer(address(this));
        DSTest.assertTrue(win == 0);
        DSTest.assertTrue(defeat == 0);
        DSTest.assertTrue(draw == 1);
        
    }


    
}

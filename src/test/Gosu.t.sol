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

    function testClaim() public {
        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");
        cheats.startPrank(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78, 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        myGosu.joinGame{value: 1}(myGosu.currentGame(address(this)));
        cheats.stopPrank();

        myGosu.setWinner(myGosu.currentGame(address(this)), address(this), 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        uint balanceBefore = address(this).balance;
        (uint256 id, uint256 betAmount, address player, address opponent, uint256 dateOfGame, GameState state) = myGosu.games(myGosu.currentGame(address(this)));
        DSTest.log_uint(address(myGosu).balance);
        myGosu.claim(0);
        DSTest.log_uint(address(myGosu).balance);

        DSTest.assertTrue(balanceBefore + betAmount * 2 == address(this).balance);
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.0;

import "ds-test/test.sol";
import "../Gosu.sol";

interface CheatCodes {

    function warp(uint256) external;
    // Set block.timestamp

    function roll(uint256) external;
    // Set block.number

    function fee(uint256) external;
    // Set block.basefee

    function load(address account, bytes32 slot) external returns (bytes32);
    // Loads a storage slot from an address

    function store(address account, bytes32 slot, bytes32 value) external;
    // Stores a value to an address' storage slot

    function sign(uint256 privateKey, bytes32 digest) external returns (uint8 v, bytes32 r, bytes32 s);
    // Signs data

    function addr(uint256 privateKey) external returns (address);
    // Computes address for a given private key

    function ffi(string[] calldata) external returns (bytes memory);
    // Performs a foreign function call via terminal

    function prank(address) external;
    // Sets the *next* call's msg.sender to be the input address

    function startPrank(address) external;
    // Sets all subsequent calls' msg.sender to be the input address until `stopPrank` is called

    function prank(address, address) external;
    // Sets the *next* call's msg.sender to be the input address, and the tx.origin to be the second input

    function startPrank(address, address) external;
    // Sets all subsequent calls' msg.sender to be the input address until `stopPrank` is called, and the tx.origin to be the second input

    function stopPrank() external;
    // Resets subsequent calls' msg.sender to be `address(this)`

    function deal(address who, uint256 newBalance) external;
    // Sets an address' balance

    function etch(address who, bytes calldata code) external;
    // Sets an address' code

    function expectRevert() external;
    function expectRevert(bytes calldata) external;
    function expectRevert(bytes4) external;
    // Expects an error on next call

    function record() external;
    // Record all storage reads and writes

    function accesses(address) external returns (bytes32[] memory reads, bytes32[] memory writes);
    // Gets all accessed reads and write slot from a recording session, for a given address

    function expectEmit(bool, bool, bool, bool) external;
    // Prepare an expected log with (bool checkTopic1, bool checkTopic2, bool checkTopic3, bool checkData).
    // Call this function, then emit an event, then call a function. Internally after the call, we check if
    // logs were emitted in the expected order with the expected topics and data (as specified by the booleans)

    function mockCall(address, bytes calldata, bytes calldata) external;
    // Mocks a call to an address, returning specified data.
    // Calldata can either be strict or a partial match, e.g. if you only
    // pass a Solidity selector to the expected calldata, then the entire Solidity
    // function will be mocked.

    function clearMockedCalls() external;
    // Clears all mocked calls

    function expectCall(address, bytes calldata) external;
    // Expect a call to an address with the specified calldata.
    // Calldata can either be strict or a partial match

    function getCode(string calldata) external returns (bytes memory);
    // Gets the bytecode for a contract in the project given the path to the contract.

    function assume(bool) external;
    // When fuzzing, generate new inputs if conditional not met
}

contract ContractTest is DSTest, Gosu {

    Gosu myGosu = new Gosu();
    function setUp() public {}

    function testCreateGame() public {
        myGosu.createGame{value: 1}();
        (uint256 betAmount, address player, address opponent, uint256 dateOfGame, GameState state) = myGosu.gamesMapping(address(this), 0);
        DSTest.assertTrue(betAmount == 1);
        DSTest.assertTrue(state == GameState.RUNNING);
        DSTest.assertTrue(player == address(this));
        DSTest.assertTrue(opponent == address(0));
        DSTest.assertTrue(dateOfGame == block.timestamp);
        DSTest.assertTrue(address(myGosu).balance == 1);
    }

    function testFailCreateTwoGame() public {
        CheatCodes cheats = CheatCodes(DSTest.HEVM_ADDRESS);
        cheats.expectRevert("You already have an active game");
        myGosu.createGame{value: 5}();
        myGosu.createGame{value: 1}();
    }

    function testCreateAndJoinGame() public {
        CheatCodes cheats = CheatCodes(DSTest.HEVM_ADDRESS);

        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");
        cheats.prank(address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78));
        myGosu.joinGame{value: 1}(address(this));

        (,, address opponent,,) = myGosu.gamesMapping(address(this), 0);
        DSTest.assertTrue(opponent == 0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
    }

    function testCreateAndSetWinner() public {
        CheatCodes cheats = CheatCodes(DSTest.HEVM_ADDRESS);

        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");
        cheats.prank(address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78));
        myGosu.joinGame{value: 1}(address(this));

        myGosu.setWinner(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78);
        (,,,, GameState state) = myGosu.gamesMapping(address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78), 0);
        DSTest.assertTrue(state == GameState.OPPONENT_WIN);
        (,,,,state) = myGosu.gamesMapping(address(this), 0);
        DSTest.assertTrue(state == GameState.RUNNING); //should be the same as precedent assert
    }

    /*function testCreateAndSetWinner2() public {
        CheatCodes cheats = CheatCodes(DSTest.HEVM_ADDRESS);

        myGosu.createGame{value: 1}();
        address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78).call{value: 1}("");
        cheats.prank(address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78));
        myGosu.joinGame{value: 1}(address(this));

        myGosu.setWinner(address(this));
        (,,,, GameState state) = myGosu.gamesMapping(address(0x2044fB0BeD650B3771b7af0BB56dbf0A6f337b78), 0);
        DSTest.assertTrue(state == GameState.PLAYER_WIN);
    }*/
}

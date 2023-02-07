// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Collection.sol";

contract NFTFactory {
    event CollectionCreated(address collection, string name, string symbol);

    function createCollection(string memory name_, string memory symbol_) public {
        Collection collection = new Collection(name_, symbol_);
        collection.transferOwnership(msg.sender);
        emit CollectionCreated(address(collection), name_, symbol_);
    }
}

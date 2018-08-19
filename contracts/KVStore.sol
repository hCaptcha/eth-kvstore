pragma solidity ^0.4.24;


contract KVStore {
    
    uint constant private MAX_STRING_LENGTH = 1000;
    mapping(address => mapping(string => string)) private store;

    function get(address _account, string _key) public view returns(string) {
        return store[_account][_key];
    }

    function set(string _key, string _value) public {
        require(bytes(_key).length <= MAX_STRING_LENGTH && bytes(_value).length <= MAX_STRING_LENGTH);
        store[msg.sender][_key] = _value;
    }
}

pragma solidity ^0.4.24;


contract KVStore {
    
    enum AccessRight { Revoked, Invoked }
    uint constant private MAX_STRING_LENGTH = 1000;

    mapping(address => mapping(string => string)) private store;
    mapping(address => mapping(address => uint)) private authorizedAccounts;

    constructor() public {
        authorizeAccount(msg.sender);
    }

    function authorizeAccount(address _account) public {
        authorizedAccounts[_account][msg.sender] = uint(AccessRight.Invoked);
    }

    function revokeAccount(address _account) public {
        require(_account != msg.sender);
        authorizedAccounts[_account][msg.sender] = uint(AccessRight.Revoked);
    }

    function isAuthorized(address _account) public view returns(uint) {
        return authorizedAccounts[_account][msg.sender];
    }

    function get(address _account, string _key) public view returns(string) {
        require(authorizedAccounts[msg.sender][_account] == uint(AccessRight.Invoked));
        return store[_account][_key];
    }

    function set(string _key, string _value) public {
        require(bytes(_key).length <= MAX_STRING_LENGTH && bytes(_value).length <= MAX_STRING_LENGTH);
        store[msg.sender][_key] = _value;
    }
}
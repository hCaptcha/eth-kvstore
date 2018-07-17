# Key-value store for accounts and public keys

Store account-specific public keys. Give access to other accounts and authorize and revoke other accounts.

## Prerequisites

#### Setup an .env file into the root of the project.

```
touch .env
```

#### Setup your Ethereum wallet and save a 12-word mnemonic.

A good source for this is MetaMask: https://metamask.io/.

We are also going to deploy the contract later to the Rinkeby test network so getting some Ether on Rinkeby will be useful: https://faucet.rinkeby.io/

After you have the mnemonic, insert it into the .env file:

```
MNEMONIC='your 12 word mnemonic goes right here next to the mnemonic variable'
```

#### Setup Infura

Infura is used to access the Ethereum network. Get your own tokens from: https://infura.io/.
Once you have the token urls to different networks, such as: https://rinkeby.infura.io/myc00l1nfur4t0ken, insert only the token part to the .env file:

```
INFURA_TOKEN='myc00l1nfur4t0ken'
```

#### Setup Ganache

Install and run from: https://truffleframework.com/ganache/

#### Install Truffle

```
npm install -g truffle
```

### Running the project

#### Install all project dependencies

```
npm install
```

#### Compile the smart contract

```
truffle compile
```

#### Migrate the smart contract to your local test network

```
truffle migrate
```

## Interact with the contract

You can interact with the contract locally now with the following command:

```
truffle develop
```

#### Easier approach

Alternatively you can use remix.ethereum.org to interact with the contract.
Copy the contract from `contracts/KVStore.sol` and paste it to the browser window of Remix.
Compile the contract.

A deployed contract can be used on the Rinkeby network by pasting the following address to the `Load contract from Address` input field:
`0xe9d4e0fd7eef1cb8691d09a52c9ee6a7b2ac1785` in the `Run` tab and clicking `At Address`.

#### Challenge 1:

Try storing a key-value pair by using the `set` method. Can you retrieve the value with your own account?

#### Challenge 2:

Authorize another one of your wallets with the `authorizeAccount` method. Can that account retrieve the value you stored prior?

#### Challenge 3:

Revoke access to one of your authorized accounts with `revokeAccount` method. Set a new key-value pair. Can the revoked account retrieve the newly set value?

**If it seems that normal `set` and `get` functionality doesn't work on Rinkeby, try using the `authorizeAccount` function on your own account first and try again. Also take into consideration that it takes atleast 15 seconds for the transaction to be handled.**

## Running the tests

We use Truffle to run our tests:

```
truffle test
```

### Most important tests

Tests can be inspected in the `test/kvstore.js` file.

We check that the transacting account can authorize other accounts to it's key-value store

```
adds an account to authorized account
```

We can revoke access account's address to our key-value store

```
removes an account from authorized accounts
```

An authorized account can successfully retrieve data with our stored key

```
returns the correct value to an authorized account
```

Unauthorized accounts can't access our data

```
doesn't return a value to an unauthorized account
```

## Deployment

We can see our networks in the `truffle.js` file. An example of the rinkeby configuration:

```
rinkeby: {
  provider: () => {
    return new HDWalletProvider(
      MNEMONIC,
      `https://rinkeby.infura.io/${INFURA_TOKEN}`
    );
  },
  network_id: "4"
}
```

As long as the correct `network_id` is referencing the correct Infura network endpoint and the wallet with the 12-word mnemonic has funds on that network, the migration is very simple. For example:

```
truffle migrate --network rinkeby
```

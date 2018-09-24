## eth-kvstore
[![Travis Build Status](https://travis-ci.org/hCaptcha/eth-kvstore.svg?&branch=master)](https://travis-ci.org/hCaptcha/eth-kvstore)

A way to store key-value pairs tied to your ethereum address.

## Motivation
We built this smart contract for our own needs in the [HUMAN Protocol](https://www.hmt.ai/) to allow ethereum addresses to publish and rotate public keys for signing and encrypting arbitrary data.

Separating identity (ETH addr keypair) and signing/encryption (public key published by ETH addr) means we avoid putting the identity key at risk via chosen-plaintext or known-plaintext attacks on the signing/encryption keys, and can easily rotate signing/encryption keys as needed.

## Prerequisites
Three environment variables are needed to interact with the contract:
```
const { MNEMONIC, INFURA_TOKEN, KVSTORE_ADDRESS } = process.env;
```

`MNEMONIC` is a list containing 12 to 24 words that ensure certain entropy to our wallet's security. You can get your 12-word mnemonic easily from https://metamask.io/

`INFURA_TOKEN` is our gateway to the Ethereum blockchain and lets us easily interact with our contract without setting up our own node. You can get your token easily from https://infura.io/

`KVSTORE_ADDRESS` is the location where KVStore has been deployed. Current location of our Ropsten testnet deployment is in the following address: `0xc1db3c61b47d1f7d6529e435d5b360865a3130bc`. You can also deploy your own KVStore by following the `Deployment` section of the guide.

Once you have setup all the needed prerequisites, setup your local `.env` file in the root of your project
```
touch .env
```
with the following content:
```
MNEMONIC=<your mnemonic>
INFURA_TOKEN=<your infura token>
KVSTORE_ADDRESS=<your kvstore address>
```

## Get started

Main prerequisites to get going are:
1. Setup all the env variables in `Prerequisites`
2. Copy the `KVStore.json` to your project's folder.

An example application using eth-kvstore could look something like the following code snippet:

```
require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const KVStore = require('./build/contracts/KVStore.json');

const { MNEMONIC, INFURA_TOKEN, KVSTORE_ADDRESS } = process.env;

const provider = new HDWalletProvider(
  MNEMONIC,
  `https://ropsten.infura.io/${INFURA_TOKEN}`,
);
const web3 = new Web3(provider);

const RopstenKVStore = new web3.eth.Contract(KVStore.abi, KVSTORE_ADDRESS);

const set = async (key, value) => {
  const [accountOne] = await web3.eth.getAccounts();
  const receipt = await RopstenKVStore.methods.set(key, value).send({
    from: accountOne,
  });
  console.log(receipt);
  return receipt;
};

const get = async (key) => {
  const [accountOne] = await web3.eth.getAccounts();

  const value = await RopstenKVStore.methods.get(accountOne, key).call({
    from: accountOne,
  });
  console.log(value);
  return value;
};

set('satoshi', 'nakamoto');
get('satoshi');
```

## Installation
You need Node as your environmental dependency. At the moment this is guaranteed to work with Node 8.

```
npm install
npm run compile
```

## Testing
```
npm run test
```

## Deployment
If you want to deploy your own KVStore to the Ethereum blockchain, you need to install Ganache first. Easiest way to get started is to install it from https://truffleframework.com/ganache

### Local deployment
```
truffle migrate
```

### Testnet deployment
Currently we support the following testnets: Mainnet, Kovan, Ropsten, Rinkeby.
```
truffle migrate --network ropsten
```

## Contribute
We welcome all pull requests! Please ensure you lint before the commit.
```
npm run lint
```
You can inspect more of our linting scripts at `package.json`.
Please submit your pull request against our `staging` branch.
If you find a bug feel free to [Click](https://github.com/hCaptcha/bounties)

## Prior Work
An earlier version of our specification was implemented at: https://github.com/willhay/kvstore.

## License
MIT &copy; HUMAN Protocol 

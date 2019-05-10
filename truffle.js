require('dotenv').config();

const { INFURA_TOKEN, MNEMONIC, ETH_HOST, ETH_PORT } = process.env;
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host:  ETH_HOST || '127.0.0.1',
      port: ETH_PORT || 7545,
      network_id: '*',
    },
    live: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://mainnet.infura.io/${INFURA_TOKEN}`),
      network_id: '1',
    },
    kovan: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://kovan.infura.io/${INFURA_TOKEN}`),
      network_id: '2',
    },
    ropsten: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://ropsten.infura.io/${INFURA_TOKEN}`),
      network_id: '3',
      gas: 4700000,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://quiknode.io/node/5bb3730c-b155-48ed-9b39-0ef9c3c76c92/QJp4SJ9fMZWnrqE3YN8zJQ=='),
      network_id: '4',
    },
  },

  compilers: {
    solc: {
      version: '0.4.24'
    }
  }
};

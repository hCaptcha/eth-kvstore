const fs = require('fs');
const path = require('path');

const ADDRESS_OUTPUT_FILENAME = process.env.ADDRESS_OUTPUT_FILENAME || '/deployed/ethkvstore.address.json';
const KVStore = artifacts.require('./KVStore.sol');

module.exports = (deployer) => {
  deployer
    .deploy(KVStore)
    .then(() => {
      const fileContent = {
        address: KVStore.address,
      };

      try {
        fs.mkdirSync(path.dirname(ADDRESS_OUTPUT_FILENAME));
      } catch (err) {
        if (err.code !== 'EEXIST') throw err;
      }

      fs.writeFile(ADDRESS_OUTPUT_FILENAME, JSON.stringify(fileContent, null, 2), (err) => {
        if (err) {
          console.error(`unable to write address to output file: ${ADDRESS_OUTPUT_FILENAME}`);
        } else {
          console.log(`deployed hmt token address stored in ${ADDRESS_OUTPUT_FILENAME}`);
        }
      });
    });
};

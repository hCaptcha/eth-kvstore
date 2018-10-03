require('dotenv').config();

const armlet = require('armlet');

const { MYTHRIL_API_KEY, EMAIL, KVSTORE_BYTECODE } = process.env;
const client = new armlet.Client({ apiKey: MYTHRIL_API_KEY, userEmail: EMAIL });

client.analyze({ bytecode: KVSTORE_BYTECODE, timeout: 500000 })
  .then((issues) => {
    console.log(issues);
  }).catch((err) => {
    console.log(err);
  });

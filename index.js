const Web3 = require('web3');
const erc20Abi = require('human-standard-token-abi');
const INFURA_ENDPOINT = "https://rinkeby.infura.io/v3/64a2626b0570450fb688d9f7c0866316"
const INFURA_PROJECT_ID = "64a2626b0570450fb688d9f7c0866316"
const WALLET_ADDRESS = "0xA145ac099E3d2e9781C9c848249E2e6b256b030D"

const Wallet = require('./services/ethereumWallet.js');
const wallet = new Wallet(WALLET_ADDRESS, INFURA_PROJECT_ID);


wallet.getBalances().then((balances) => {
    console.log(balances);
});



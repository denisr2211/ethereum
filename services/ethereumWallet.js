const Web3 = require('web3');
const erc20Abi = require('human-standard-token-abi');
const { getCoins } = require("./coins");

class EthereumWallet {
    constructor(walletAddress, infuraProjectId) {
        this.walletAddress = walletAddress;
        this.web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${infuraProjectId}`));
    }

    async getBalanceOfEthereum() {
        let balance = await this.web3.eth.getBalance(this.walletAddress);
        return { coin: "Ethereum", balance: this.web3.utils.fromWei(balance, "ether") };
    }

    async getBalances() {
        let balances = [];
        let promises = [];
        promises.push(this.getBalanceOfEthereum().then((balance) => {
                balances.push(balance);
            })
        );

        let coins = await getCoins();
        for (let coin of coins) {
            if (coin.platforms.ethereum) {
                const contract = new this.web3.eth.Contract(erc20Abi, coin.platforms.ethereum);
                const p = contract.methods.balanceOf(this.walletAddress).call().then((balance) => {
                    if (balance > 0) {
                        balance = this.web3.utils.fromWei(balance, "ether");
                        balances.push({ coin:coin.name, balance })
                        console.log('pushed');
                    }
                }).catch((e) => {
                    console.log(e);
                });

                promises.push(p)

            }
        }
        await Promise.all(promises);
        return balances;
    }
}

module.exports = EthereumWallet
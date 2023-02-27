
const axios = require('axios');


module.exports = {
    async getCoins() {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true');
        return data;
    },
}
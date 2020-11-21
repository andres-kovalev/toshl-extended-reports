const ToshlAPI = require('../src/helpers/toshl');

module.exports = async ({ query }, res) => {
    const { token } = query;

    res.status(200).json(await getTotals(token));
};

async function getTotals(token) {
    try {
        if (!token) {
            throw new Error('API token is required!');
        }

        const accounts = await ToshlAPI.accounts(token);
        const totals = accounts.reduce(sum, {});

        return Object.entries(totals).map(
            ([ currency, amount ]) => ({ currency, amount })
        );
    } catch (e) {
        return {
            error: e.message
        };
    }
}

function sum(map, { balance, currency }) {
    if (!balance) {
        return map;
    }

    const { code } = currency;

    // eslint-disable-next-line no-param-reassign
    map[code] = (map[code] || 0) + balance;

    return map;
}

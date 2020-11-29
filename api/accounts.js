const ToshlAPI = require('../src/helpers/toshl');

module.exports = async ({ query }, res) => {
    const { token } = query;

    res.status(200).json(await getAccounts(token));
};

async function getAccounts(token) {
    try {
        if (!token) {
            throw new Error('API token is required!');
        }

        const accounts = await ToshlAPI.accounts(token);

        return accounts.map(({ id, name, currency, balance }) => ({
            id,
            name,
            currency: currency.code,
            amount: balance
        }));
    } catch (e) {
        return {
            error: e.message
        };
    }
}

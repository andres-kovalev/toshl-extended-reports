const ToshlAPI = require('../src/helpers/toshl');

module.exports = async ({ query }, res) => {
    res.status(200).json(await login(query.token));
}

async function login(token) {
    try {
        if (!token) {
            throw new Error('API token is required!');
        }

        const me = await ToshlAPI.me(token);

        if (!me.id) {
            throw new Error('Invalid API token!');
        }

        return {
            isLoggedIn: true
        };
    } catch (e) {
        return {
            error: e.message
        };
    }
}

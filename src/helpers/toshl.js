const base64 = require('base-64');

const { HOST, API } = require('../consts/toshl');
const { requestJson } = require('./request');

const getAuth = (token) => `Basic ${ base64.encode(`${ token }:`) }`;

const request = (api, token, params) => {
    const url = `${ HOST }${ api }`;
    const headers = {
        Authorization: getAuth(token)
    };

    return requestJson(url, params, headers);
};

async function infiniteRequest(api, token, params = {}, page = 0, per_page = 500) {
    const items = await request(api, token, { ...params, page, per_page });

    // eslint-disable-next-line camelcase
    return items.length === per_page
        ? items.concat(await infiniteRequest(api, token, params, page + 1, per_page))
        : items;
}

const apiRequest = (api, token, params) => infiniteRequest(api, token, params);

module.exports = {
    me: (token) => apiRequest(API.me, token),
    entries: (token, from, to) => apiRequest(API.entries, token, { from, to }),
    budgets: (token, from, to) => apiRequest(API.budgets, token, { from, to }),
    request,
    infiniteRequest,
    apiRequest
};

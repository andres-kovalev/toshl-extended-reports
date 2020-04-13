const fetch = require('node-fetch');

const buildQueryString = (params = {}) => Object.keys(params)
    .map(
        param => `${ param }=${ params[param] }`
    ).join('&');

const request = async (host, params, headers = {}) => {
    const query = buildQueryString(params);
    const url = `${ host }?${ query }`;

    const response = await fetch(url, { headers });
    const { status } = response;

    if (status === 200) {
        return response;
    }

    throw new Error(`Server responded with error (status ${ response.status }).`);
};

const requestJson = async (host, params, headers) => (await request(host, params, headers)).json();

module.exports = {
    requestJson
}

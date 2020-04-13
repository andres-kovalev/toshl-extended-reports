const fetch = require('node-fetch');
const base64 = require('base-64');

const TOKEN = process.env.GH_TOKEN;
const OWNER = process.env.CIRCLE_PROJECT_USERNAME;
const REPO = process.env.CIRCLE_PROJECT_REPONAME;
const PR_URL = process.env.CIRCLE_PULL_REQUEST;
const PR_NUMBER = PR_URL.split('/').pop();

const API = {
    base: 'https://api.github.com',
    getAuthHeader: () => ({
        Authorization: `Basic ${ base64.encode(`${ TOKEN }:`) }`
    }),
    get: (url, args = {}) => fetch(url, { method: 'GET', headers: API.getAuthHeader(), ...args }),
    post: (url, args = {}) => fetch(url, { method: 'POST', headers: API.getAuthHeader(), ...args }),
    comment: body => API.post(
        `${API.base}/repos/${OWNER}/${REPO}/issues/${PR_NUMBER}/comments`,
        {
            body: JSON.stringify({ body })
        }
    )
};

module.exports = API;

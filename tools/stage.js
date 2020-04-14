const { exec } = require('child_process');

const { writeFile } = require('./common');
const API = require('./gh-post');

function execute(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            // eslint-disable-next-line no-unused-expressions
            error
                ? reject(error)
                : resolve(stdout);
        });
    });
}

console.log('staging...');

execute('./node_modules/.bin/now --name $NOW_PROJECT --token=$NOW_TOKEN')
    .then(
        (url) => {
            console.log('staged...');

            writeFile('./stage-link.html', `<a href="${ url }">${ url }</a>`);

            console.log('commenting...');

            API.comment(`Stage url: [${ url }](${ url })`);
        }
    );

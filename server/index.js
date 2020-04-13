const express = require('express');

const PORT = process.env.PORT || 9000;
const app = express();

app.get(/\/api\/([a-z/]*)$/, (req, res) => {
    const api = req.params['0'];

    try {
        try {
            return res.status(200).json(require(`./mock/${api}.json`));
        } catch {}

        const apiFunction = require(`../api/${api}`);

        if (typeof apiFunction !== 'function') {
            throw new Error('Requested API is not found!');
        }

        apiFunction(req, res);
    } catch (e) {
        console.error(e.message);

        res.status(200).json({
            error: `Error occurred while trying to access "${api}"!`
        });
    }
});

app.listen(PORT, () => {
    console.log(`served on ${ PORT }...`);
});


async function fetchJson(api, token) {
    const response = await fetch(`/api/${ api }?token=${ token }`);

    return response.json();
}

export const login = (token) => fetchJson('login', token);

export const loadBudgets = (token) => fetchJson('budgets', token);

export const loadTotal = (token) => fetchJson('total', token);

export const loadRates = async (symbols) => {
    const response = await fetch(`https://api.ratesapi.io/api/latest?base=PLN&symbols=${ formatSymbols(symbols) }`);

    const { rates } = await response.json();

    return rates;
};

function formatSymbols(symbols) {
    return symbols
        .filter((symbol) => symbol !== 'BAM')
        .join(',');
}

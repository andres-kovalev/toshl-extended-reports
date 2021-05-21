async function fetchJson(api, token) {
    const response = await fetch(`/api/${ api }?token=${ token }`);

    return response.json();
}

export const login = (token) => fetchJson('login', token);

export const loadBudgets = (token) => fetchJson('budgets', token);

export const loadAccounts = (token) => fetchJson('accounts', token);

export const loadRates = async (symbols) => {
    const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=PLN');

    const { data } = await response.json();

    return Object.fromEntries(
        Object.entries(data.rates).filter(
            ([ symbol ]) => symbols.includes(symbol)
        )
    );
};

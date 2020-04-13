async function fetchJson(api, token) {
    const response = await fetch(`/api/${api}?token=${token}`);

    return response.json();
}

export const login = token => fetchJson('login', token);

export const loadBudgets = token => fetchJson('budgets', token);

const { dateToStr, strDateToDate, getDaysBetween } = require('../src/helpers/dateTime');
const ToshlAPI = require('../src/helpers/toshl');
const { isExpense, normalizeTransaction } = require('../src/helpers/transaction');
const { round } = require('../src/helpers/math');
const { identity, NOT, TRUE, AND, pipe, get, isIn, sum } = require('../src/helpers/fp');

const filterTypes = {
    '': identity,
    '!': NOT
};
const filterFields = {
    accounts: 'account',
    categories: 'category',
    tags: 'tag'
};

module.exports = async ({ query }, res) => {
    const { token, start, end } = query;

    res.status(200).json(await budgets(token, start, end));
};

async function budgets(token, start, end) {
    try {
        if (!token) {
            throw new Error('API token is required!');
        }

        const today = dateToStr(new Date());
        const startDate = start || today;
        const endDate = end || today;

        const budgetItmes = await ToshlAPI.budgets(token, startDate, endDate);
        const todayExpenses = (await ToshlAPI.entries(token, today, today))
            .filter(isExpense)
            .map(normalizeTransaction);

        return budgetItmes.map(formatBudget(todayExpenses));
    } catch (e) {
        return {
            error: e.message
        };
    }
}

function formatBudget(todayExpenses) {
    return (data) => {
        // eslint-disable-next-line camelcase
        const { id, name, from, to, limit, rollover_amount = 0, amount: spent } = data;
        const budget = limit + rollover_amount; // eslint-disable-line camelcase
        const budgetExpenses = todayExpenses.filter(createBudgetFilter(data));
        const spentToday = -budgetExpenses
            .map(get('value'))
            .reduce(sum, 0);
        const spentBefore = spent - spentToday;
        const restBefore = budget - spentBefore;

        const fromDate = strDateToDate(from);
        const toDate = strDateToDate(to);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const days = getDaysBetween(fromDate, toDate) + 1;
        const daysLeft = getDaysBetween(today, toDate) + 1;
        const daysBefore = days - daysLeft;

        const avgBudgetPerDay = budget / days;
        const restAvgBudgetPerDay = restBefore / daysLeft;
        const shouldRestAfter = (daysLeft - 1) * avgBudgetPerDay;
        const avgSpentPerDayBefore = spentBefore / daysBefore;
        const spentPrediction = avgSpentPerDayBefore * days;

        const indicators = {
            adaptive: createIndicator(restAvgBudgetPerDay, spentToday),
            optimistic: createIndicator(restBefore - shouldRestAfter, spentToday),
            average: createIndicator(avgBudgetPerDay, spentToday),
            prediction: createIndicator(budget, spentPrediction),
            full: createIndicator(budget, spent)
        };

        return { id, name, limit, indicators, isPrimary: isPrimary(data) };
    };
}

function createBudgetFilter(budget) {
    return Object.keys(filterTypes).reduce(
        (filter, type) => {
            const modifier = filterTypes[type];

            return Object.keys(filterFields).reduce(
                (subFilter, budgetField) => {
                    const array = budget[`${ type }${ budgetField }`];
                    const expenseField = filterFields[budgetField];

                    return array
                        ? AND(subFilter, pipe(
                            get(expenseField),
                            modifier(isIn(array))
                        ))
                        : subFilter;
                },
                filter
            );
        },
        TRUE
    );
}

function createIndicator(budget, spent) {
    return {
        budget: round(budget, 2),
        spent: round(spent, 2),
        rest: round(budget - spent, 2)
    };
}

function isPrimary(budget) {
    return !Object.keys(filterTypes).some(
        (filterType) => Object.keys(filterFields).some(
            (filterField) => `${ filterType }${ filterField }` in budget
        )
    );
}

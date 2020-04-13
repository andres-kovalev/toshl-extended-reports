const isTransaction = ({ transaction }) => !transaction;
const isExpense = entry => entry.amount < 0 && isTransaction(entry);

const normalizeTransaction = ({ date, account, category, tags, amount, currency }) => ({
    date,
    account,
    category,
    tags,
    value: amount / currency.main_rate
});

module.exports = {
    isExpense,
    normalizeTransaction
}

const identity = value => value;
const constant = value => () => value;
const TRUE = constant(true);

const NOT = func => (...args) => !func(...args);
const AND = (...funcs) => value => funcs.every(func => func(value));

const extract = field => obj => obj[field];
const isEqualTo = expected => value => value === expected;
const isIn = (values = []) => value => values.some(isEqualTo(value));

const sum = (currentSum, item) => currentSum + item;

const pipe = (...maps) => initialValue => maps.reduce(
    (value, map) => map(value),
    initialValue
);

const get = path => pipe(
    ...path.split('.').map(
        field => extract(field)
    )
);

module.exports = {
    identity,
    TRUE,
    NOT,
    AND,
    isIn,
    sum,
    pipe,
    get
};

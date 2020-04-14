const padLeft = (str, length, pad) => `${ new Array(
    Math.ceil(length / pad.length)
)
    .fill(pad)
    .join('') }${ str }`.substr(-length);

const dateToStr = (date) => [
    date.getFullYear(),
    padLeft(date.getMonth() + 1, 2, '0'),
    padLeft(date.getDate(), 2, '0')
].join('-');

const strDateToDate = (string) => {
    const [ year, month, day ] = string
        .split('-')
        .map(Number);

    return new Date(year, month - 1, day);
};

const getDaysBetween = (from, to) => (to - from) / 1000 / 60 / 60 / 24;

module.exports = {
    dateToStr,
    strDateToDate,
    getDaysBetween
};

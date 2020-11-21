import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { ReloadableBox } from '../ReloadableBox';
import { tokenSelector } from '../../store/login';
import { loadTotal, totalSelector, actions } from '../../store/total';
import { round } from '../../helpers/math';

import styles from './Total.module.scss';

const selector = createSelector(
    tokenSelector,
    totalSelector,
    (token, { totals, rates, currency }) => ({ token, totals, rates, currency })
);

export const Total = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const { token, totals, rates, currency: selectedCurrency } = useSelector(selector);
    const dispatch = useDispatch();
    const [ , setError ] = useState('');

    const reload = useCallback(() => {
        setIsLoading(true);

        dispatch(loadTotal(token, (result) => {
            if (result.error) {
                setError(result.error);
            }

            setIsLoading(false);
        }));
    }, [ dispatch, token ]);

    useEffect(() => {
        if (totals) {
            return;
        }

        reload();
    }, [ totals, reload ]);

    if (isLoading) {
        return (
            <ReloadableBox loading reload={ () => {} }>
                <div className={ styles.container }>
                    <div className={ styles.placeholer }>Loading...</div>
                </div>
            </ReloadableBox>
        );
    }

    const multiplier = rates[selectedCurrency];
    const total = totals.map(
        ({ currency, amount }) => (rates[currency]
            ? amount / rates[currency]
            : 0)
    ).reduce(sum);

    return (
        <ReloadableBox reload={ reload }>
            <div className={ styles.container }>
                <h2 className={ styles.main }>
                    { round(total * multiplier, 2) } { selectedCurrency }
                </h2>
                <div className={ styles.totals }>
                    { totals.map(({ amount, currency }) => (
                        <div key={ currency } className={ styles.amount }>
                            { round(amount, 2) }
                            <button
                                onClick={ () => dispatch(actions.setCurrency(currency)) }
                                className={ styles.currency }
                            >
                                { currency }
                            </button>
                        </div>
                    )) }
                </div>
            </div>
        </ReloadableBox>
    );
};

function sum(acc, value) {
    return acc + value;
}

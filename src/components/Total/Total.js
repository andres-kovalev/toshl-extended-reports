import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { ReloadableBox } from '../ReloadableBox';
import { tokenSelector } from '../../store/login';
import { accountsSelector, loadData, actions } from '../../store/accounts';
import { round } from '../../helpers/math';

import styles from './Total.module.scss';

const selector = createSelector(
    tokenSelector,
    accountsSelector,
    (token, { accounts, rates, currency }) => ({ token, accounts, rates, currency })
);

export const Total = () => {
    const { token, accounts, rates, currency: selectedCurrency } = useSelector(selector);
    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ] = useState(!accounts);
    const [ , setError ] = useState('');

    const reload = useCallback(() => {
        setIsLoading(true);

        dispatch(loadData(token, (result) => {
            if (result.error) {
                setError(result.error);
            }

            setIsLoading(false);
        }));
    }, [ dispatch, token ]);

    useEffect(() => {
        if (accounts) {
            return;
        }

        reload();
    }, [ accounts, reload ]);

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
    const totals = sumByCurrency(
        accounts.filter(
            ({ currency }) => (currency in rates)
        )
    );
    const total = totals.map(
        ({ currency, amount }) => amount / rates[currency]
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

function sumByCurrency(accounts) {
    const map = accounts.reduce((reduced, { currency, amount }) => ({
        ...reduced,
        [currency]: (reduced[currency] || 0) + amount
    }), {});

    return Object.entries(map).map(
        ([ currency, amount ]) => ({ currency, amount })
    );
}

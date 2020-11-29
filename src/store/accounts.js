import { createSlice, createSelector } from '@reduxjs/toolkit';

import * as API from '../helpers/api';
import { distinct } from '../helpers/common';

export const {
    reducer,
    actions
} = createSlice({
    name: 'accounts',
    initialState: {
        currency: 'PLN'
    },
    reducers: {
        setData: (state, action) => ({ ...state, ...action.payload }),
        setCurrency: (state, action) => ({ ...state, currency: action.payload })
    }
});

export function loadData(token, callback) {
    return async (dispatch) => {
        const accounts = await API.loadAccounts(token);
        const symbols = distinct(
            accounts.map(
                ({ currency }) => currency
            )
        );

        const rates = await API.loadRates(symbols);

        if (!accounts.error) {
            dispatch(actions.setData({ accounts, rates }));
        }

        callback(accounts, rates);
    };
}

export const accountsSelector = createSelector(
    (state) => state.accounts,
    (state) => {
        const { accounts, rates, currency } = state || {};

        return { accounts, rates, currency };
    }
);

import { createSlice, createSelector } from '@reduxjs/toolkit';

import * as API from '../helpers/api';

export const {
    reducer,
    actions
} = createSlice({
    name: 'total',
    initialState: null,
    reducers: {
        setTotal: (state, action) => ({ ...action.payload, currency: 'PLN' }),
        setCurrency: (state, action) => ({ ...state, currency: action.payload })
    }
});

export function loadTotal(token, callback) {
    return async (dispatch) => {
        const totals = await API.loadTotal(token);
        const symbols = totals.map(
            ({ currency }) => currency
        );
        const rates = await API.loadRates(symbols);

        if (!totals.error) {
            dispatch(actions.setTotal({ totals, rates }));
        }

        callback(totals, rates);
    };
}

export const totalSelector = createSelector(
    (state) => state.total,
    (total) => {
        const { totals, rates, currency } = total || {};

        return { totals, rates, currency };
    }
);

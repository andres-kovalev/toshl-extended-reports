import { createSlice, createSelector } from '@reduxjs/toolkit';

import * as API from '../helpers/api';

export const {
    reducer,
    actions
} = createSlice({
    name: 'budgets',
    initialState: null,
    reducers: {
        setBudgets: (state, action) => action.payload
    }
});

export function loadBudgets(token, callback) {
    return async dispatch => {
        const budgets = await API.loadBudgets(token);

        if (!budgets.error) {
            dispatch(actions.setBudgets(budgets));
        }

        callback(budgets);
    };
}

export const budgetsSelector = createSelector(
    state => state,
    state => state.budgets
);

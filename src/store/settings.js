import { createSlice } from '@reduxjs/toolkit';

export const {
    reducer,
    actions
} = createSlice({
    name: 'settings',
    initialState: {
        hiddenBudgets: getArray('hiddenBudgets'),
        hiddenAccounts: getArray('hiddenAccounts')
    },
    reducers: {
        setHiddenBudgets: (state, action) => ({
            ...state,
            hiddenBudgets: action.payload
        }),
        setHiddenAccounts: (state, action) => ({
            ...state,
            hiddenAccounts: action.payload
        })
    }
});

export function saveHiddenBudgets(budgets) {
    return async (dispatch) => {
        setArray('hiddenBudgets', budgets);

        dispatch(actions.setHiddenBudgets(budgets));
    };
}

export function saveHiddenAccounts(accounts) {
    return async (dispatch) => {
        setArray('hiddenAccounts', accounts);

        dispatch(actions.setHiddenAccounts(accounts));
    };
}

export const settingsSelector = (state) => state.settings;

function getArray(field) {
    return JSON.parse(localStorage.getItem(field) || '[]');
}

function setArray(field, array) {
    localStorage.setItem(field, JSON.stringify(array));
}

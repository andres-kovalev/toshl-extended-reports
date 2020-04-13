import { createSlice, createSelector } from '@reduxjs/toolkit';

import * as API from '../helpers/api';

export const {
    reducer,
    actions
} = createSlice({
    name: 'login',
    initialState: {
        token: localStorage.getItem('token')
    },
    reducers: {
        setToken: (state, action) => ({
            token: action.payload
        })
    }
});

export function login(token, callback) {
    return async dispatch => {
        const result = await API.login(token);

        if (!result.error) {
            localStorage.setItem('token', token);

            dispatch(actions.setToken(token));
        }

        callback(result);
    };
}

export const tokenSelector = createSelector(
    state => state.login,
    login => login.token
);

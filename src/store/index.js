import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { reducer as login } from './login';

const reducer = combineReducers({
    login
});

export const store = configureStore({ reducer });

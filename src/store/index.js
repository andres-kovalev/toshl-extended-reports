import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { reducer as login } from './login';
import { reducer as budgets } from './budgets';

const reducer = combineReducers({
    login,
    budgets
});

export const store = configureStore({ reducer });

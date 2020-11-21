import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { reducer as login } from './login';
import { reducer as budgets } from './budgets';
import { reducer as settings } from './settings';
import { reducer as total } from './total';

const reducer = combineReducers({
    login,
    budgets,
    settings,
    total
});

export default configureStore({ reducer });

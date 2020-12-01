import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { reducer as login } from './login';
import { reducer as budgets } from './budgets';
import { reducer as settings } from './settings';
import { reducer as accounts } from './accounts';

const reducer = combineReducers({
    login,
    budgets,
    settings,
    accounts
});

export default configureStore({ reducer });

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { reducer as login } from './login';
import { reducer as budgets } from './budgets';
import { reducer as settings } from './settings';

const reducer = combineReducers({
    login,
    budgets,
    settings
});

export default configureStore({ reducer });

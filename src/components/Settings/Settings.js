import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { Placeholder } from '../Placeholder';
import { saveHiddenAccounts, saveHiddenBudgets, settingsSelector } from '../../store/settings';
import { budgetsSelector } from '../../store/budgets';
import { accountsSelector } from '../../store/accounts';

import { Checkboxes } from './Checkboxes';
import { Item } from './Item';

const selector = createSelector(
    budgetsSelector,
    accountsSelector,
    settingsSelector,
    (budgets, { accounts }, { hiddenBudgets, hiddenAccounts }) => ({
        budgets,
        accounts,
        hiddenBudgets,
        hiddenAccounts
    })
);

export function Settings() {
    const { budgets, accounts, hiddenBudgets, hiddenAccounts } = useSelector(selector);
    const dispatch = useDispatch();

    const hasBudgets = Boolean(budgets?.length);
    const hasAccounts = Boolean(accounts?.length);

    if (!hasBudgets && !hasAccounts) {
        return (
            <Placeholder label='Nothing to configure' />
        );
    }

    return (
        <Switch>
            { hasBudgets && (
                <Route path='/settings/budgets'>
                    <Checkboxes
                        header='Budgets'
                        backTo='/settings'
                        items={ budgets }
                        unchecked={ hiddenBudgets }
                        onChange={
                            (newHiddenBudgets) => dispatch(saveHiddenBudgets(newHiddenBudgets))
                        }
                    />
                </Route>
            ) }
            { hasAccounts && (
                <Route path='/settings/accounts'>
                    <Checkboxes
                        header='Accounts'
                        backTo='/settings'
                        items={ accounts }
                        unchecked={ hiddenAccounts }
                        onChange={
                            (newHiddenAccounts) => dispatch(saveHiddenAccounts(newHiddenAccounts))
                        }
                    />
                </Route>
            ) }
            <Route path='/settings'>
                { hasBudgets && <Item label='Budgets' to='/settings/budgets' /> }
                { hasAccounts && <Item label='Accounts' to='/settings/accounts' /> }
            </Route>
        </Switch>
    );
}

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { Placeholder } from '../Placeholder';
import { saveHidden, hiddenSelector } from '../../store/settings';
import { budgetsSelector } from '../../store/budgets';

import { Checkboxes } from './Checkboxes';
import { Item } from './Item';

const selector = createSelector(
    budgetsSelector,
    hiddenSelector,
    (budgets, hidden) => ({ budgets, hidden })
);

export function Settings() {
    const { budgets, hidden } = useSelector(selector);
    const dispatch = useDispatch();

    if (!budgets || !budgets.length) {
        return (
            <Placeholder label='Nothing to configure' />
        );
    }

    return (
        <Switch>
            <Route path='/settings/budgets'>
                <Checkboxes
                    header='Budgets'
                    backTo='/settings'
                    items={ budgets }
                    unchecked={ hidden }
                    onChange={
                        (newHiddenBudgets) => dispatch(saveHidden(newHiddenBudgets))
                    }
                />
            </Route>
            <Route path='/settings'>
                <Item label='Budgets' to='/settings/budgets' />
            </Route>
        </Switch>
    );
}

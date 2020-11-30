import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { Placeholder } from '../Placeholder';
import { saveHidden, hiddenSelector } from '../../store/settings';
import { budgetsSelector } from '../../store/budgets';

import { Checkboxes } from './Checkboxes';

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
        <Checkboxes
            items={ budgets }
            unchecked={ hidden }
            onChange={
                (newHiddenBudgets) => dispatch(saveHidden(newHiddenBudgets))
            }
        />
    );
}

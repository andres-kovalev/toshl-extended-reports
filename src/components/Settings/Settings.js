import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { Placeholder } from '../Placeholder';
import { saveHidden, hiddenSelector } from '../../store/settings';
import { budgetsSelector } from '../../store/budgets';

import { Checkbox } from './Checkbox';

import styles from './Settings.module.scss';

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

    const hiddenSet = new Set(hidden);

    return (
        <div className={ styles.container }>
            { budgets.map(({ id, name }) => {
                const checked = !hiddenSet.has(id);

                return (
                    <Checkbox
                        key={ id }
                        id={ id }
                        label={ name }
                        checked={ checked }
                        onChange={() => {
                            const newHidden = checked
                                ? hidden.concat([ id ])
                                : hidden.filter(
                                    (hiddenId) => hiddenId !== id
                                );

                            dispatch(saveHidden(newHidden));
                        }}
                    />
                );
            }) }
        </div>
    );
}

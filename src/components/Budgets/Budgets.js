import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { ReloadableBox } from '../ReloadableBox';
import { Placeholder } from '../Placeholder';
import { tokenSelector } from '../../store/login';
import { loadBudgets, budgetsSelector } from '../../store/budgets';
import { hiddenSelector } from '../../store/settings';

import { Budget } from './Budget';
import { BudgetSkeleton } from './BudgetSkeleton';

const selector = createSelector(
    tokenSelector,
    budgetsSelector,
    hiddenSelector,
    (token, budgets, hidden) => ({ token, budgets, hidden })
);

/* eslint-disable react/no-array-index-key */
const loadingContent = (
    <React.Fragment>
        {Array(7).fill(0).map((_, key) => (
            <BudgetSkeleton key={ `${ key }` } />
        ))}
    </React.Fragment>
);
/* eslint-enable react/no-array-index-key */

export const Budgets = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const { token, budgets, hidden } = useSelector(selector);
    const dispatch = useDispatch();
    const [ , setError ] = useState('');

    const reload = useCallback(() => {
        setIsLoading(true);

        dispatch(loadBudgets(token, (result) => {
            if (result.error) {
                setError(result.error);
            }

            setIsLoading(false);
        }));
    }, [ dispatch, token ]);

    useEffect(() => {
        if (budgets) {
            return;
        }

        reload();
    }, [ budgets, reload ]);

    const firstLoad = isLoading && !budgets;
    const itemsToLoad = (isLoading ? [] : (budgets || []))
        .filter(({ id }) => !hidden.includes(id))
        .sort(byPriority);
    const loadedContent = budgets && budgets.length
        ? itemsToLoad.map(({ id, ...budget }) => (
            <Budget key={ id } budget={ budget } />
        )) : <Placeholder label='No budgets' />;
    const content = isLoading
        ? loadingContent
        : loadedContent;

    return (
        <ReloadableBox loading={ isLoading && !firstLoad } reload={ reload } >
            { content }
        </ReloadableBox>
    );
};

function byPriority(budget1, budget2) {
    return budget2.isPrimary - budget1.isPrimary;
}

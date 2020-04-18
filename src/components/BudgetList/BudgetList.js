import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { Loading } from '..';
import BudgetListContainer from './BudgetListContainer';
import { loadBudgets, budgetsSelector } from '../../store/budgets';
import { tokenSelector } from '../../store/login';

const selector = createSelector(
    tokenSelector,
    budgetsSelector,
    (token, budgets) => ({ token, budgets })
);

export default function BudgetList() {
    const { token, budgets } = useSelector(selector);
    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ] = useState(!budgets);
    const [ error, setError ] = useState('');

    const refresh = () => {
        setIsLoading(true);

        dispatch(loadBudgets(token, (result) => {
            if (result.error) {
                setError(result.error);
            }

            setIsLoading(false);
        }));
    };

    useEffect(() => {
        if (budgets) {
            return;
        }

        refresh();
    }, [ budgets, dispatch, refresh, token ]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <BudgetListContainer
            error={ error }
            budgets={ budgets }
            loadBudgets={ refresh }
        />
    );
}

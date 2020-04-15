import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { Budget } from '..';
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

    useEffect(() => {
        if (budgets) {
            return;
        }

        setIsLoading(true);

        dispatch(loadBudgets(token, (result) => {
            if (result.error) {
                setError(result.error);
            }

            setIsLoading(false);
        }));
    }, [ budgets, dispatch, token ]);

    if (error) {
        return (
            <div>
                <strong>error:</strong>
                {' '}
                { error }
            </div>
        );
    }

    if (isLoading) {
        return (
            <div>loading...</div>
        );
    }

    return (
        <React.Fragment>
            { [ ...budgets ].sort(byPriority).map(({ id, ...budget }) => (
                <Budget key={ id } budget={ budget } />
            )) }
        </React.Fragment>
    );
}

function byPriority(budget1, budget2) {
    return budget2.isPrimary - budget1.isPrimary;
}

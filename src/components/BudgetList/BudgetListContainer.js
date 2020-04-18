import React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

import styles from './BudgetListContainer.module.scss';

import Budget, { BudgetShape } from './Budget';
import { usePullToRefresh } from '../../hooks';

const transformLoader = (x) => `translateY(${ x * 2 }px) scale(${ Math.min(1, x / 50) }) rotate(${ x * 3.6 }deg)`;

export default function BudgetListContainer({ error, budgets, loadBudgets }) {
    const [ ref, overpull ] = usePullToRefresh(loadBudgets, 100);

    const transform = overpull.interpolate(transformLoader);

    return (
        <div ref={ ref } className={ styles.container }>
            <animated.div className={ styles.loader } style={{ transform }} />
            { error
                ? (
                    <React.Fragment>
                        <strong>error:</strong>
                        { ` ${ error }` }
                    </React.Fragment>
                )
                : (
                    [ ...budgets ].sort(byPriority).map(({ id, ...budget }) => (
                        <Budget key={ id } budget={ budget } />
                    ))
                ) }
        </div>
    );
}

BudgetListContainer.propTypes = {
    error: PropTypes.string,
    budgets: PropTypes.arrayOf(BudgetShape).isRequired,
    loadBudgets: PropTypes.func
};

function byPriority(budget1, budget2) {
    return budget2.isPrimary - budget1.isPrimary;
}

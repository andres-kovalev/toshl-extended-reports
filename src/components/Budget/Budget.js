import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Budget.module.scss';

export default function Budget({ budget }) {
    const [ isExpanded, setIsExpanded ] = useState(false);
    const toggle = () => setIsExpanded((state) => !state);

    const { name, indicators } = budget;
    const { rest } = indicators.adaptive;

    const className = cx(styles.budget, {
        [styles.negative]: rest < 0
    });

    return (
        <article className={ className } onClick={ toggle }>
            <h2 className={ styles.title }>
                { name }
            </h2>
            {renderBudgetContent(indicators, isExpanded)}
        </article>
    );
}

const indicatorProp = PropTypes.shape({
    rest: PropTypes.number.isRequired
});

Budget.propTypes = {
    budget: PropTypes.shape({
        name: PropTypes.string.isRequired,
        indicators: PropTypes.shape({
            adaptive: indicatorProp
        }).isRequired
    }).isRequired
};

function renderBudgetContent(indicators, isExpanded) {
    const { average, adaptive, optimistic, full, prediction } = indicators;

    if (!isExpanded) {
        return (
            <div className={ styles.rest }>
                { adaptive.rest }
            </div>
        );
    }

    const [ min, avg, max ] = [
        average.rest,
        adaptive.rest,
        optimistic.rest
    ].sort(asc);

    return (
        <React.Fragment>
            <div className={ styles.details }>
                <div className={ styles.expense }>
                    { adaptive.spent ? '-' : '' }
                    { adaptive.spent }
                </div>
                <div className={ styles.rests }>
                    { min }
                    { ' ← ' }
                    { avg }
                    { ' → ' }
                    { max }
                </div>
                <div className={ styles.fullRest }>
                    { full.rest }
                </div>
            </div>
            <div className={ styles.prediction }>
                { prediction.rest }
            </div>
        </React.Fragment>
    );
}

function asc(a, b) {
    return a - b;
}

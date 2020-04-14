import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Budget.module.scss';

export default function Budget({ budget }) {
    const { name, indicators } = budget;
    const { rest } = indicators.adaptive;

    const className = cx(styles.budget, {
        [styles.negative]: rest < 0
    });

    return (
        <article className={ className }>
            <h2 className={ styles.title }>
                { name }
            </h2>
            <div className={ styles.rest }>
                { rest }
            </div>
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

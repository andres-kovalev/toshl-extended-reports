import React from 'react';
import PropTypes from 'prop-types';

import styles from './Placeholder.module.scss';

export const Placeholder = ({ label }) => (
    <div className={ styles.container }>
        { label }
    </div>
);

Placeholder.propTypes = {
    label: PropTypes.string.isRequired
};

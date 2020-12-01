import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as Icons from '../Icons';

import styles from './Item.module.scss';

export const Item = ({ label, to }) => (
    <Link to={ to } className={ styles.link }>
        <div className={ styles.item }>
            <div className={ styles.label }>{ label }</div>
            <Icons.AngleRight className={ styles.arrow } />
        </div>
    </Link>
);

Item.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
};

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as Icons from '../Icons';

import { Checkbox } from './Checkbox';

import styles from './Checkboxes.module.scss';

export function Checkboxes({ header, backTo, items, unchecked, onChange }) {
    const uncheckedSet = new Set(unchecked);

    return (
        <div className={ styles.container }>
            <div className={ styles.header }>
                { backTo && <Link to={ backTo } className={ styles.back }>
                    <Icons.AngleLeft className={ styles.backIcon } />
                </Link> }
                { header }
            </div>
            { items.map(({ id, name }) => {
                const checked = !uncheckedSet.has(id);

                return (
                    <Checkbox
                        key={ id }
                        id={ id }
                        label={ name }
                        checked={ checked }
                        onChange={() => {
                            const newValue = checked
                                ? unchecked.concat([ id ])
                                : unchecked.filter(
                                    (hiddenId) => hiddenId !== id
                                );

                            onChange(newValue);
                        }}
                    />
                );
            }) }
        </div>
    );
}

Checkboxes.propTypes = {
    header: PropTypes.string.isRequired,
    backTo: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    unchecked: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    onChange: PropTypes.func.isRequired
};

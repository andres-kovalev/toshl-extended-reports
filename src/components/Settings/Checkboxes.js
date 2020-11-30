import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from './Checkbox';

import styles from './Checkboxes.module.scss';

export function Checkboxes({ items, unchecked, onChange }) {
    const uncheckedSet = new Set(unchecked);

    return (
        <div className={ styles.container }>
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

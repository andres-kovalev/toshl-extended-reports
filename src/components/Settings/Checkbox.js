import React from 'react';
import PropType from 'prop-types';
import cx from 'classnames';

import { Box, CheckedBox } from '../Icons';

import styles from './Checkbox.module.scss';

export const Checkbox = ({ id, label, checked, onChange }) => {
    const Component = checked ? CheckedBox : Box;
    const className = cx(
        styles.checkbox,
        checked && styles.checked
    );

    return (
        <div className={ className }>
            <Component
                id={id}
                role="checkbox"
                aria-checked={ checked }
                onClick={ onChange }
            />
            <label for={id} onClick={ onChange }>{label}</label>
        </div>
    );
};

Checkbox.propTypes = {
    id: PropType.string.isRequired,
    label: PropType.string.isRequired,
    checked: PropType.bool.isRequired,
    onChange: PropType.func.isRequired
};

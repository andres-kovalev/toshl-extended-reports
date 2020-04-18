import React from 'react';

import styles from './Loading.module.scss';
import logo from '../../assets/logo512.png';

export default function Loading() {
    return (
        <div className={ styles.container }>
            <img className={ styles.logo } src={ logo } alt='Loading' />
            Loading...
        </div>
    );
}

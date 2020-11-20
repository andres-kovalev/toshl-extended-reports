import React from 'react';

import styles from './BudgetSkeleton.module.scss';

export const BudgetSkeleton = () => (
    <article className={ styles.budget }>
        <div className={ styles.title } />
        <div className={ styles.rest } />
    </article>
);

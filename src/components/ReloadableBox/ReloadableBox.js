import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

import { Spinner } from '../Icons';
import { usePullToRefresh } from '../../hooks';

import styles from './ReloadableBox.module.scss';

export const ReloadableBox = ({ children, reload, loading }) => {
    const [ ref, overpull, reset ] = usePullToRefresh(reload, loading, 75);

    useEffect(() => {
        if (loading) {
            return;
        }

        reset();
    }, [ loading, reset ]);

    const height = overpull.interpolate((x) => `${ x }px`);
    const transform = overpull.interpolate((x) => `rotate(${ x * 3.6 }deg)`);
    const spinnerSize = overpull
        .interpolate({
            range: [ 20, 100 ],
            output: [ 0, 40 ]
        })
        .interpolate((x) => `${ x }px`);

    return (
        <div ref={ ref } className={ styles.container }>
            <animated.div className={ styles.loader } style={{ height }}>
                <animated.div
                    className={ styles.spinner }
                    style={{
                        transform,
                        width: spinnerSize,
                        height: spinnerSize
                    }}
                >
                    <Spinner className={ loading ? styles.loading : undefined } />
                </animated.div>
            </animated.div>
            { children }
        </div>
    );
};

ReloadableBox.propTypes = {
    children: PropTypes.node.isRequired,
    reload: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

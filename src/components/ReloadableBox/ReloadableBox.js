import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

import { Spinner } from '../Icons';
import { usePullToRefresh } from '../../hooks';

import styles from './ReloadableBox.module.scss';

const MAX_PULL = 75;

export const ReloadableBox = ({ children, reload, loading }) => {
    const [ ref, overpull, reset ] = usePullToRefresh(reload, loading, MAX_PULL);

    useEffect(() => {
        if (loading) {
            return;
        }

        reset();
    }, [ loading, reset ]);

    const height = overpull.interpolate((x) => `${ x }px`);
    const transform = overpull.interpolate({
        range: [ 0, MAX_PULL ],
        output: [ 0, MAX_PULL ],
        extrapolate: 'clamp'
    }).interpolate((x) => `rotate(${
        -Math.cos((x / MAX_PULL) * Math.PI) * 180
    }deg)`);
    const padding = overpull.interpolate({
        range: [ 0, MAX_PULL ],
        output: [ 0, 25 ],
        extrapolate: 'clamp'
    });
    const spinnerSize = overpull
        .interpolate({
            range: [ 20, MAX_PULL ],
            output: [ 0, 30 ],
            extrapolate: 'clamp'
        })
        .interpolate((x) => `${ x }px`);

    return (
        <div ref={ ref } className={ styles.container }>
            <animated.div className={ styles.loader } style={{ height, padding }}>
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

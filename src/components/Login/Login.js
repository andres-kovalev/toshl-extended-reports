import React, { useState, useCallback, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';

import { login, tokenSelector } from '../../store/login';

import styles from './Login.module.scss';
import logo from '../../assets/logo512.png';

export function Login() {
    const token = useSelector(tokenSelector);
    const ref = useRef();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        setIsLoading(true);

        const userToken = ref.current.value;

        dispatch(login(userToken, (result) => {
            if (result.error) {
                setError(result.error);
            }

            setIsLoading(false);
        }));
    }, [ dispatch ]);

    if (token) {
        return (
            <Redirect to='/' />
        );
    }

    const className = cx(styles.login, {
        [styles.disabled]: isLoading
    });

    return (
        <div className={ className }>
            <div className={ styles.logo }>
                <img src={ logo } alt="Logo" />
            </div>
            <form className={ styles.form } onSubmit={ handleSubmit }>
                <input type="text" className={ styles.input } placeholder="token" disabled={ isLoading } ref={ ref } />
                <button type="submit" className={ styles.button } disabled={ isLoading }>
                    { isLoading ? 'loading...' : 'login' }
                </button>
                { error && <div className={ styles.error }>{ error }</div> }
            </form>
        </div>
    );
}

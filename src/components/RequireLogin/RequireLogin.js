import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { tokenSelector } from '../../store/login';

export default function RequireLogin({ children }) {
    const token = useSelector(tokenSelector);

    if (token) {
        return children;
    }

    return (
        <Redirect to='/login' />
    );
}

RequireLogin.propTypes = {
    children: PropTypes.node
};

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../store';

import { Login } from '../Login';
import { RequireLogin } from '../RequireLogin';
import { Main } from '../Main';

export function App() {
    return (
        <Router>
            <Provider store={ store }>
                <Switch>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route exact={ false } path='/'>
                        <RequireLogin>
                            <Main />
                        </RequireLogin>
                    </Route>
                </Switch>
            </Provider>
        </Router>
    );
}

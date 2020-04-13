import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../../store';

import BudgetList from '../BudgetList';
import Login from '../Login';
import RequireLogin from '../RequireLogin';

export default function App() {
    return (
        <Router>
            <Provider store={ store }>
                <Switch>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route path='/budgets'>
                        <RequireLogin>
                            <BudgetList />
                        </RequireLogin>
                    </Route>
                    <Route path='/'>
                        <Redirect to='/budgets' />
                    </Route>
                </Switch>
            </Provider>
        </Router>
    );
}

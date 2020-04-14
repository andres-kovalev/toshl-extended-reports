import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../store';

import { BudgetList, Login, RequireLogin } from '..';

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

import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import { Settings as SettingsScreen } from '../Settings';
import { Budgets } from '../Budgets';
import { Coins, Settings } from '../Icons';

import styles from './Main.module.scss';

export const Main = () => (
    <div className={ styles.container }>
        <body className={ styles.body }>
            <Switch>
                <Route path='/budget'>
                    <Budgets />
                </Route>
                <Route path='/settings'>
                    <SettingsScreen />
                </Route>
                <Route exact path='/'>
                    <Redirect to='/budget' />
                </Route>
            </Switch>
        </body>
        <nav className={ styles.nav }>
            <NavLink to='/budget' className={ styles.navItem } exact activeClassName={ styles.active }>
                <Coins />
            </NavLink>
            <NavLink to='/settings' className={ styles.navItem } activeClassName={ styles.active }>
                <Settings />
            </NavLink>
        </nav>
    </div>
);

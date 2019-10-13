import React from 'react';
import {
    Router,
    Switch,
    Redirect,
    Route,
} from 'react-router-dom';
import history from './history';
import Dapp from './pages/dapp';
import Test from './pages/test';


export default function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Redirect from="/" exact to="/app" />
                <Route path="/app" component={Dapp} />
                <Route path="/test" component={Test} />
            </Switch>
        </Router>
    );
}
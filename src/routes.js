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
import Recipes from './pages/recipes';
import Invest from './pages/invest';
import Overview from './pages/overview';


export default function Routes() {
    return (
        <Router history={history}>
            <Switch>
                {/* <Redirect from="/" exact to="/app" /> */}
                <Route exact path="/" component={Dapp} />
                <Route path="/recipes" component={Recipes} />
                <Route path="/invest" component={Invest} />
                <Route path="/overview" component={Overview} />
                <Route path="/test" component={Test} />
            </Switch>
        </Router>
    );
}
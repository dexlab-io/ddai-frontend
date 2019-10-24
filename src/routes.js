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
import Deposit from './pages/deposit';
import Overview from './pages/overview';
import Withdraw from './pages/withdraw';


export default function Routes() {
    return (
        <Switch>
            {/* <Redirect from="/" exact to="/app" /> */}
            <Route exact path="/" component={Dapp} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/deposit" component={Deposit} />
            <Route path="/withdraw" component={Withdraw} />
            <Route path="/invest-more" component={Invest} />
            <Route path="/overview" component={Overview} />
            <Route path="/test" component={Test} />
        </Switch>
    );
}
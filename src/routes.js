import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import Test from './pages/test';
import Recipes from './pages/recipes';
import Invest from './pages/invest';
import Deposit from './pages/deposit';
import Overview from './pages/overview';
import Withdraw from './pages/withdraw';

import Landing from './pages/landing';


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/landing" component={Landing} />
            
            <Route path="/recipes" component={Recipes} />
            <Route path="/deposit" component={Deposit} />
            <Route path="/withdraw" component={Withdraw} />
            <Route path="/invest-more" component={Invest} />
            <Route path="/overview" component={Overview} />
            <Route path="/test" component={Test} />
        </Switch>
    );
}
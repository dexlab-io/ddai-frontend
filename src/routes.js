import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import Test from './pages/test';
import Recipes from './pages/recipes';
import Invest from './pages/invest';
import Overview from './pages/overview';
import Redeem from './pages/redeem';


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Recipes} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/invest" component={Invest} />
            <Route path="/redeem" component={Redeem} />
            <Route path="/overview" component={Overview} />
            <Route path="/test" component={Test} />
        </Switch>
    );
}
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CreateTotem from './pages/CreateTotem';
import TotemMap from './pages/TotemMap';


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={TotemMap} />
                <Route path="/createtotems" component={CreateTotem} />
                <Route path="/:qrParam" component={TotemMap} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;

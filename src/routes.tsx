import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import TotemMap from './pages/TotemMap';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={TotemMap} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
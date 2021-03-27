import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

import AuthGuard from './auth-guard'; 
import TotemMap from '../pages/TotemMap';
import Login from '../pages/Login';
import Forgot from '../pages/Forgot';
import Register from '../pages/Register';

function Routes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AuthGuard>
                    <Switch>
                        <Route path="/" exact component={TotemMap} />
                    </Switch>
                </AuthGuard>

                <AuthGuard authRoutes={true}>
                    <Switch>
                        <Route path="/login" component={Login} />
                    </Switch>
                    <Switch>
                        <Route path="/register" component={Register} />
                    </Switch>
                    <Switch>
                        <Route path="/forgot" component={Forgot} />
                    </Switch>
                </AuthGuard>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default Routes;
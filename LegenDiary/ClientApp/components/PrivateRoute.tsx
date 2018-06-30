import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserSession } from './UserSession';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        UserSession.checkAuthenticatedUser()
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />
    )} />
)
import React, {Component} from 'react';
import {Redirect, Route} from "react-router-dom";

const AuthenticatedRoute = (props) => (
    //TODO Implement after Redux https://tylermcginnis.com/react-router-protected-routes-authentication/
    <Route {...props} render={(routeProps) => (
        props.user ? <Component {...routeProps} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: routeProps.location }
            }} />
    )} />
);

export default AuthenticatedRoute;
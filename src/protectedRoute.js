import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserContext from './context/UserContext'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { userData } = useContext(UserContext)

    // check for user in context or item
    const isAuthenticated = userData.user || localStorage.getItem('auth-token');
    return (
        // render function - instead of using the component prop
        // pass in function to be called when the location matches
        //  takes route's props as an argument
        <Route {...rest} render={routeProps => {
            if (isAuthenticated) {
                return <Component {...routeProps} />
            } else {
                return (<Redirect
                    to={{
                        pathname: "/login",
                        state: {
                            from: routeProps.location
                        }
                    }}
                />)
            }
        }} />
    )
}

export default ProtectedRoute;


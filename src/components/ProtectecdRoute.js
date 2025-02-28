import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Custom hook to check auth status

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth(); // Assume useAuth returns user object if authenticated

    return (
        <Route
            {...rest}
            render={props =>
                user ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default ProtectedRoute;

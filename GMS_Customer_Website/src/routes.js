// src/routes.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';

const PrivateRoute = ({ element: Element, ...rest }) => {
    return (
        <Route
            {...rest}
            element={isAuthenticated() ? <Element /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;

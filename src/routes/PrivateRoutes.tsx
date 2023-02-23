import React from 'react';
import { Route, Navigate, RouteProps, Outlet } from 'react-router-dom';
import { isLogged } from '../shared/utils/Auth';


const PrivateRoutes = () => {

    return isLogged() ? <Outlet /> : <Navigate to="/login"/>
}


export default PrivateRoutes
import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home, { HomeContextProvider } from '../home/Home'
import RegistrationPage from '../registrationPage/RegistrationPage'
import { HomeProvider } from '../home/HomeContext'

const Routes = () => {
    const routes = useRoutes([
        {
            path: "/home",
            element: <Home />
        },
        {
            path: "/",
            element: <RegistrationPage />
        }
    ])

    return routes
}

export default Routes

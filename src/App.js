import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgottenPassword from './pages/ForgottenPassword'
import Dashboard from './pages/Dashboard'
import ProfileSettings from './pages/ProfileSettings'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/forgotten_password',
        element: <ForgottenPassword />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/profile_settings',
        element: <ProfileSettings />,
    }
])

function App() {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App

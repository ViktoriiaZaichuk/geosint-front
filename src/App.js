import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgottenPassword from './pages/ForgottenPassword'
import Dashboard from './pages/Dashboard'
import CreateChallenge from './pages/CreateChallenge'
import ProfileSettings from './pages/ProfileSettings'
import ChallengesList from './pages/ChallengesList'
import Challenge from './pages/Challenge'
import GlobalRanking from './pages/GlobalRanking'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import Loader from './components/loader'
import NotFound from './pages/404Page'
import ResetPassword from './pages/ResetPassword'
import ValidationMessage from './pages/ValidationMessage'

function App() {
    const user = useGetCurrentUser()

    const router = createBrowserRouter([
        {
            path: '*',
            element: <NotFound />,
        },
        {
            path: '/',
            element: user.loading ? <Loader /> : user.login ? <Dashboard /> : <Home />,
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
            path: '/profile_settings',
            element: <ProfileSettings />,
        },
        {
            path: '/challenges_list',
            element: <ChallengesList />,
        },
        {
            path: '/challenge/:id',
            element: <Challenge />,
        },
        {
            path: '/general_ranking',
            element: <GlobalRanking />,
        },
        {
            path: '/create_challenge',
            element: <CreateChallenge />,
        },
        {
            path: '/reset_password/:token',
            element: <ResetPassword />,
        },
        {
            path: '/validate/:token',
            element: <ValidationMessage />,
        }
    ])

    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App

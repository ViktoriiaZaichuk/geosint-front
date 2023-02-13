import React from 'react'
import { QueryClient, QueryClientProvider } from "react-query"
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/css/index.css'

import UserProvider from './context/UserContext'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <UserProvider>
                <App />
            </UserProvider>
        </React.StrictMode>
    </QueryClientProvider>
)

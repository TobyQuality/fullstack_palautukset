import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './NotificationContext'
import { LoginContextProvider } from './LoginContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import {BrowserRouter as Router} from "react-router-dom"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
<Router>
        <LoginContextProvider>
                <NotificationContextProvider>
                        <QueryClientProvider client={queryClient}>
                                <App />
                        </QueryClientProvider>
                </NotificationContextProvider>
        </LoginContextProvider>
</Router>
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './contexts/UserContext'

const client = new ApolloClient({
    uri: 'https://blue-cloud-gql.ourweus.space/graphql',
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <UserProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </UserProvider>
        </ApolloProvider>
    </React.StrictMode>
)

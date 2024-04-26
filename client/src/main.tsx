import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Tanstack Query Elements
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const clientQuery = new QueryClient({ defaultOptions: { queries: { staleTime: 50000, gcTime: 10 * ( 60 * 1000 ) } } })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={clientQuery}>

        <App />

    </QueryClientProvider>
  </React.StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary fallback={"There was some errors"}>
                <App/>
                </ErrorBoundary>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
)

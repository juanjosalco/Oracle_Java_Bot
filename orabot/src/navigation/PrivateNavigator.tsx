import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link
} from 'react-router-dom';

import { LoginScreen } from '../features/Authentication/Views/LoginScreen';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginScreen />
    },
])

export function PrivateNavigator() {
    return (
        <RouterProvider router={router}>
        </RouterProvider>
    );
}
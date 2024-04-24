import { useEffect } from 'react';
import './App.css';
import { LoginScreen } from './features/Authentication/Views/LoginScreen';
import { RecoverScreen } from './features/Authentication/Views/RecoverScreen';
import { TicketScreen } from './features/Authentication/Views/TicketScreen';
import { DashboardScreen } from './features/Dashboard/Views/DashboardScreen';
import { RouterProvider, Route, createBrowserRouter } from 'react-router-dom';

const tele = window.Telegram.WebApp;


function App() {
  
  useEffect(() => {
    tele.ready()
  }, [])

  const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginScreen />
    },
    {
        path: '/recover',
        element: <RecoverScreen />
    },
    {
        path: '/ticket',
        element: <TicketScreen />
    },
    {
        path: '/dashboard',
        element: <DashboardScreen />
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={router}>
            <Route />
      </RouterProvider>
    </div>
  );
}

export default App;

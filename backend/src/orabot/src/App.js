import { useEffect } from "react";
import "./App.css";
import { LoginScreen } from "./features/Authentication/Views/LoginScreen";
import { RecoverScreen } from "./features/Authentication/Views/RecoverScreen";
import { TicketScreen } from "./features/Authentication/Views/TicketScreen";
import { DashboardScreen } from "./features/Dashboard/Views/DashboardScreen";
import { RouterProvider, Route, createBrowserRouter } from "react-router-dom";
import { TaskInformationScreen } from "./features/TasksManagment/Views/TaskInformationScreen";

import { UserProvider } from "./providers/user/UserProvider";
import { UserAdministration } from "./features/Administration/Views/UserAdministration";
import { TeamAdministration } from "./features/Administration/Views/TeamAdministration";
import { TermsScreen } from "./features/Authentication/Views/TermsScreen";
import { PrivacyPolicyScreen } from "./features/Authentication/Views/PrivacyPolicyScreen";
import { UserAgreementScreen } from "./features/Authentication/Views/UserAgreementScreen";

const tele = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tele.ready();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginScreen />,
    },
    {
      path: "/recover",
      element: <RecoverScreen />,
    },
    {
      path: "/ticket",
      element: <TicketScreen />,
    },
    {
      path: "/dashboard",
      element: <DashboardScreen />,
    },
    {
      path: "/task/:id",
      element: <TaskInformationScreen />,
    },
    {
      path: "/task/add",
      element: <TaskInformationScreen isNewTask={true} />,
    },
    {
      path: "/user",
      element: <UserAdministration />,
    },
    {
      path: "/team",
      element: <TeamAdministration />,
    },
    {
      path: "/terms-of-service",
      element: <TermsScreen />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicyScreen />,
    },
    {
      path: "/user-agreement",
      element: <UserAgreementScreen />,
    }
  ]);

  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router}>
          <Route />
        </RouterProvider>
      </UserProvider>
    </div>
  );
}

export default App;

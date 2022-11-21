import {
    createBrowserRouter,
  } from "react-router-dom";
import HomePage from "../pages/home/Home.page";
import { AdminRoutes } from "./admin/addmin.routes";
import { AppRoutes } from "./app/app.routes";

import { LoginRoute } from "./security/security.routes";

export const routes = createBrowserRouter([
    AdminRoutes,
    AppRoutes,
    LoginRoute,
    {
        path: '',
        element: <HomePage />
    }
])
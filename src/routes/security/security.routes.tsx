import { RoutePath } from "../../constants/app.constants";
import LoginPage from "../../pages/login/Login.page";

export const LoginRoute = {
    path: RoutePath.security.login,
    element: <LoginPage />
}

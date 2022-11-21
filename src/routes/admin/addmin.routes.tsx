import { RoutePath } from "../../constants/app.constants";
import AddMatch from "../../pages/admin/add-match/AddMatch.page";
import AdminPage from "../../pages/admin/Admin.page";
import EditMatch from "../../pages/admin/edit-match/EditMatch.page";
import MatchList from "../../pages/admin/match-list/MatchList.page";

export const AdminRoutes = {
    path: RoutePath.admin.home,
    element: <AdminPage />,
    children: [
        {
            path: RoutePath.admin.matches,
            element: <MatchList />
        },
        {
            path: RoutePath.admin.addMatch,
            element: <AddMatch />
        },
        {
            path: RoutePath.admin.editMatch,
            element: <EditMatch />
        }
    ],
}
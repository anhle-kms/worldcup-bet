import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header.component";

const AdminPage = () => (
  <>
    <Header />
    <Outlet />
  </>
)

export default AdminPage;

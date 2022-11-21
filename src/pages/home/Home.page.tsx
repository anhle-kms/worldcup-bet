import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header.component";

const HomePage = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default HomePage;

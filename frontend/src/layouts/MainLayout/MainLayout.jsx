import { Header } from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { UserArea } from "./components/Header/components/UserArea/UserArea";

export const MainLayout = ({ setIsAuthenticated }) => {
  return (
    <>
      <Header>
        <UserArea setIsAuthenticated={setIsAuthenticated} />
      </Header>
      <Outlet />
      <Footer />
    </>
  );
};

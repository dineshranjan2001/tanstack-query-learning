import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { routes } from "./routes";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  const renderRoutes = (routes) => {
    return routes.map((route, index) => (
      <Route key={index} path={route?.path} element={route?.element}>
        {route?.children && renderRoutes(route?.children)}
      </Route>
    ));
  };
  return (
    <Routes>
      <Route element={<MainLayout />}>{renderRoutes(routes)}</Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default AppRoutes;

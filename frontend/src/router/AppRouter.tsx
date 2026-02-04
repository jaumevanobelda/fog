import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Shop from "../pages/shop/Shop";
import Auth from "../pages/auth/Auth";
import Details from "../pages/details/Details";
import CheckoutSuccess from "../pages/checkout/CheckoutSuccess";
import CheckoutCancel from "../pages/checkout/CheckoutCancel";
import PrivateRoute from "@/guards/PrivateRoute";
import Library from "@/pages/library/Library";
import DashboardGames from "@/pages/dashboardGames/DashboardGames";
import DashboardCategories from "@/pages/dashboardCategories/DashboardCategories";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Shop />} />
          <Route path="details/:slug" element={<Details />} />
          <Route path="auth/:tipo" element={<Auth />} />
          <Route path="checkout/success" element={<CheckoutSuccess />} />
          <Route path="checkout/cancel" element={<CheckoutCancel />} />
          <Route element={<PrivateRoute />}>
            <Route path="library" element={<Library />} />
          </Route>
          <Route path="dashboardGames" element={<DashboardGames />} />
          <Route path="dashboardCategories" element={<DashboardCategories />} />
        </Route>
      </Routes>
    </BrowserRouter>)
}
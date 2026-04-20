import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Shop from "../pages/shop/Shop";
import Auth from "../pages/auth/Auth";
import Details from "../pages/details/Details";
import CheckoutSuccess from "../pages/checkout/CheckoutSuccess";
import CheckoutCancel from "../pages/checkout/CheckoutCancel";
import Logged from "@/guards/Logged";
import Library from "@/pages/library/Library";
import DashboardGames from "@/pages/dashboardGames/DashboardGames";
import DashboardCategories from "@/pages/dashboardCategories/DashboardCategories";
import Confirm from "@/pages/confirm/Confirm";
import Unlogged from "@/guards/Unlogged";
import DashboardUsers from "@/pages/dasboardUsers/DashboardUsers";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Shop />} />
          <Route path="details/:slug" element={<Details />} />
          <Route element={<Unlogged />}>
            <Route path="auth/:tipo" element={<Auth />} />
            <Route path="confirm/:confirm_token" element={<Confirm />} />
          </Route>
          <Route path="checkout/success" element={<CheckoutSuccess />} />
          <Route path="checkout/cancel" element={<CheckoutCancel />} />
          <Route element={<Logged />}>
            <Route path="library" element={<Library />} />
          </Route>
          <Route element={<Logged allowedRoles={["DEVELOPER","ADMIN","SUPERADMIN"]} />}>
            <Route path="dashboardGames" element={<DashboardGames />} />
          </Route>
          <Route element={<Logged allowedRoles={["ADMIN","SUPERADMIN"]} />}>
            <Route path="dashboardCategories" element={<DashboardCategories />} />
            <Route path="dashboardUsers" element={<DashboardUsers />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>)
}
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Shop from "../pages/shop/Shop";
import Auth from "../pages/auth/Auth";

export default function AppRouter() {
    return(  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Shop/>} />
        <Route path="auth/:tipo" element={<Auth/>} />
        {/* <Route element={<PrivateRoute />}>
        </Route> */}
      </Route>
    </Routes>
  </BrowserRouter>)
}
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Shop from "../pages/shop/Shop";
import Auth from "../pages/auth/Auth";
import Details from "../pages/details/Details";

export default function AppRouter() {
    return(  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Shop/>} /> 
        <Route path="details/:slug" element={<Details/>} />
        <Route path="auth/:tipo" element={<Auth/>} />
        {/* <Route element={<PrivateRoute />}>
        </Route> */}
      </Route>
    </Routes>
  </BrowserRouter>)
}
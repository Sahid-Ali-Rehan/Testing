import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import NotFound from "./Pages/404";
import ProductPage from "./Pages/Products/ProductPage";
import Admin from "./Pages/Admin/Admin";
import AdminAddProduct from "./components/AdminComponent/AdminAddProduct";
import AdminAllProducts from "./components/AdminComponent/AdminAllProducts";
import AdminAllOrders from "./components/AdminComponent/AdminAllOrders";
import AdminAllUsers from "./components/AdminComponent/AdminAllUsers";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { NotificationProvider } from "./components/NotificationProvider";
import PrivateRoute from "./components/Routes/PrivateRoutes";
import Logout from "./components/Authentication/Logout";
import AccessDenied from "./components/Routes/AccessDenied";
import MyProfile from "./components/MyProfile/MyProfile";
import Cart from "./components/Modals/CartModal";
import AdminEditProduct from "./components/AdminComponent/AdminEditProduct";

const App = () => {
  return (
    <NotificationProvider>
      <Router>
        <div className="relative min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/access-denied" element={<AccessDenied />} />

            <Route path="/signup" element={<Signup />} />

            {/* Protect non-admin routes for logged-in users only */}
            <Route element={<PrivateRoute isAdminRoute={false} />}>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/cart" element={<Cart />} />


            </Route>

            {/* Protect admin routes */}
            <Route element={<PrivateRoute isAdminRoute={true} />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/add-products" element={<AdminAddProduct />} />
              <Route path="/admin/products" element={<AdminAllProducts />} />
              <Route path="/admin/orders" element={<AdminAllOrders />} />
              <Route path="/admin/users" element={<AdminAllUsers />} />
              <Route path="/edit-product/:id" element={<AdminEditProduct />} />

            </Route>

            {/* Handle 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </NotificationProvider>
  );
};

export default App;

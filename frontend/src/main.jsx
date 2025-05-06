import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./components/Error/err_404_page.jsx";
import Home from "./components/HomePage/Home.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Store from "./pages/Store.jsx";
import Login from "./pages/LoginPages/Login.jsx";
import AdminLogin from "./pages/LoginPages/AdminLogin.jsx";
import AdminDashboard from "./pages/Dashboards/AdminDashboard.jsx";
import AdminDash from "./components/AdminDashboard/AdminDash.jsx";
import ManageUser from "./components/AdminDashboard/ManageUser.jsx";
import AddUser from "./components/AdminDashboard/AddUser.jsx";
import UpdateUser from "./components/AdminDashboard/UpdateUser.jsx";
import UserSignup from "./pages/SignupPages/user_signup.jsx";
import StaffDash from "./components/StaffDashboard/StaffDash.jsx";
import StaffDashboard from "./pages/Dashboards/StaffDashboard.jsx";
import ManagePrd from "./components/StaffDashboard/ManagePrd.jsx";
import AddPrd from "./components/StaffDashboard/AddPrd.jsx";
import UpdatePrd from "./components/StaffDashboard/UpdatePrd.jsx";
import UserProfile from "./components/User_Manager/UserProfile.jsx";
import UserDashboard from "./components/User_Manager/UserDashboard.jsx";
import SmartFarming from "./components/User_Manager/SmartFarming.jsx";
import Order from "./components/HomePage/Order_process.jsx";
import AddFarmingDetails from "./components/SpecialFunction/AddFarmingDetails.jsx";
import SmartAssist from "./components/SpecialFunction/SmartAssist.jsx";
import OrderManager from "./pages/Order_Manager/order_manager_dash.jsx";
import EditFarmingDetails from "./components/SpecialFunction/EditFarmingDetails.jsx";
import StaffLogin from "./pages/LoginPages/StaffLogin.jsx";
import ManageStaff from "./components/AdminDashboard/ManageStaff.jsx";
import AddStaff from "./components/AdminDashboard/AddStaff.jsx";
import UpdateStaff from "./components/AdminDashboard/UpdateStaff.jsx";

import Dm_dashboard from "./pages/DeliveryPages/Del_manager/dm_dashboard.jsx";
import Dm_overview from "./pages/DeliveryPages/Del_manager/dm_overview.jsx";
import Dm_orders from "./pages/DeliveryPages/Del_manager/dm_orders.jsx";
import Dm_tracking from "./pages/DeliveryPages/Del_manager/dm_tracking.jsx";
import Dm_person_details from "./pages/DeliveryPages/Del_manager/dm_person_details.jsx";

import Dp_dashboard from "./pages/DeliveryPages/del_person/dp_dashboard.jsx";
import Dp_deliveries from "./pages/DeliveryPages/del_person/dp_deliveries.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "order/:id",
        element: <Order />,
      },
    ],
  },
  {
    path: "profile",
    element: <UserProfile />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "SmartAssit",
        element: <SmartFarming />,
      },
      {
        path: "addDetails",
        element: <AddFarmingDetails />,
      },
      {
        path: "editDetails/:dId",
        element: <EditFarmingDetails />,
      },
    ],
  },
  {
    path: "assist/:id",
    element: <SmartAssist />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: <AdminLogin />,
  },
  {
    path: "staff",
    element: <StaffLogin />,
  },
  // user manager section
  {
    path: "admin_dashboard",
    element: <AdminDash />,
  },
  {
    path: "sign_up",
    element: <UserSignup />,
  },
  {
    path: "order_manager",
    element: <OrderManager />,
  },
  {
    path: "a-dash",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <AdminDash />,
      },
      {
        path: "manUser",
        element: <ManageUser />,
      },
      {
        path: "addUser",
        element: <AddUser />,
      },
      {
        path: "updateUser/:userId",
        element: <UpdateUser />,
      },
      {
        path: "manStaff",
        element: <ManageStaff />,
      },
      {
        path: "addStaff",
        element: <AddStaff />,
      },
      {
        path: "updateStaff/:userId",
        element: <UpdateStaff />,
      },
    ],
  },
  {
    path: "s-dash",
    element: <StaffDashboard />,
    children: [
      {
        index: true,
        element: <StaffDash />,
      },
      {
        path: "manPrd",
        element: <ManagePrd />,
      },
      {
        path: "addPrd",
        element: <AddPrd />,
      },
      {
        path: "updateProduct/:prdId",
        element: <UpdatePrd />,
      },
    ],
  },
  {
    path: "dm-dashboard",
    element: <Dm_dashboard />,
    children: [
      {
        index: true,
        element: <Dm_overview />,
      },
      {
        path: "dm_overview",
        element: <Dm_overview />,
      },
      {
        path: "dm_orders",
        element: <Dm_orders />,
      },
      {
        path: "dm_tracking",
        element: <Dm_tracking />,
      },
      {
        path: "dm_person_details",
        element: <Dm_person_details />,
      },
    ],
  },
  {
    path: "dp-dashboard",
    element: <Dp_dashboard />,
    children: [
      {
        index: true,
        element: <Dp_dashboard />,
      },
      {
        path: "my-deliveries",
        element: <Dp_deliveries />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

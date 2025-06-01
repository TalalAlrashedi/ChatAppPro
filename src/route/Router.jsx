import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ChatApp from "../pages/ChatApp";

const Layout = () => {
  return <Outlet />;
};

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "chatapp", element: <ChatApp /> },
    ],
  },
]);
const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

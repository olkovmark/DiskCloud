import React from "react";
import { Login } from "./pages/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Main } from "./pages/Main";

import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector((prom) => prom.user.isAuth);

  return (
    <div>
      <RouterProvider router={isLogin ? router : routerNoLogin} />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace={true} />,
  },
]);
const routerNoLogin = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace={true} />,
  },
]);

export default App;

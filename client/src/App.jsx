import React, { useEffect } from "react";
import { Login } from "./pages/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Main } from "./pages/Main";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "./actions/user";

function App() {
  const dispatch = useDispatch();

  const isToken = localStorage.getItem("token");
  useEffect(() => {
    if (isToken) dispatch(auth());
    // eslint-disable-next-line
  }, []);

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

  const isLogin = useSelector((prom) => prom.user.isAuth);
  return (
    <div>
      <RouterProvider router={isLogin || isToken ? router : routerNoLogin} />
    </div>
  );
}

export default App;

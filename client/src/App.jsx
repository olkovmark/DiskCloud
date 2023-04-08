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

  useEffect(() => {
    dispatch(auth());
  }, []);

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

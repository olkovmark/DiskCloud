import React from "react";
import cs from "./header.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../reduces/userReducer";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className={cs.header}>
      <button className={cs.logout} onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  );
};

export default Header;

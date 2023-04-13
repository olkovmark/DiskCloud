import React from "react";
import { Files } from "../conteiners/Files";
import Header from "../components/header/Header";
import "../styles/main.css";

export const Main = () => {
  return (
    <>
      <Header />
      <div className="main_content">
        <Files />
      </div>
    </>
  );
};

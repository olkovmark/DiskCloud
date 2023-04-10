import React, { useEffect } from "react";
import Header from "../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../actions/file";
import FileList from "../components/fileList/FileList";
import "../styles/main.css";

export const Main = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => {
    return state.file.currentDir;
  });

  useEffect(() => {
    dispatch(getFiles(currentDir));
    // eslint-disable-next-line
  }, [currentDir]);
  return (
    <div>
      <Header />
      <div className="main_content">
        <FileList />
      </div>
    </div>
  );
};

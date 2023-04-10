import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../actions/file";
import FileList from "../components/fileList/FileList";
import "../styles/main.css";
import Button from "react-bootstrap/Button";
import { createDir } from "../actions/file";
import { CreateDIrModal } from "../components/modals/CreateDIrModal";
import { backDir, setCurrentDir } from "../reduces/fileReducer";

export const Main = () => {
  const dispatch = useDispatch();
  const [isCreateDir, setIsCreateDir] = useState(false);

  const currentDir = useSelector((state) => state.file.currentDir);
  const dirStack = useSelector((state) => state.file.dirStack);

  function back() {
    dispatch(setCurrentDir([...dirStack].pop()));
    dispatch(backDir());
  }

  function createDirHandler(dirName) {
    dispatch(createDir(currentDir, dirName));
    setIsCreateDir(false);
  }

  useEffect(() => {
    dispatch(getFiles(currentDir));
    // eslint-disable-next-line
  }, [currentDir]);
  return (
    <div>
      <Header />
      <div className="main_content">
        <div className="main_content_button">
          <Button onClick={() => back()}>Back</Button>
          <Button onClick={() => setIsCreateDir(true)}>Create Folder</Button>
        </div>
        <FileList />
      </div>
      <CreateDIrModal
        isShow={isCreateDir}
        setShow={setIsCreateDir}
        createDir={createDirHandler}
      />
    </div>
  );
};

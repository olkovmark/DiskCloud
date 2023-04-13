import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFiles } from "../actions/file";
import FileList from "../components/fileList/FileList";
import "../styles/main.css";
import Button from "react-bootstrap/Button";
import { createDir } from "../actions/file";
import { CreateDIrModal } from "../components/modals/CreateDIrModal";
import { backDir, setCurrentDir } from "../reduces/fileReducer";
import { UploadArea } from "../components/uploadArea/UploadArea";
import { DownloadFileModal } from "../components/modals/DownloadFileModal";
import { changeIsDownload } from "../reduces/modalReducer";

export const Main = () => {
  const dispatch = useDispatch();
  const [isCreateDir, setIsCreateDir] = useState(false);

  const currentDir = useSelector((state) => state.file.currentDir);
  const dirStack = useSelector((state) => state.file.dirStack);
  const isDownloadModal = useSelector((state) => state.modal.isDownload);
  const [modalDownloadShow, setModalDownloadShow] = useState(false);

  useMemo(() => {
    console.log("donloadMOadl");
    console.log(isDownloadModal);
  }, [isDownloadModal]);

  useEffect(() => {
    dispatch(getFiles(currentDir));
    // eslint-disable-next-line
  }, [currentDir]);

  function isDownloadModalHandler() {
    dispatch(changeIsDownload());
  }

  const inputRef = useRef();
  const handleUploadClick = () => {
    inputRef.current?.click();
  };
  const handleFileChange = (e) => {
    const files = [...e.target.files];
    if (!e.target.files) {
      return;
    }

    files.forEach((file) => {
      dispatch(uploadFiles(file, currentDir));
    });
  };

  const [isDrag, setIsDrag] = useState(false);

  return (
    <>
      <div onDragEnter={dragOnEnterHandler} onDragOver={dragOnEnterHandler}>
        <Header />
        <div className="main_content">
          <div className="main_content_button">
            <Button onClick={() => back()}>Back</Button>
            <div className="main_content_button_files">
              <div>
                <Button onClick={handleUploadClick}>Add File</Button>
                <input
                  multiple
                  type="file"
                  ref={inputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              <Button onClick={() => setIsCreateDir(true)}>
                Create Folder
              </Button>
            </div>
          </div>
          <FileList />
        </div>
        <CreateDIrModal
          isShow={isCreateDir}
          setShow={setIsCreateDir}
          createDir={createDirHandler}
        />
        <DownloadFileModal
          show={isDownloadModal}
          close={isDownloadModalHandler}
        />
      </div>
      {isDrag && (
        <UploadArea
          onDrop={dropOnHandler}
          onDragEnter={dragOnEnterHandler}
          onDragOver={dragOnEnterHandler}
          onDragLeave={dragOnEndHandler}
        />
      )}
    </>
  );

  function back() {
    dispatch(setCurrentDir([...dirStack].pop()));
    dispatch(backDir());
  }

  function createDirHandler(dirName) {
    dispatch(createDir(currentDir, dirName));
    setIsCreateDir(false);
  }

  function dragOnEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsDrag(true);
  }
  function dragOnEndHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsDrag(false);
  }
  function dropOnHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsDrag(false);

    [...event.dataTransfer.files].forEach((file) =>
      dispatch(uploadFiles(file, currentDir))
    );
  }
};

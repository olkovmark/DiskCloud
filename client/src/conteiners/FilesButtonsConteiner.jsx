import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { backDir, setCurrentDir } from "../reduces/fileReducer";
import { uploadFiles } from "../actions/file";

export const FilesButtonsConteiner = ({
  setIsCreateDir,
  currentDir,
  dispatch,
  ...props
}) => {
  const inputRef = useRef();
  const dirStack = useSelector((state) => state.file.dirStack);

  return (
    <div className="main_content_button">
      <div>{currentDir && <Button onClick={() => back()}>Back</Button>}</div>
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
        <Button onClick={() => setIsCreateDir(true)}>Create Folder</Button>
      </div>
    </div>
  );

  function handleUploadClick() {
    inputRef.current?.click();
  }
  function handleFileChange(e) {
    const files = [...e.target.files];
    if (!e.target.files) {
      return;
    }

    files.forEach((file) => {
      dispatch(uploadFiles(file, currentDir));
    });
  }

  function back() {
    dispatch(setCurrentDir([...dirStack].pop()));
    dispatch(backDir());
  }
};

import React from "react";
import fileIcon from "../../../assets/icons/file.svg";
import folderIcon from "../../../assets/icons/folder.svg";
import "./file.css";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../reduces/fileReducer";

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);

  function openDir() {
    dispatch(pushToStack(currentDir));
    dispatch(setCurrentDir(file._id));
  }

  return (
    <tr onClick={() => (file.type === "dir" ? openDir() : {})}>
      <td>
        <img
          className="fileIcon"
          src={file.type === "dir" ? folderIcon : fileIcon}
          alt=""
        />
      </td>
      <td>{file.name}</td>
      <td>{file.date.slice(0, 10)}</td>
      <td>{file.size}</td>
    </tr>
  );
};

export default File;

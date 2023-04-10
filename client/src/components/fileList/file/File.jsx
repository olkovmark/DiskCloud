import React from "react";
import fileIcon from "../../../assets/icons/file.svg";
import folderIcon from "../../../assets/icons/folder.svg";
import "./file.css";

const File = ({ file }) => {
  console.log(file);
  return (
    <tr>
      <td>
        <img
          className="fileIcon"
          src={file.dir === "dir" ? fileIcon : folderIcon}
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

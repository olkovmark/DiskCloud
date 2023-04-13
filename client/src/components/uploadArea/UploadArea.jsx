import React from "react";
import cs from "./uploadArea.module.css";
import cloud from "../../assets/icons/upload-cloud.svg";

export const UploadArea = ({ dragHandler }) => {
  return (
    <div
      className={cs.drop_area}
      onDrop={dragHandler}
      onDragEnter={dragHandler}
      onDragOver={dragHandler}
      onDragLeave={dragHandler}
    >
      <img src={cloud} alt="" />
      Drop for download
    </div>
  );
};

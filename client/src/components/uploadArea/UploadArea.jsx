import React from "react";
import cs from "./uploadArea.module.css";
import cloud from "../../assets/icons/upload-cloud.svg";

export const UploadArea = ({
  onDrop,
  onDragEnter,
  onDragOver,
  onDragLeave,
}) => {
  return (
    <div
      className={cs.drop_area}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <img src={cloud} alt="" />
      Drop for download
    </div>
  );
};

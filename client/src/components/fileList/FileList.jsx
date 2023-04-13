import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import File from "./file/File";
import Table from "react-bootstrap/Table";
import "./fileList.css";
import { dragHandler } from "../../services/services";
import { getFiles, uploadFiles } from "../../actions/file";
import { UploadArea } from "../uploadArea/UploadArea";

const FileList = ({ currentDir, ...props }) => {
  const dispatch = useDispatch();
  const [isDrag, setIsDrag] = useState(false);
  const files = useSelector((state) => state.file.files).map((file) => (
    <File key={file._id} file={file} />
  ));

  useEffect(() => {
    dispatch(getFiles(currentDir));
    // eslint-disable-next-line
  }, [currentDir]);

  return (
    <>
      <section
        className="FileList"
        {...props}
        onDragEnter={drag}
        onDragOver={drag}
      >
        <Table hover>
          <thead>
            <tr>
              <th width={"50px"}></th>
              <th width={"70%"}>Name</th>
              <th>Date</th>
              <th>Size</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{files}</tbody>
        </Table>
      </section>
      {isDrag && <UploadArea dragHandler={drag} />}
    </>
  );

  function drag(event) {
    dragHandler(event, setIsDrag).forEach((file) =>
      dispatch(uploadFiles(file, currentDir))
    );
  }
};

export default FileList;

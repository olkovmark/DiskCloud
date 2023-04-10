import React from "react";
import File from "./file/File";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

import "./fileList.css";

const FileList = () => {
  const files = useSelector((state) => state.file.files).map((file) => (
    <File key={file._id} file={file} />
  ));

  return (
    <section className="FileList">
      <Table hover>
        <thead>
          <tr>
            <th width={"50px"}></th>
            <th width={"70%"}>Name</th>
            <th>Date</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>{files}</tbody>
      </Table>
    </section>
  );
};

export default FileList;

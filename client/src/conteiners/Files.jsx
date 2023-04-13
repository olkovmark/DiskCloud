import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadFile } from "../actions/file";
import FileList from "../components/fileList/FileList";
import { createDir } from "../actions/file";
import { CreateDIrModal } from "../components/modals/CreateDIrModal";

import { DownloadFileModal } from "../components/modals/DownloadFileModal";
import { changeIsDownload } from "../reduces/modalReducer";
import { FilesButtonsConteiner } from "./FilesButtonsConteiner";

export const Files = () => {
  const dispatch = useDispatch();
  const [isCreateDir, setIsCreateDir] = useState(false);
  const currentDir = useSelector((state) => state.file.currentDir);
  const downloadModal = useSelector((state) => state.modal.downloadModal);

  return (
    <>
      <FilesButtonsConteiner
        currentDir={currentDir}
        dispatch={dispatch}
        setIsCreateDir={setIsCreateDir}
      />
      <FileList currentDir={currentDir} />
      <CreateDIrModal
        isShow={isCreateDir}
        setShow={setIsCreateDir}
        createDir={(dirName) => {
          dispatch(createDir(currentDir, dirName));
          setIsCreateDir(false);
        }}
      />
      <DownloadFileModal
        file={downloadModal.file}
        show={downloadModal.isShow}
        close={(isDownload) => {
          if (isDownload) downloadFile(downloadModal.file);
          dispatch(changeIsDownload());
        }}
      />
    </>
  );
};

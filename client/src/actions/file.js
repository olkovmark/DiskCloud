import axios from "axios";
import { serverUrl } from "../config/config";
import { addFile, setFiles } from "../reduces/fileReducer";
import { deleteFile } from "../reduces/fileReducer";

export const getFiles = (dirId) => async (dispatch) => {
  try {
    const response = await axios.get(
      serverUrl + `api/files?${dirId ? "parent=" + dirId : ""}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch(setFiles(response.data));
  } catch (error) {
    alert(error.data.message);
  }
};
export const createDir = (dirId, name) => async (dispatch) => {
  try {
    const response = await axios.post(
      serverUrl + `api/files`,
      {
        parent: dirId,
        name,
        type: "dir",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch(addFile(response.data));
  } catch (error) {
    alert(error.response.data.message);
  }
};
export const uploadFiles = (file, dirId) => async (dispatch) => {


  const formData = new FormData();

  formData.append("file", file);
  if (dirId) formData.append("parent", dirId);
  try {
    const response = await axios.post(
      serverUrl + `api/files/upload`,
      formData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    dispatch(addFile(response.data));
  } catch (error) {
    console.log(error);
    // alert(error);
  }
};

export const downloadFile = async (file) => {
  try {
    const response = await axios.get(
      serverUrl + `api/files/download/?id=${file._id}`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(response.data);
      link.download = file.name;
      link.click();
      link.remove();
    }
  } catch (error) {
    alert(error);
  }
};
export const deleteFileReq = (file) => async (dispatch) => {
  try {
    await axios.delete(serverUrl + `api/files/?id=${file._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch(deleteFile(file));
  } catch (error) {
    alert(error);
  }
};

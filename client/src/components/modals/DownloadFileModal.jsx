import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";

export const DownloadFileModal = ({ close, file, ...props }) => {
  if (file)
    return (
      <>
        <Modal
          {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="text-center">
            <h4>Download</h4>
            <p>{file.name}</p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button onClick={() => close(false)} className="btn-secondary">
              Close
            </Button>
            <Button onClick={() => close(true)} className="btn-success">
              Download
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  else return <></>;
};

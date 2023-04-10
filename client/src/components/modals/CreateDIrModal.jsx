import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import React, { useEffect, useState } from "react";

export const CreateDIrModal = ({ isShow, setShow, createDir, ...props }) => {
  const [dirName, setDirName] = useState("");
  useEffect(() => {
    setDirName("");
  }, [isShow]);
  return (
    <div>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={() => setShow(false)}>
          <Modal.Title>Folder name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                autoFocus
                value={dirName}
                onChange={(event) => setDirName(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => createDir(dirName)}>
            Create Folder
          </Button>
        </Modal.Footer>
      </Modal>
      ;
    </div>
  );
};

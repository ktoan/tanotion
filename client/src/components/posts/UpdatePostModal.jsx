import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { PostContext } from "../../contexts/postContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const UpdatePostModal = ({ post }) => {
  const {
    showModalEditPost,
    setShowModalEditPost,
    editPost,
    setEditPost,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  const closeDialog = () => {
    setShowModalEditPost(false);
  };
  const onChangeForm = (e) => {
    setEditPost({
      ...editPost,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, post, message } = await updatePost(editPost);
    setShowModalEditPost(false);
    setShowToast({
      show: true,
      message: "Update your work successfully!",
      type: success ? "success" : "danger",
    });
  };
  return (
    <Modal show={showModalEditPost} onHide={closeDialog}>
      <Modal.Header>
        <Modal.Title>
          Edit{" "}
          <span
            className={
              editPost.status === "TO DO"
                ? "text-danger font-weight-bolder"
                : editPost.status === "PROCESSING"
                ? "text-warning font-weight-bolder"
                : "text-success font-weight-bolder"
            }
          >
            {editPost.title}
          </span>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              value={editPost.title}
              type="text"
              onChange={onChangeForm}
              placeholder="Work Title"
              name="title"
              required
              area-aria-describedby="title-help"
            />
            <Form.Text id="title-help" className="text-warning">
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={onChangeForm}
              value={editPost.description}
              as="textarea"
              placeholder="Work Description"
              rows={3}
              name="description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              value={editPost.url}
              onChange={onChangeForm}
              type="text"
              placeholder="URL Youtube"
              name="url"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={editPost.status}
              name="status"
              onChange={onChangeForm}
            >
              <option value={"TO DO"}>TO DO</option>
              <option value={"PROCESSING"}>PROCESSING</option>
              <option value={"DONE"}>DONE</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update Work
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;

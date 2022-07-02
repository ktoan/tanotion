import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/postContext";

const AddPostModal = () => {
  const { showModalAddPost, setShowModalAddPost, addPost, setShowToast } =
    useContext(PostContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO DO",
  });
  const { title, description, url, status } = form;
  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const closeDialog = () => {
    resetAddPostData();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addPost(form);
    resetAddPostData();
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };
  const resetAddPostData = () => {
    setForm({ ...form, title: "", description: "", url: "" });
    setShowModalAddPost(false);
  };
  return (
    <Modal show={showModalAddPost} onHide={closeDialog}>
      <Modal.Header>
        <Modal.Title>What do you want to do?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              value={title}
              type="text"
              onChange={onChangeForm}
              placeholder="Work Title"
              name="title"
              required
              area-aria-describedby="title-help"
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={onChangeForm}
              value={description}
              as="textarea"
              placeholder="Work Description"
              rows={3}
              name="description"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={url}
              onChange={onChangeForm}
              type="text"
              placeholder="URL Youtube"
              name="url"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Work
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;

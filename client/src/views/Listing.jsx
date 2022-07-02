import React, { useEffect, useLayoutEffect, useState } from "react";
import { useContext } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Toast from "react-bootstrap/esm/Toast";
import Col from "react-bootstrap/esm/Col";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";
import { AuthContext } from "../contexts/authContext";
import { PostContext } from "../contexts/postContext";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import UpdatePostModal from "../components/posts/UpdatePostModal";
const Listing = () => {
  const {
    authState: { user, ...props },
  } = useContext(AuthContext);
  const {
    postState: { posts, postsLoading },
    getPosts,
    setShowModalAddPost,
    showToast: { show, message, type },
    setShowToast,
    editPost,
  } = useContext(PostContext);
  useEffect(() => {
    getPosts();
  }, []);
  let body = null;
  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {user ? user.username : ""}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to TANotion</Card.Title>
            <Card.Text>
              Click the button below to track your first work.
            </Card.Text>
            <Button
              variant="primary"
              onClick={setShowModalAddPost.bind(this, true)}
            >
              Add Work
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/*Add Post Modal*/}

        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new work</Tooltip>}
        >
          <Button
            variant="success"
            className="btn-floating"
            onClick={() => setShowModalAddPost(true)}
          >
            <img src={addIcon} alt="add" width={"60"} height={"60"} />
          </Button>
        </OverlayTrigger>
      </>
    );
  }
  return (
    <>
      {body}
      <AddPostModal />
      <UpdatePostModal post={editPost} />
      <Toast
        show={show}
        style={{ position: "fixed", top: "10%", right: 10 }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Listing;

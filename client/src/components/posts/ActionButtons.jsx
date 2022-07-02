import React, { useContext } from "react";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import Button from "react-bootstrap/esm/Button";
import { PostContext } from "../../contexts/postContext";

const ActionButtons = ({ url, post }) => {
  const { deletePost, setEditPost, setShowModalEditPost } =
    useContext(PostContext);
  const handleEdit = (currentPost) => {
    setEditPost(currentPost);
    setShowModalEditPost(true);
  };
  return (
    <>
      <Button className="post-button" href={url} targets="_blank">
        <img src={playIcon} alt="play" width={"32"} height={"32"} />
      </Button>
      <Button className="post-button" onClick={() => handleEdit(post)}>
        <img src={editIcon} alt="edit" width={"32"} height={"32"} />
      </Button>
      <Button className="post-button" onClick={deletePost.bind(this, post._id)}>
        <img src={deleteIcon} alt="delete" width={"32"} height={"32"} />
      </Button>
    </>
  );
};

export default ActionButtons;

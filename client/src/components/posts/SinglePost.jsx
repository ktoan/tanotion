import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import React from "react";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post }) => {
  return (
    <Card
      className="shadow"
      border={
        post.status === "DONE"
          ? "success"
          : post.status === "PROCESSING"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{post.title}</p>
              <Badge
                pill
                bg={
                  post.status === "DONE"
                    ? "success"
                    : post.status === "PROCESSING"
                    ? "warning"
                    : "danger"
                }
              >
                {post.status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons url={post.url} post={post} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{post.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;

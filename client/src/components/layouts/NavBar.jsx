import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/logo.svg";
import LogoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../../contexts/authContext";

const NavBar = () => {
  const {
    authState: { user },
    logoutUser,
    ...props
  } = useContext(AuthContext);
  const logout = () => logoutUser();
  return (
    <Navbar
      className="d-flex align-items-center"
      collapseOnSelect
      expand="lg"
      bg="success"
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center">
          <img src={Logo} /> <span className="mx-2 fw-bold">TANotion</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link className="fw-bold text-white" disabled>
              Welcome {user ? user.username : ""}
            </Nav.Link>
            <Button
              className="fw-bold text-white"
              variant="danger"
              onClick={logout}
            >
              Logout <img src={LogoutIcon} />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

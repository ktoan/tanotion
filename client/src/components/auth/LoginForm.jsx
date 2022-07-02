import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import AlertMessage from "../layouts/AlertMessage";

const LoginForm = () => {
  const navigate = useNavigate();
  // Context
  const { login, ...props } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = await login(form);
      if (loginData.success) {
        navigate("/dashboard");
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [alert, setAlert] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const { username, password } = form;
  return (
    <>
      <Form className="my-4" onSubmit={handleLogin}>
        <Form.Group>
          <AlertMessage info={alert} />
        </Form.Group>
        <Form.Group>
          <Form.Control
            value={username}
            type="text"
            placeholder="Username"
            name="username"
            onChange={onChangeForm}
            className="mb-3"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            value={password}
            type="password"
            placeholder="Password"
            name="password"
            className="mb-3"
            onChange={onChangeForm}
          ></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?{" "}
        <Link to={"/register"}>
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;

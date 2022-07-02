import React, { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import AlertMessage from "../layouts/AlertMessage";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };
  const { register, ...props } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (registerForm.password !== registerForm.confirmPassword) {
        setAlert({
          type: "danger",
          message: "Password and confirmation are not matched!",
        });
      } else {
        const form = {
          username: registerForm.username,
          password: registerForm.password,
        };
        const registerData = await register(form);
        if (registerData.success) {
          navigate("/dashboard");
        } else {
          console.log(registerData);
          setAlert({ type: "danger", message: registerData.message });
          setTimeout(() => {
            setAlert(null);
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={handleSubmit}>
        <Form.Group>
          <AlertMessage info={alert} />
        </Form.Group>
        <Form.Group>
          <Form.Control
            value={registerForm.username}
            onChange={onChange}
            type="text"
            placeholder="Username"
            name="username"
            required
            className="mb-3"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            value={registerForm.password}
            onChange={onChange}
            type="password"
            placeholder="Password"
            name="password"
            required
            className="mb-3"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            value={registerForm.confirmPassword}
            onChange={onChange}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            className="mb-3"
          ></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        If you have an account?{" "}
        <Link to={"/login"}>
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import React from "react";
import axios from "axios";
import url from "../url/backendUrl";
import { useNavigate } from "react-router-dom";
import glogo from "../images/gicon.png";
import { ToastContainer, toast } from "react-toastify";
import '../css/Login.css';
const Login = () => {
    const navigate = useNavigate();
    const [ email , setEmail]= useState("");
    const [ password , setPassword] = useState("");
    const handleSubmit=async(e)=>{
       e.preventDefault();
       let api = `${url}/user/loginuser`;
       try {
         const response= await axios.post(api , { email:email , password : password})
         console.log(response.data)
         toast(response.data.msg);
         localStorage.setItem("Token", response.data.Token);
         setTimeout(() => {
          navigate("/home");
         }, 1000);
       } catch (error) {
         toast(error.response.msg)
       }
    };
    const googlelogin=()=>{
      window.open("http://localhost:6005/auth/google/callback", "_self")
    }
  return (
    <>
      <Container fluid className="login-container">
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xs={10} sm={8} md={6} lg={4}>
            <div className="login-box p-4 shadow rounded bg-white">
              <h2 className="text-center mb-4">Login</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span>
                    Not a user? <a href="/register">Register now</a>
                  </span>
                </div>

                <Button
  variant="primary"
  type="submit"
  className="w-100"
  onClick={handleSubmit}
>
  Login
</Button>

<Button className="google-btn" onClick={googlelogin}>
  <img src={glogo} alt="Google" />
  Login with Google
</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer/>
    </>
  );
};
export default Login;

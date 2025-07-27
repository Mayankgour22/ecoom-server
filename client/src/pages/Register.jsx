import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import url from "../url/backendUrl";
import { useNavigate } from "react-router-dom";
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address:"",
    pincode:"",
    city:"",
    contact:"",
    password: "",
    confirm: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const handleSubmit = async(e) => {

    const form = e.currentTarget;
    e.preventDefault();
    let api = `${url}/user/registerUser`;
    if (
      form.checkValidity() === false ||
      formData.password !== formData.confirm
    ) {
      e.stopPropagation();
    } else {
      try {
       
        const response =await axios.post(api , formData) 
        console.log(response.data)
        navigate("/login")
      } catch (error) {
        console.log(error)
      }
      
    }
    setValidated(true);

  };

  return (
    <div id="registeruser">
      <div className="card">
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <h2 className="mb-4 text-center">Register</h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="registerName" className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="registerCity" className="mb-3">
                  <Form.Label>Enter City</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your City.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="registerContact" className="mb-3">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Enter your Contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your contact.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="useraddress" className="mb-3">
                  <Form.Label> Enter Addrerss</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your full address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your address
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="pincode" className="mb-3">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Enter your pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your pincode.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="registerEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="registerPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    minLength={6}
                    placeholder="Password (min 6 chars)"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 6 characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="registerConfirm" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Re-enter password"
                    name="confirm"
                    value={formData.confirm}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formData.confirm !== formData.password
                      ? "Passwords don't match."
                      : "Please confirm your password."}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default RegistrationForm;

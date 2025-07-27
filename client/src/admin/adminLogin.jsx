import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import url from "../url/backendUrl";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const AdminLogin = () => {
   const [email , setEmail] = useState("");
   const [ password , setPassword] = useState("");
   const navigate = useNavigate();
   const handleSubmit=async(e)=>{
    e.preventDefault();
       let api = `${url}/admin/adminlogin`
       try {
         const response = await axios.post(api , {email:email , password:password})
         console.log(response.data);
         localStorage.setItem("adminid" , response.data.Admin.adminid)
         localStorage.setItem("username", response.data.Admin.name);
         toast(response.data.msg)
         setTimeout(()=>{
            navigate("/dashbord")
         }, 1000)
       }
        catch (error) {
         console.log(error)
       }
   }
  return (
    <>
      <div className="adminlogin">
        <h1>Admin Login</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
      <ToastContainer/>
    </>
  );
};
export default AdminLogin;

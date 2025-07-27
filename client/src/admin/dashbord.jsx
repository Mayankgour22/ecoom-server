import { BsAlipay } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoBagHandleSharp } from "react-icons/io5";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Dashbord = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
    localStorage.clear();
    toast("Logout Done");
    setTimeout(()=>{ 
      navigate("/admin")
    },2000)
  }
  const handleShow = () => setShow(true);

  const name = localStorage.getItem("username");
  return (
    <>
      <nav id="navbar2">
        <span>
          <BsAlipay />
          N. Vares
        </span>
        <ul className="category2">
          <li>
            <a href="insert">Insert all </a>
          </li>
          <li onClick={()=>{navigate("order")}}> Order Details </li>
          <li> Track Order</li>
        </ul>
        <ul className="addcart2">
          <li onClick={handleShow}>
            <CgProfile />
          </li>
          <li>
            <IoBagHandleSharp />
          </li>
        </ul>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Admin Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>welcome {name}</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Dashbord;

import { BsAlipay } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoBagHandleSharp } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import url from "../url/backendUrl";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import "../css/ai.css";
import { BiSearch } from "react-icons/bi";


const Topnav = () => {
  const cartData = useSelector((state) => state.mycart.cart);
  const cartLength = cartData.length;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [search , setSearch]= useState("")

  const handleClose = () => {
    localStorage.clear();
    setShow(false);
    navigate("/login");
  };
  const handleShow = () => setShow(true);
   const handleSubmit=async(e)=>{
    e.preventDefault();
    navigate(`/search/search=${search}`)
   }
  return (
    <>
   <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
  <Container>
    <Navbar.Brand
      onClick={() => navigate("/")}
      style={{ cursor: "pointer" }}
    >
      <BsAlipay /> N. Veras
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="main-navbar-nav" />
    <Navbar.Collapse id="main-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link onClick={() => navigate("/shoping")}>Shop All</Nav.Link>
        <Nav.Link>About Us</Nav.Link>
        <Nav.Link>Contact</Nav.Link>
      </Nav>

  <div className="search-bar-container">
  <BiSearch className="search-bar-icon" />
  <input
    type="search"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <button onClick={handleSubmit}>Search</button>
</div>

      <Nav className="ms-auto">
        <Nav.Link onClick={() => navigate("/login")}>
          <CgProfile size={22} />
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/cartdata")}>
          <IoBagHandleSharp size={22} style={{ cursor: "pointer" }} />
          {cartLength > 0 && (
            <Badge bg="danger" pill className="ms-1">
              {cartLength}
            </Badge>
          )}
        </Nav.Link>
        <Nav.Link onClick={handleShow}>
          <AiOutlineLogout size={22} />
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      {/* Logout Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Hello {localStorage.getItem("username") || "Guest"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Topnav;

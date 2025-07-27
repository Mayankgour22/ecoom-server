import img1 from "../images/img.jpg.jpg"
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.jpg";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Shoping from "./shoping";
import url from "../url/backendUrl";
import axios from "axios";
import '../css/home.css';

const Home=()=>{
  const navigate = useNavigate();
  const authCheck=async()=>{
    const token = localStorage.getItem("Token")
    let api = `${url}/user/authuser`;
    if(token){
      try {
        const response = await axios.post(api, null, {
          headers: { "auth-token": token },
        });
        console.log(response.data);
        localStorage.setItem("username", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userid" , response.data._id)
        localStorage.setItem("isvalid" , true)
      } catch (error) {
        console.log(error);
        
      }
     
    }
    else{
      console.log("token not there")
    }
  }
  useEffect(()=>{
    authCheck();
  },[])
    return (
      <>
        <div className="home">
          <div className="rightHome">
            <div className="homeheading">
              <h1>Electroverse Wonderland</h1>
            </div>
            <div className="homepera">
              <p>Welcome to N. Veras Electronics, where technology meets</p>
              <p>
                innovation. Find the latest gadgets and devices to enhance your
              </p>
              <p>digital lifestyle.</p>
            </div>
            <button onClick={()=>{navigate("shoping")}}>Shop All</button>
          </div>
          <div className="lefthome">
            <Carousel>
              <Carousel.Item>
                <img src={img1} alt="" />
                <Carousel.Caption>
                  
                </Carousel.Caption>
                  
              </Carousel.Item>
              <Carousel.Item>
                <img src={img2} alt="" />
                <Carousel.Caption>
                  
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={img3} alt="" />
                <Carousel.Caption>
                
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={img4} alt="" />
                <Carousel.Caption>
                 
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={img5} alt="" />
                <Carousel.Caption>
                  
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        <br/>
        <Shoping/>
      </>
    );
}
export default Home
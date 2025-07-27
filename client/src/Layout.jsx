import { Outlet } from "react-router-dom"
import Footer from "./components/footer"
import Topnav from "./components/topnav"

const Layout=()=>{
  return(
    <>
    <Topnav/>
    <Outlet/>
    <Footer/>
    </>
  )
}
export default Layout
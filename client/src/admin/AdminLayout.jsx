import { Outlet } from "react-router-dom";
import Dashbord from "./dashbord";

const AdminLayout = ()=>{
    return(
        <>
        <Dashbord/>
        <Outlet/>

        </>
    )
}
export default AdminLayout;
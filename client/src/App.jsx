import { BrowserRouter , Routes , Route } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/home"
import AdminLogin from "./admin/adminLogin"
import Insert from "./admin/insert"
import AdminLayout from "./admin/AdminLayout"
import Shoping from "./pages/shoping"
import CartData from "./cartData"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Checkout from "./pages/Checkout"
import ProductDisplay from "./pages/productDisplay"
import OrderDetailes from "./admin/OrderDetailes"
import Search from "./pages/Search"

const app=()=>{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home/>}/>
            <Route path="*" element={<Home/>}/>
            <Route path="shoping" element={<Shoping />} />
            <Route path="cartdata" element={<CartData />} />
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="checkout" element={<Checkout/>}/>
            <Route path="productdisplay/:id" element={<ProductDisplay/>}/>
            <Route path="search/:search" element={<Search/>}/>
          </Route>
          <Route path="admin" element={<AdminLogin />}></Route>
          <Route path="dashbord" element={<AdminLayout />}>
            <Route index element={<Insert />} />
            <Route path="order" element={<OrderDetailes/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default app

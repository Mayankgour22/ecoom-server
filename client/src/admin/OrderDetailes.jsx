import { useState, useEffect } from "react";
import url from "../url/backendUrl";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
const OrderDetailes=()=>{
    const [mydata, setMydata]= useState([]);
    const lodedata=async()=>{
      let api= `${url}/admin/orderdetailes`
      const response = await axios.get(api)
      console.log(response.data);
      setMydata(response.data);
      
    }
    useEffect(()=>{
        lodedata();
    },[])
    const dispatchorder=async(id)=>{
      let api = `${url}/admin/dispatchorder/?id=${id}`
      const response = await axios.get(api);
      console.log(response.data)
      lodedata();
    }
    const ans=mydata.map((key)=>{
      return(
        <tr>
            <td>{key.clientname}</td>
            <td>{key.address}</td>
            <td>{key.city}</td>
            <td>{key.pincode}</td>
            <td>{key.products}</td>
            {key.isdispatched? <td><Button variant="success">Track Order</Button></td>: <td><Button variant="warning" onClick={()=>{dispatchorder(key._id)}}>Dispatch Order</Button></td>}
            
    
        </tr>
      )
    })
    return(
        <>
        <div className="orderdetailes1">
        <h1>ORDERS</h1>
          <Table striped bordered hover>
      <thead>
        <tr>
           <th>client name</th>
                <th>address</th>
                <th>city</th>
                <th>pincode</th>
                <th>products</th>
                <th>Dispatch</th>
        </tr>
      </thead>
      <tbody>
        {ans}
      </tbody>
     </Table>
        </div>
        </>
    )
}
export default OrderDetailes;
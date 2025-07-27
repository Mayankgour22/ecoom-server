import { useState } from "react";
import url from "../url/backendUrl";
import axios from "axios";
const Insert=()=>{
  const [input , setInput]= useState({});
  const [image  , setImage] = useState("");
  const handleInput=(e)=>{
    let name= e.target.name;
    let value= e.target.value;
    console.log(input);
    setInput({...input , [name]:value})
  }
  const handleImage=(e)=>{
     setImage(e.target.files)
     console.log(image)
  }
  const handleSubmit=async(e)=>{
   e.preventDefault();
   const formdata = new FormData();
   for(var key in input){
    formdata.append(key , input[key])

   }
   for (let i = 0; i < image.length; i++) {
     formdata.append("image", image[i]);
   }
   try {
    let api = `${url}/admin/datasava`
    const response = await axios.post(api , formdata)
    console.log(response.data)
    alert("product saved")
   } catch (error) {
    console.log(error)
   }
  }
    return (
      <>
        <div id="InsertData">
          <h1>Insert Datapage</h1>
          <form className="form-container">
            <div className="form-group">
              <label for="name">Product Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Product name"
                onChange={handleInput}
                required
              />
            </div>
            <div className="form-group">
              <label for="name">Product Description</label>
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Your product description"
                onChange={handleInput}
                required
              />
            </div>
            <div className="form-group">
              <label for="cars">Choose a category:</label>
              <select name="category" id="category" onChange={handleInput}>
                <option value="mobile">mobile</option>
                <option value="tablet">tablet</option>
                <option value="washingmachine">Washing Machine</option>
                <option value="computer">computer</option>
                <option value="laptop">laptop</option>
                <option value="speakers">speakers</option>
                <option value="refrigerator">refrigerator</option>
              </select>
            </div>
            <div className="form-group">
              <label for="Brand">Enter Brand</label>
              <input
                id="email"
                name="brand"
                type="text"
                placeholder="enter brand"
                onChange={handleInput}
                required
              />
            </div>

            <div className="form-group">
              <label for="price">Price</label>
              <input
                id="subject"
                name="price"
                type="text"
                onChange={handleInput}
                placeholder="Enter Price"
              />
            </div>

            <div className="form-group">
              <label for="Uplode Image">Uplode Image</label>
              <input type="file" name="img" onChange={handleImage} multiple />
            </div>

            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              Send
            </button>
          </form>
        </div>
      </>
    );
}
export default Insert;
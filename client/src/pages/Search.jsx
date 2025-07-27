import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";
import url from "../url/backendUrl";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const Search=()=>{
    const {search} = useParams();
    const [ mydata , setMydata] = useState([]);
    const lodedata= async()=>{
       let api = `${url}/user/searchproduct/?${search}`
       const response = await axios.get(api);
       console.log(response.data)
       setMydata(response.data);
    }
    useEffect(()=>{
        lodedata();

    },[])
    const ans = mydata.map((key)=>{
        return(
           <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={key.defaultimage} />
      <Card.Body>
        <Card.Title>{key.description}</Card.Title>
        <Card.Text>
           <h2>{key.name}</h2>
           <h4>{key.brand}</h4>
           <span><h1>{key.price}</h1></span>
        </Card.Text>
        <Button variant="primary">Add To Cart</Button>
      </Card.Body>
    </Card>
        )
    })
    return(
        <>
        <div className="search-results">
        <h1>Search Results</h1>
        {ans}
        </div>
        </>
    )
}
export default Search;
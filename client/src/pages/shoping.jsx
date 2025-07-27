import { useState, useEffect } from "react";
import url from "../url/backendUrl";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { addtoCart } from "../cartSlice";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"


const Shoping = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      let api = `${url}/user/datadisplay`;
      const response = await axios.get(api);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container className="shop-container my-5">
      <h2 className="text-center mb-4 text-primary">🛍️ Explore Our Products</h2>
      <Row>
        {products.map((product) => (
          <Col
            key={product._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4 d-flex"
          >
            <Card className="product-card shadow-sm flex-fill">
              <Card.Img
                variant="top"
                onClick={()=>{navigate(`productdisplay/${product._id}`)}}
                style={{cursor:"pointer"}}
                src={product.defaultimage}
                alt={product.name}
                className="product-img"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="product-name">{product.name}</Card.Title>
                <Card.Text className="flex-grow-1">
                  <small>{product.description}</small>
                  <br />
                  <strong className="brand">{product.brand}</strong>
                  <h5 className="price mt-2 text-success">₹{product.price}</h5>
                </Card.Text>
                <Button
                  className="mt-auto add-cart-btn"
                  onClick={() =>
                    dispatch(
                      addtoCart({
                        id: product._id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        brand: product.brand,
                        images: product.images,
                        defaultimage: product.defaultimage,
                        qnty: 1,
                      })
                    )
                  }
                >
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Shoping;

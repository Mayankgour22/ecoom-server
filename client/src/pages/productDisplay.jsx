import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import url from "../url/backendUrl";
import axios from "axios";
import { addtoCart } from "../cartSlice";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"

const ProductDisplay = () => {
    
  const dispatch = useDispatch();
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [defaultImg, setDefaultImg] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        let api = `${url}/user/displayproduct/?id=${id}`;
        try {
            const response = await axios.get(api);
            setProduct(response.data);
            setImages(response.data.images);
            setDefaultImg(response.data.defaultimage);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError("Failed to load product details");
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <button onClick={loadData} className="retry-btn">Try Again</button>
            </div>
        );
    }

    return (
        <div className="product-container">
            <div className="product-header">
                <h1 className="product-title">{product.name}</h1>
                <div className="breadcrumbs">
                    <span>Home</span> / <span>Products</span> / <span>{product.name}</span>
                </div>
            </div>

            <div className="product-content">
                <div className="image-gallery">
                    <div className="thumbnail-container">
                        {images.map((img, index) => (
                            <div 
                                key={index}
                                className={`thumbnail ${defaultImg === img ? 'active' : ''}`}
                                onClick={() => setDefaultImg(img)}
                                onMouseEnter={() => setDefaultImg(img)}
                            >
                                <img 
                                    src={img} 
                                    alt={`Thumbnail ${index + 1}`}
                                    className="thumbnail-img"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="main-image">
                        <img 
                            src={defaultImg} 
                            alt={product.name}
                            className="featured-image"
                        />
                    </div>
                </div>

                <div className="product-details">
                    <div className="price-section">
                        <span className="current-price">${product.price}</span>
                        {product.originalPrice && (
                            <span className="original-price">${product.originalPrice}</span>
                        )}
                    </div>

                    <div className="description-section">
                        <h3>Description</h3>
                        <p>{product.description || "No description available"}</p>
                    </div>

                    <div className="action-buttons">
                        <button className="add-to-cart" onClick={() =>
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
                  }>Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                    </div>

                    <div className="product-meta">
                        <div className="meta-item">
                            <span className="meta-label">Product ID:</span>
                            <span className="meta-value">{id}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Availability:</span>
                            <span className="meta-value in-stock">In Stock</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;
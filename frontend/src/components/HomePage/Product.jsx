import "../../css/HomePage/product.css";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function Product() {
  const location = useLocation();
  const product = location.state;
  const navigate = useNavigate();

  const handleItemClick = (product) => {
    navigate(`/order/${product._id}`, { state: product });
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product">
      <div className="prd-head"></div>
      <div className="prd-body">
        <div className="left">
          <img
            className="prd-img"
            src={product.img_url}
            alt={product.prd_name}
          />
        </div>
        <div className="right">
          <p className="prd-name">{product.prd_name}</p>
          <p className="prd-category">Brand : {product.prd_brand}</p>
          <p className="prd-price">Rs.{product.price}</p>
          <p className="prd-category">Category : {product.cetegory}</p>
          <p className="prd-stock">Stock: {product.stock}</p>

          <hr className="prd-separator" />

          <div className="prd-qty">
            <p>Quantity</p>
            <input type="number" defaultValue="1" min="1" max={product.stock} />
          </div>
          <button
            className="btn-add-to-cart"
            onClick={() => handleItemClick(product)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;

import React from "react"
import { useNavigate } from "react-router-dom";

interface ProductCardProps extends Record<string, any> { }

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const navigate = useNavigate();

  const { cartObject } = props

  const handleViewDetails = () => {
    navigate(`/product/${cartObject.id}`, { state: cartObject })
  };

  return (
    <div onClick={cartObject.inStock ? handleViewDetails : undefined} className={`product-card p-3 ${!cartObject.inStock ? "out-of-stock" : ""}`}>
      <div className="container justify-content-center align-items-center">
        <img
          src={cartObject.galleries[0].url}
          alt={cartObject.name}
          className="cartIconImage"
        />
        {!cartObject.inStock && (
          <p style={{ fontFamily: 'Raleway', fontWeight: 400, fontSize:24, }} className="out-of-stock-image container d-flex justify-content-center align-items-center"> OUT OF STOCK</p>
        )}
      </div>

      <div>
        <h3 style={{ fontFamily: 'Raleway', fontWeight: 300 }}>{cartObject.name}</h3>
        <p>
          {cartObject.prices[0].amount}$
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
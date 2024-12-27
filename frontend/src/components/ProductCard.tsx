import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

interface ProductCardProps extends Record<string, any> { }

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const navigate = useNavigate();

  const { cartObject } = props

  const handleViewDetails = () => {
    navigate(`/product/${cartObject.id}`, { state: cartObject })
  };


  const handleInstantAdd = () => {
    if (!cartObject) return;

    const groupedAttributes: { [key: string]: any[] } = cartObject.attributes.reduce(
      (acc: any, attr: any) => {
        acc[attr.type] = acc[attr.type] || [];
        acc[attr.type].push(attr);
        return acc;
      },
      {}
    );

    const updatedAttributes = Object.keys(groupedAttributes).map((type) => ({
      type,
      selected: groupedAttributes[type][0].value,
      options: groupedAttributes[type].map((attr) => attr.value),
    }));

    const updatedProduct = {
      ...cartObject,
      attributes: updatedAttributes,
    };

    console.log(updatedProduct)

    props.addToCart(updatedProduct);
  };

  const [isHovered, setIsHovered] = useState(false);

  const toKebabCase = (str: any) => str.replace(/\s+/g, '-').toLowerCase();


  return (
    <div
      data-testid={`product-${toKebabCase(cartObject.name)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={cartObject.inStock ? handleViewDetails : handleViewDetails} className={`product-card p-3 ${!cartObject.inStock ? "out-of-stock" : ""}`}>
      <div className="container justify-content-center align-items-center">
        <div className="imageContainer">
          <img
            src={cartObject.galleries[0].url}
            alt={cartObject.name}
            className="cartIconImage"
          />
          {cartObject.inStock && isHovered && (
            <button
              className="instantBuyButton"
              onClick={(e) => {
                e.stopPropagation();
                handleInstantAdd();
              }}
              disabled={!cartObject.inStock}><img className="instantBuyImage" src="https://i.imgur.com/2dyKRFB.png" />ADD</button>
          )}
        </div>

        {!cartObject.inStock && (
          <p style={{ fontFamily: 'Raleway', fontWeight: 400, fontSize: 24, }} className="out-of-stock-image container d-flex justify-content-center align-items-center"> OUT OF STOCK</p>
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
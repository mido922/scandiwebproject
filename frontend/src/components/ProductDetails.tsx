import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import LeftArrow from "../assets/LeftArrow.png";
import RightArrow from "../assets/RightArrow.png";
import Carousel from "./Carousel";

interface ProductDetailsProps extends Record<string, any> {}

const ProductDetails: React.FC<ProductDetailsProps> = (props) => {
  const location = useLocation();
  const product = location.state;
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});

  const groupedAttributes = product.attributes.reduce(
    (acc: any, attribute: any) => {
      if (!acc[attribute.type]) {
        acc[attribute.type] = [];
      }
      acc[attribute.type].push(attribute.value);
      return acc;
    },
    {}
  );

  const handleAttributeChange = (type: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const formattedDescription = product.description
    .replace(/\\n/g, "<br />")
    .replace(/\n/g, "<br />");

  console.log(formattedDescription);

  const isBuyNowDisabled = Object.keys(groupedAttributes).some(
    (type) => !selectedAttributes[type]
  );

  const addToCartButton = () => {
    handleAddToCart();
    console.log("hi");
    props.toggleCart();
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      attributes: Object.keys(groupedAttributes).map((type) => ({
        type,
        options: groupedAttributes[type],
        selected: selectedAttributes[type] || null,
      })),
      quantity: 1,
    };
    props.addToCart(productToAdd);
  };

  if (!product) {
    return (
      <div>
        <h2>No data found.</h2>
      </div>
    );
  }

  const toKebabCase = (str: any) => str.replace(/\s+/g, "-").toLowerCase();

  /*Carousel*/
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const jumpToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container d-flex flex-row" data-testid="product-gallery">
      <div
        className="d-flex flex-column flex-nowrap justify-content-between gap-2"
        style={{ height: 600 }}
      >
        {product.galleries.length > 1 &&
          product.galleries.map((cartObject: any, index: number) => (
            <div
              style={{
                width: "100px",
                backgroundImage: `url(${cartObject.url})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                flex: "1 1 auto",
                cursor: "pointer"
              }}
              onClick={() => jumpToImage(index)}
            ></div>
          ))}
      </div>

      <Carousel
        galleries={product.galleries}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        
      />

      <div className="ms-5">
        <h1 className="raleway" style={{ fontWeight: 600 }}>
          {product.name}
        </h1>
        <div id="radioButtons">
          {Object.keys(groupedAttributes).map((type) => (
            <div
              data-testid={`product-attribute-${toKebabCase(type)}`}
              className="mb-3"
              key={type}
            >
              <h5
                className="robotoCondensed capitalize"
                style={{ fontWeight: 700 }}
              >
                {type.toUpperCase()}:
              </h5>
              <div className="d-flex flex-row">
                {groupedAttributes[type].map((value: string) => (
                  <div
                    key={value}
                    className={`sourceSansPro attribute-box ${
                      selectedAttributes[type] === value ? "selected" : ""
                    }`}
                    data-testid={`product-attribute-${type.toLowerCase()}-${value}`}
                    onClick={() => handleAttributeChange(type, value)}
                    style={
                      type === "Color"
                        ? { backgroundColor: value, color: value }
                        : {}
                    }
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h5 className="robotoCondensed" style={{ fontWeight: 700 }}>
          PRICE:
        </h5>
        <h4 className="raleway" style={{ fontWeight: 700 }}>
          ${product.prices[0].amount}
        </h4>
        <button
          disabled={isBuyNowDisabled || product.inStock == 0}
          onClick={addToCartButton}
          className={`${
            product.inStock == 0 ? "outOfStockButton" : "addToCartButton"
          } p-1 d-flex justify-content-center align-items-center raleway`}
          data-testid="add-to-cart"
          style={{ fontWeight: 600 }}
        >
          ADD TO CART
        </button>
        <p
          id="productDescription"
          data-testid="product-description"
          className="roboto"
          style={{ fontWeight: 400, marginTop: 30 }}
        >
          {parse(formattedDescription)}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;

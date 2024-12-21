import React, { useState } from "react"
import { useLocation } from "react-router-dom";

interface ProductDetailsProps extends Record<string, any> { }

const ProductDetails: React.FC<ProductDetailsProps> = (props) => {
    const location = useLocation();
    const product = location.state;
    const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});

    const groupedAttributes = product.attributes.reduce((acc: any, attribute: any) => {
        if (!acc[attribute.type]) {
            acc[attribute.type] = [];
        }
        acc[attribute.type].push(attribute.value);
        return acc;
    }, {});

    const handleAttributeChange = (type: string, value: string) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    const isBuyNowDisabled = Object.keys(groupedAttributes).some(
        (type) => !selectedAttributes[type]
    );

    const handleAddToCart = () => {
        const productToAdd = {
            ...product,
            attributes: Object.keys(groupedAttributes).map((type) => ({
                type,
                options: groupedAttributes[type], // All available options
                selected: selectedAttributes[type] || null, // Selected attribute (if any)
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
        )
    }

    return (
        <div className="container d-flex flex-row">
            <div className="galleryList" id="productDetailsGalleries">
                {product.galleries.map((cartObject: any) => (
                    <img
                        key={product.galleries.id}
                        className="galleryImage border" src={cartObject.url} />
                ))}
            </div>

            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={product.galleries[0].url} />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={product.galleries[1].url} />
                    </div>
                </div>
            </div>
            <div>
                <h1 className="ralewayFont-600">{product.name}</h1>
                <div id="radioButtons ">
                    {Object.keys(groupedAttributes).map((type) => (
                        <div key={type}>
                            <h3 className="robotoFont-700 capitalize">{type}</h3>
                            <div className="d-flex flex-row">
                                {groupedAttributes[type].map((value: string) => (
                                    <div
                                        key={value}
                                        className={`attribute-box ${selectedAttributes[type] === value ? "selected" : ""
                                            }`}
                                        onClick={() => handleAttributeChange(type, value)}
                                    >
                                        {value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <h1>Price:</h1>
                    <h1>{product.prices[0].amount}</h1>
                </div>
                <button
                    disabled={isBuyNowDisabled}
                    onClick={handleAddToCart}
                    className="addToCartButton p-1 d-flex justify-content-center align-items-center"
                >ADD TO CART</button>
                <p>
                    {product.description}
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;
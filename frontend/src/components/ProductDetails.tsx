import React, { useState } from "react"
import { useLocation } from "react-router-dom";
import parse from 'html-react-parser';

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

    const formattedDescription = product.description
        .replace(/\\n/g, '<br />')
        .replace(/\n/g, '<br />');

    console.log(formattedDescription)

    const isBuyNowDisabled = Object.keys(groupedAttributes).some(
        (type) => !selectedAttributes[type]
    );

    const addToCartButton = () => {
        handleAddToCart ()
        console.log("hi")
        props.toggleCart()
    }

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
        )
    }

    const toKebabCase = (str:any) => str.replace(/\s+/g, '-').toLowerCase();

    return (
        <div className="container d-flex flex-row">
            <div 
            id="galleries"
            className="d-flex"
            data-testid='product-gallery'
            >
                <div className="galleryList  d-flex flex-column flex-nowrap" id="productDetailsGalleries">
                    {product.galleries.length > 1 && product.galleries.map((cartObject: any) => (
                        <img
                            key={product.galleries.id}
                            className="galleryImage border m-2" src={cartObject.url} />
                    ))}
                </div>

                <div id="productCarousel" className="carousel slide m-2" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {product.galleries.map((_: any, index: any) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#productCarousel"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : undefined}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {product.galleries.map((image: any, index: any) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                            >
                                <img
                                    src={image.url}
                                    alt={`Slide ${index + 1}`}
                                    style={{ objectFit: "cover", maxHeight: "500px" }}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#productCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#productCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className="ms-5">
                <h1 className="ralewayFont-600">{product.name}</h1>

                <div 
                id="radioButtons"
                >
                    {Object.keys(groupedAttributes).map((type) => (
                        <div
                        data-testid={`product-attribute-${toKebabCase(type)}`}
                        key={type}>
                            <h3 className="robotoFont-700 capitalize">{type}:</h3>
                            <div className="d-flex flex-row">
                                {groupedAttributes[type].map((value: string) => (
                                    <div
                                        key={value}
                                        className={`attribute-box ${selectedAttributes[type] === value ? "selected" : ""
                                            }`}
                                        data-testid={`product-attribute-${type.toLowerCase()}-${value}`}
                                        onClick={() => handleAttributeChange(type, value)}
                                        style={type === "Color" ? { backgroundColor: value, color: value } : {}}
                                    >
                                        {value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>


                <h1>Price:</h1>
                <h1>${product.prices[0].amount}</h1>
                <button
                    disabled={isBuyNowDisabled || product.inStock == 0}
                    onClick={addToCartButton}
                    className={`${product.inStock == 0 ? "outOfStockButton" : "addToCartButton"} p-1 d-flex justify-content-center align-items-center`}
                    data-testid='add-to-cart'
                >ADD TO CART</button>
                <p
                    id="productDescription"
                    data-testid='product-description'
                >
                    {parse(formattedDescription)}
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;
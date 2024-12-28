import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

interface MainPageProps extends Record<string, any> {}

const GET_PRODUCTS = gql`
  query GetProducts($category: String) {
    products(category: $category) {
      id
      name
      brand
      inStock
      description
      galleries {
        id
        url
      }
      prices {
        amount
      }
      attributes {
        type
        value
      }
    }
  }
`;

const MainPage: React.FC<MainPageProps> = (props) => {
  const { category } = useParams();

  useEffect(() => {
    props.setCategory(category || null);
  }, [category, props.setCategory]);

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category: category || null },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div
        className="category m-3"
        style={{ fontFamily: "Raleway", fontWeight: 400, fontSize: 42 }}
      >
        {category}
      </div>
      <div id="mainview" className="d-flex flex-wrap">
        {data.products.map((cartObject: any) => (
          <ProductCard
            key={cartObject.id}
            cartObject={cartObject}
            addToCart={props.addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;

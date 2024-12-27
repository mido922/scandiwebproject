import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CartList from "./CartList";

interface HeaderProps extends Record<string, any> { }

const Header: React.FC<HeaderProps> = (props) => {

  const GET_PRODUCTS = gql`
    query GetProducts($category: String) {
        products (category:$category) {
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
    }`;


  
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const { category } = useParams()

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category: category || null }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data)

  return (
    <div className="d-flex flex-column align-items-end">
      <header id="header" className='navbar container justify-content-between'>
        <div className="d-flex">
          <div>
            <a
              className={`categorybutton p-3 ${props.category == null ? 'active ralewayFont-600' : 'ralewayFont-400'}`} href="/all"
              data-testid={`${props.category == null ? 'active-category-link' : 'category-link'}`}
            >ALL</a>
          </div>
          <div>
            <a className={`categorybutton p-3 ${props.category == "tech" ? 'active ralewayFont-600' : 'ralewayFont-400'}`} href="/tech"
              data-testid={`${props.category == "tech" ? 'active-category-link' : 'category-link'}`}
            >TECH</a>
          </div>
          <div>
            <a className={`categorybutton p-3 ${props.category == "clothes" ? 'active ralewayFont-600' : 'ralewayFont-400'}`} href="/clothes"
              data-testid={`${props.category == "clothes" ? 'active-category-link' : 'category-link'}`}
            >CLOTHES</a>
          </div>
        </div>
        <img className="logoIcon" src="https://i.imgur.com/oRJfdK8.png"></img>
        <br></br>
        {props.cartCount}
        <button id="cartIconContainer" data-testid='cart-btn' onClick={toggleCart}>
          {(props.cartLength > 0) && (<div id="cartIconBubble">{props.cartLength}</div>)}
          <img className="cartIcon" src="https://i.imgur.com/CeWkpes.png" />
        </button>
      </header>
      {isCartOpen && (
        <CartList
          cartItems={props.cartItems}
          handlePlaceOrder={props.handlePlaceOrder}
          handleIncreaseQuantity={props.handleIncreaseQuantity}
          handleDecreaseQuantity={props.handleDecreaseQuantity}
        />
      )}
      {isCartOpen && (
        <div className='overlay-background' onClick={toggleCart}>
        </div>
      )}


    </div>
  )
}

export default Header;
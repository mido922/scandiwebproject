
import './customStyles.css'
import './bootstrap.css'
import Header from './components/Header.tsx'
import MainPage from './components/ProductMainPage.tsx'
import ProductDetails from './components/ProductDetails.tsx'
import { BrowserRouter as Router, Routes, Route, data, useParams } from 'react-router-dom'
import CartList from './components/CartList.tsx'
import { useEffect, useState } from 'react'
import React from 'react'
import { gql, useMutation } from '@apollo/client'

const App: React.FC = () => {


  const SAVE_ORDER_MUTATION = gql`
  mutation SaveOrder($orderedItems: [OrderedItemInput!]!) {
    saveOrder(orderedItems: $orderedItems) {
      success
      message
    }
  }
`;

  const [saveOrder] = useMutation(SAVE_ORDER_MUTATION)
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const addToCart = (product: any) => {
    const cartItemKey = JSON.stringify({
      product_id: product.id,
      attributes: product.attributes.map((attr: { type: any; selected: any }) => ({
        type: attr.type,
        value: attr.selected,
      })),
    });

    const existingItemIndex = cartItems.findIndex((item) => {
      const itemKey = JSON.stringify({
        product_id: item.id,
        attributes: item.attributes.map((attr: { type: any; selected: any }) => ({
          type: attr.type,
          value: attr.selected,
        })),
      });
      return itemKey === cartItemKey;
    });

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const newItem = {
        ...product,
        quantity: 1,
      };
      setCartItems([...cartItems, newItem]);
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, newItem]));
    }
  };

  const totalItems = cartItems.reduce((total: number, item: any) => total + item.quantity, 0)


  const handlePlaceOrder = async () => {
    const orderedItems = cartItems.flatMap((item) =>
      Array.from({ length: item.quantity }, () => ({
        product_id: item.id,
        quantity: item.quantity,
        attributes: item.attributes.map((attribute: any) => ({
          type: attribute.type,
          value: attribute.selected,
        })),
      }))
    );

    console.log("Ordered Items:", orderedItems);

    try {
      const response = await saveOrder({
        variables: { orderedItems },
      });
      setCartItems([]);

      console.log(response.data.saveOrder.message);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleIncreaseQuantity = (id: string, attributes: Record<string, string>) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id && JSON.stringify(item.attributes) === JSON.stringify(attributes)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (id: string, attributes: Record<string, string>) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && JSON.stringify(item.attributes) === JSON.stringify(attributes)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className='container'>
      <Header toggleCart={toggleCart}
        cartLength={totalItems}
        category={category}/>
      {isCartOpen && (
        <CartList
          cartItems={cartItems}
          handlePlaceOrder={handlePlaceOrder}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
        />
      )}
      {isCartOpen && (
        <div className='overlay-background' onClick={toggleCart}>
        </div>
      )}

      <Router>
        <Routes>
          <Route path="/" element={<MainPage data={data} setCategory={setCategory} />} ></Route>
          <Route path="/:category" element={<MainPage data={data} setCategory={setCategory} />} ></Route>
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} setCategory={setCategory} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
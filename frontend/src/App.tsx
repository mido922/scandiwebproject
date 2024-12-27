
import './customStyles.css'
import './bootstrap.css'
import Header from './components/Header.tsx'
import MainPage from './components/ProductMainPage.tsx'
import ProductDetails from './components/ProductDetails.tsx'
import { BrowserRouter as Router, Routes, Route, data } from 'react-router-dom'
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
  const [category, setCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen)


  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);


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
    setCartItems((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id && JSON.stringify(item.attributes) === JSON.stringify(attributes)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleDecreaseQuantity = (id: string, attributes: Record<string, string>) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === id && JSON.stringify(item.attributes) === JSON.stringify(attributes)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)

      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    }
    );
  };

  return (
    <div id="appPage" className='container'>
      <Header
        cartLength={totalItems}
        cartItems={cartItems}
        category={category}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handlePlaceOrder={handlePlaceOrder}
        toggleCart={toggleCart}
        isCartOpen={isCartOpen}
      />


      <Router>
        <Routes>
          <Route path="/" element={<MainPage data={data} setCategory={setCategory} addToCart={addToCart} />} ></Route>
          <Route path="/all" element={<MainPage data={data} setCategory={setCategory} addToCart={addToCart} />} ></Route>
          <Route path="/:category" element={<MainPage data={data} setCategory={setCategory} />} ></Route>
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} setCategory={setCategory} toggleCart={toggleCart} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
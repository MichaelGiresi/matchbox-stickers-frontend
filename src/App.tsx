import './App.css';

import Nav from './layouts/nav/Nav';
import HomePageOutput from './layouts/home-page/output/HomePageOutput';
import Footer from './layouts/footer/Footer';
import { CartContext } from './contexts/CartContext'
import Hero from './layouts/home-page/hero/Hero';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import ShopAll from './layouts/shop-all/ShopAll';
import { useEffect, useState } from 'react';
import ProductPage from './layouts/product-page/ProductPage'
import Cart from './layouts/cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './layouts/checkout/Checkout';
function App() {
const [products, setProducts] = useState()
const [cart, setCart] = useState(false)

const [cartSubTotal, setCartSubTotal] = useState(() => {
  const cartSubTotal = localStorage.getItem('cartSubTotal');
  return cartSubTotal ? JSON.parse(cartSubTotal) : 0
})

const [cartCount, setCartCount] = useState(() => {
  const storedCartCount = localStorage.getItem('cartCount');
  return storedCartCount ? JSON.parse(storedCartCount) : 0
})

const [localCartItems, setLocalCartItems] = useState(() => {
  const storedCartItems = localStorage.getItem('localCartItems');
  return storedCartItems ? JSON.parse(storedCartItems) : []
})

useEffect(() => {
  localStorage.setItem('cartSubTotal', JSON.stringify(cartSubTotal));
}, [cartSubTotal]);

useEffect(() => {
  localStorage.setItem('cartCount', JSON.stringify(cartCount));
}, [cartCount]);

useEffect(() => {
  localStorage.setItem('localCartItems', JSON.stringify(localCartItems));
}, [localCartItems]);

  // useEffect(() => {
  //   const getProducts = async () => {

  //     const url = `http://localhost:3000/products`
  //     const username = 'myusername';
  //     const password = 'mypassword';
  //     const credentials = btoa(`${username}: ${password}`)
  //     try {
  //       const response = await fetch('http://localhost:8080/products', {
  //         headers: {
  //           'Authorizaiton' : `Basic ${credentials}`,
  //         },
  //       });
  //       if(response.ok) {
  //         const responseData = await response.json();
  //         setProducts(responseData._embedded.products)
  //       } else {
  //         throw new Error('Request Failed')
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   getProducts()
  //   }, [])
  return (
    <div className='app'>
      <Router>
      <CartContext.Provider
          value={{
            cart,
            setCart,
            cartSubTotal,
            setCartSubTotal,
            cartCount,
            setCartCount,
            localCartItems,
            setLocalCartItems,
          }}>
      <Nav/>
        <Routes>
          <Route path="/" element={<HomePageOutput/>}/>
          <Route path={`/products/:productId`} element={<ProductPage/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
      <Footer/>
      </CartContext.Provider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

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
import { useLocation } from 'react-router-dom';
import oktaAuth from './oktaConfig.js'
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react'
import oktaConfig from './oktaConfig.js';


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

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function restoreOriginalUri(oktaAuth:any, originalUri:any) {
  oktaAuth.setOriginalUri(originalUri);
  window.location.replace(originalUri);
}
  return (
    <div className='app'>
      <Router>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>

        <ScrollToTop/>
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
          <Route path="/login/callback/" element={<LoginCallback/>} />
          <Route path="/" element={<HomePageOutput/>}/>
          <Route path={`/products/:productId`} element={<ProductPage/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
      <Footer/>
      </CartContext.Provider>
            </Security>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

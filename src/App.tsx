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
import Login from './auth/Login';
import { OktaAuth } from '@okta/okta-auth-js'
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';



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

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-28096334.okta.com/oauth2/default',
  clientId: '0oa9siomocTY4nllB5d7',
  redirectUri: window.location.origin + '/login/callback',
  pkce: true,
});

const config = {
  issuer: 'https://dev-28096334.okta.com/oauth2/default',
  clientId: '0oa9siomocTO4nllB5d7',
  redirectUri: window.location.origin + '/login/callback',
};

  return (
    <div className='app'>
      <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={(oktaAuth, originalUri) => { window.location.replace(originalUri || '/') }}>
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
          <Route path="/" element={<HomePageOutput/>}/>
          <Route path={`/products/:productId`} element={<ProductPage/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/login/callback' element={<LoginCallback />} />

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

import './App.css';

import Nav from './layouts/nav/Nav';
import HomePageOutput from './layouts/home-page/output/HomePageOutput';
import Footer from './layouts/footer/Footer';
import Hero from './layouts/home-page/hero/Hero';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import ShopAll from './layouts/shop-all/ShopAll';
import { useEffect, useState } from 'react';
import ProductPage from './layouts/product-page/ProductPage'
function App() {
const [products, setProducts] = useState()
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
      <Nav/>
        <Routes>
          <Route path="/" element={<HomePageOutput/>}/>
          <Route path={`/products/:productId`} element={<ProductPage/>}/>
        </Routes>
      <Footer/>
      </Router>

    </div>
  );
}

export default App;

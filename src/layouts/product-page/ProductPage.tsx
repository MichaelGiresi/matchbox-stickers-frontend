import React, { useContext, useEffect, useState } from 'react'
import { Product } from '../../models/Product'
import './product-page.css'
import { CartContext } from '../../contexts/CartContext'
import {toast} from 'react-toastify'
const ProductPage = () => {
  const cartContext = useContext(CartContext)
const productId = (window.location.pathname).split('/')[2]
const [product, setProduct] = useState<Product>()
useEffect(() => {
    const getPreviousDrops = async () => {
      const username = 'myusername';
      const password = 'mypassword';
      const credentials = btoa(`${username}:${password}`);
      
      try {
        const response = await fetch(`http://localhost:8080/products/${productId}`, {
          headers: {
            'Authorization' : `Basic ${credentials}`,
          },
        });
  
        if(response.ok) {
          const responseData = await response.json();
          setProduct(responseData)
        } else {
          throw new Error('Request failed')
        }
      } catch (error) {
        console.error(error)
      }
    }
    getPreviousDrops()
  }, [])



  const addProductToCart = (product: Product) => {
    // Update the localCartItems array
    cartContext?.setLocalCartItems((prevItems) => [...prevItems, product]);

    // Update the cartSubTotal
    cartContext?.setCartSubTotal((prevSubTotal) => prevSubTotal + product.unitPrice);
  };

  const addToCart = (product: Product) => {
    
    if(cartContext?.localCartItems.length == 0) {
      addProductToCart(product);
      toast.success('Added To Cart!')
    } else {
      let a = false
      for(let i = 0; i < cartContext?.localCartItems.length!; i++) {
        
        if(product.id == cartContext?.localCartItems[i].id) {
          console.log(`The product id = ${product.id} and the cartItemId = ${cartContext?.localCartItems[i].id}`)
          a = true
          
        }
      }
        if(a === false) {

          addProductToCart(product);
          toast.success('Added To Cart!')
        } else {

          toast.error ('Product Already in Cart')
        }
        
    }
  };


  return (
    <div className='product-page'>
        <div className='product-page-container'>
            

        <div className='product-page-image-container'><img className='product-image' src={product?.imageUrl}/></div>
        <div className='product-page-information-container'>
            <h1 className='product-page-information-name'>{product?.name}</h1>
            <h2 className='product-page-information-description' style={{marginTop: '0px', marginBottom: '0px', textAlign: "justify"}}>This beautiful painting portrays a woman with a mysterious gaze looking over her left shoulder. The artist has skillfully captured her elegance and allure, creating an intriguing piece that will captivate any art collector.</h2>
            <h1 className='product-page-information-price'>${product?.unitPrice}</h1>
            <button style={{cursor: 'pointer'}} onClick={(() => {addToCart(product)})} className='product-page-purchase-button'>ADD TO CART</button>
        </div>
            
        </div>
    </div>
  )
}

export default ProductPage
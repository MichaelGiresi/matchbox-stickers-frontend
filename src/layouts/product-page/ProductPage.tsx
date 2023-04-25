import React, { useEffect, useState } from 'react'
import { Product } from '../../models/Product'
import './product-page.css'
const ProductPage = () => {
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


  return (
    <div className='product-page'>
        <div className='product-page-container'>
            

        <div className='product-page-image-container'><img className='product-image' src={product?.imageUrl}/></div>
        <div className='product-page-information-container'>
            <h1 className='product-page-information-name'>{product?.name}</h1>
            <h2 className='product-page-information-description' style={{marginTop: '0px', marginBottom: '0px', textAlign: "justify"}}>This beautiful painting portrays a woman with a mysterious gaze looking over her left shoulder. The artist has skillfully captured her elegance and allure, creating an intriguing piece that will captivate any art collector.</h2>
            <h1 className='product-page-information-price'>${product?.unitPrice}</h1>
            <button className='product-page-purchase-button'>PURCHASE</button>
        </div>
            
        </div>
    </div>
  )
}

export default ProductPage
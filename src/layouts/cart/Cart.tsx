import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../contexts/CartContext'
import './cart.css'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';



const Cart = () => {
  const cartContext = useContext(CartContext)
  useEffect(() => {
    console.log(cartContext?.localCartItems)
  },[cartContext?.localCartItems])

  const removeProduct = (e:any) => {
    const a = cartContext?.localCartItems.length
    for( let i = 0; i < a!; i++ ) {
      if (cartContext?.localCartItems[i].id == e) {
        const b = cartContext?.localCartItems.filter(item => item !== cartContext?.localCartItems[i])
        cartContext?.setLocalCartItems(b!)
      }
    }
  
  }



  return (
    <div className='cart'>
      <div className='cart-container'>
        <h1 style={{alignSelf: 'center', marginBottom: '50px'}}>Cart Contents</h1>
          {cartContext?.localCartItems.map((product, index) => {
            return (
              <div className='cart-products'>
                <div className='cart-imageUrl-name-container'>
                  <img width='200px' src={product.imageUrl}/>
                  <h1>{product.name}</h1>
                </div>
                <div className='cart-unitPrice-description-container'>

                <h2>${product.unitPrice}</h2>
                <h6>{product.description}</h6>
                </div>
                <button onClick={() => {removeProduct(product.id)}} className='cart-remove-button'>REMOVE</button>
              </div>
              )
          })}
          <Link style={{alignSelf: 'center', width: '50%'}} to={'/checkout'}><button className='cart-checkout-button' >Continue to Checkout</button></Link>
      </div>
    </div>
  )
}

export default Cart
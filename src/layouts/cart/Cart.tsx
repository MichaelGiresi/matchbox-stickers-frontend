import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../contexts/CartContext'
import './cart.css'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';



const Cart = () => {
  const cartContext = useContext(CartContext)
  useEffect(() => {
    console.log(cartContext?.localCartItems)
    console.log(cartContext?.cartSubTotal)
  },[cartContext?.localCartItems])

  useEffect(() => {

    let a = 0
    let b = 0
    let c = cartContext?.localCartItems.length
    for(let i = 0; i < cartContext?.localCartItems.length; i++) {
     a += cartContext?.localCartItems[i].unitPrice 
     b = Math.round(a * 100) / 100
    }
    cartContext?.setCartSubTotal(b)
    cartContext?.setCartCount(c)

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
        <h1 style={{alignSelf: 'center', marginBottom: '50px', fontFamily: 'Allerta Stencil'}}>Cart Contents</h1>
          {cartContext?.localCartItems.map((product, index) => {
            return (
              <div className='cart-products'>
                <div className='cart-imageUrl-name-container'>

                  <img className='cart-image' width='200px' src={product.imageUrl}/>

                  <img width='200px' src={product.imageUrl}/>

                  <h1 style={{alignSelf:'center' , fontFamily: "Allerta Stencil"}}>{product.name}</h1>
                </div>
                <div className='cart-unitPrice-description-container'>

                <h2 style={{alignSelf:'center', fontFamily: "Barlow"}}>${product.unitPrice}</h2>
                <h4 style={{alignSelf:'center', fontFamily: "Barlow"}}>{product.description}</h4>
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
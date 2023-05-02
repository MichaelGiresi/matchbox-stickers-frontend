import React, { useContext, useEffect, useState } from 'react'
import './previous-drops.css'
import { Product } from '../../../models/Product'
import { Link } from 'react-router-dom';
import { CartContext } from '../../../contexts/CartContext';
import {toast} from 'react-toastify'
const PreviousDrops = () => {
  const cartContext = useContext(CartContext)
  const [previousDrops, setPreviousDrops] = useState<Product[] | undefined>();
  const [numContainers, setNumContainers] = useState(3)
  const [currentIndex, setCurrentIndex] = useState(0)
  const progressPercentage = (currentIndex / ((previousDrops?.length || 1) - numContainers)) * 100;
  
useEffect(() => {
  // console.log(cartContext?.cartCount)
}, [cartContext?.cartCount])


  useEffect(() => {
    const getPreviousDrops = async () => {
      const username = 'myusername';
      const password = 'mypassword';
      const credentials = btoa(`${username}:${password}`);
      
      try {
        const response = await fetch('http://localhost:8080/products', {
          headers: {
            'Authorization' : `Basic ${credentials}`,
          },
        });
  
        if(response.ok) {
          const responseData = await response.json();
          setPreviousDrops(responseData._embedded.products)
        } else {
          throw new Error('Request failed')
        }
      } catch (error) {
        console.error(error)
      }
    }
    getPreviousDrops()
  }, [])

  useEffect(() => {

    updateNumContainers();
    window.addEventListener('resize', updateNumContainers);

    return () => {
      window.removeEventListener('resize', updateNumContainers)
    }
  }, [previousDrops])

  const updateNumContainers = () => {
    if(window.innerWidth <= 768) {
      setNumContainers(1)
    } else {
      setNumContainers(3);
    }
  }

  const handleLeftButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        // If at the beginning of the array, move to the last valid index
        const lastIndex = Math.max((previousDrops?.length || 1) - numContainers, 0);
        return lastIndex;
      }
    });
  };
  
  const handleRightButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      const lastIndex = (previousDrops?.length || 1) - numContainers;
      if (prevIndex < lastIndex) {
        return prevIndex + 1;
      } else {
        // If at the end of the array, move to the beginning
        return 0;
      }
    });
  };

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
    <div className='previousdrops'>
      <div className='previousdrops-text-container'>
        <h4>PREVIOUS DROPS</h4>
        <h6>Get them before they're gone!</h6>
      </div>
      <div className='previousdrops-carousel'>





        <div className='previousdrops-carousel-slides-container'>
          {previousDrops?.slice(currentIndex, currentIndex + numContainers).map((product, index) => {
            return (
          <div className='previousdrops-carousel-slide1-container'>
            <Link to={`/products/${product.id}`} className="previousdrops-carousel-slide1-image-container"><img width="75%" height='75%' src={product.imageUrl}/></Link>
            <div className="previousdrops-carousel-slide1-title-button-remaining-container">
              <h4>{product.name}</h4>
              {product.active === true ? <button style={{cursor: 'pointer'}} onClick={() => {addToCart(product)}}>PURCHASE</button> : <button>SOLD OUT</button>}
              <p>In Stock: {product.quantity} of 100</p>
            </div>
          </div>
          )
        })}
        </div>
        <div className='previousdrops-carousel-nav-container'>
          <div className='previousdrops-carousel-nav-button-container'>
            <button onClick={handleLeftButtonClick} id='previousdrops-carousel-nav-button-left'>&#60;</button>
            <button onClick={handleRightButtonClick} id='previousdrops-carousel-nav-button-right'>&#62;</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviousDrops
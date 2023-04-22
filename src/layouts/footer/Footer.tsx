import React from 'react'
import './footer.css'
import mbsSmall from '../../assets/mbsSmall.png'
import {FaInstagram, FaTwitter, FaFacebook, FaGoogle} from 'react-icons/fa'

const Footer = () => {

  return (

    <div className='footer'>
      <div className='footer-container'>
        <div className='footer-inner-container'>
          <div className='footer-mbs-container'><img className='footer-mbs' src={mbsSmall}/></div>
          <div className='footer-shop-container'>
            <div className='shop-title'>SHOP</div>
            <div className="titles-styles" >Drops</div>
            <div className="titles-styles" >Merch</div>
            <div className="titles-styles" >All</div>
          </div>
          <div className='footer-about-container'>
            <div className='about-title-footer'>ABOUT</div>
            <div className='about-about'>Privacy Policy</div>
            <div className='about-about'>Terms & Conditions</div>
            <div className='about-about'>Contact Us</div>
          </div>
          <div className='footer-social-container'>
            <div className='footer-social'>SOCIAL</div>
            <br/>
            <br/>
            <div className='footer-social-inner-container'>
              <FaInstagram className='insta' />
              <FaTwitter className='twitter'/>
              <FaFacebook className='facebook'/>
              <FaGoogle className='google'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
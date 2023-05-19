import React, {useState, useEffect, useContext} from 'react'
import mbsSmall from '../../assets/mbsSmall.png'
import mbsMedium from '../../assets/mbsMedium.png'
import { Link } from 'react-router-dom';
import './nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../contexts/CartContext';

const Nav = () => {
  const cartContext = useContext(CartContext)
  const aboutId = document.getElementById('aboutId');
  const [about, setAbout] = useState(true)
  const [menuVisible, setMenuVisible] = useState(false)
  const [aboutOverlayVisible, setAboutOverlayVisible] = useState(false)

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  const toggleAboutOverlay = () => {
    setAboutOverlayVisible(!aboutOverlayVisible)
  }

  const mobileAboutPage = () => {
    toggleAboutOverlay()
    toggleMenu()
  }
    




  return (
    <div className='nav'>

      {/* Nav Start */}
      
      <nav className='nav-container'>
        <div className='nav-container-desktop-links'>
          <div onClick={toggleAboutOverlay} className='nav-about'>
            ABOUT THE PROJECT
          </div>
          <div className='nav-img'><Link to={'/'}><img style={{width: '100%'}} src={mbsMedium}/></Link></div>
          <div className='nav-account-cart-container'>
          <Link to={'/cart'} style={{textDecoration: 'none', color: 'black'}}>Cart ( {cartContext?.localCartItems.length} )</Link>
          </div>
        </div>
        <div style={{marginLeft: "15px"}} className='nav-img-hamburger'><Link to={'/'}><img style={{width: '100%'}} src={mbsMedium}/></Link></div>
      <FontAwesomeIcon onClick={toggleMenu} className='hamburger-nav-icon' style={{marginRight: "15px", marginTop: "10px"}} size='3x' icon={faBars}/>
      <div className={`menu ${menuVisible ? 'active' : ''}`}>
        <div className='hamburger-menu-container' style={{height: "70px"}}>
      <FontAwesomeIcon onClick={toggleMenu} className='hamburger-nav-icon' style={{marginRight: "15px", marginTop: "10px"}} size='3x' icon={faBars}/>
        </div>
        <div className='hamburger-menu-icons' onClick={mobileAboutPage}>ABOUT PAGE</div>
        <Link to={'/cart'} onClick={toggleMenu}  className='hamburger-menu-icons'>CART ({cartContext?.cartCount})</Link>
      </div>
      </nav>
      <div onClick={toggleAboutOverlay} className={`aboutOverlay ${aboutOverlayVisible ? 'active' : ''}`}>

    <div className='about-title'>WELCOME TO MATCHBOX STICKERS</div>
    <div className='about-info'>The ultimate online platform for aspiring creators to showcase and sell their limited edition, one-of-a-kind creations. With a focus on exclusivity and uniqueness, Matchbox Stickers brings together artists and collectors in a thrilling race against time.</div>
    <div className='about-how-container'>
      <div className='about-how-title'>HOW'S IT WORK?</div>
      <div className='about-how-info'>As a creator, simply upload your one-of-a-kind designs, set your sale parameters, and watch as eager collectors flock to your exclusive, time-sensitive sale. But remember, once the stickers are sold out, they're gone for good, adding to the excitement and anticipation of each new release.
<br/><br/>
For collectors, Matchbox Stickers offers a treasure trove of rare and unique designs that can't be found anywhere else. The thrill of competing against time and fellow collectors to secure a limited edition piece makes every purchase a memorable experience. Plus, with new creations going live regularly, there's always something fresh and exciting to discover.
<br/><br/>
By connecting artists and collectors in a dynamic, fast-paced environment, Matchbox Stickers is revolutionizing the world of limited edition stickers. So, don't wait any longer! Visit matchboxstickers.com today and join our thriving community of creators and collectors, and experience the thrill of collecting and creating like never before!</div>
    
  </div>
      </div>
    </div>
  )
}

export default Nav
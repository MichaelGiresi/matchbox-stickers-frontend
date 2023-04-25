import React from 'react'
import './how-it-works.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons, faPaintBrush, faPaintbrush, faPencilAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
const HowItWorks = () => {
  return (
    <div className='howItWorks'>
      <div className='howItWorks-container'>
        <h6 className='howItWorks-title'>HOW IT WORKS</h6>
        <p className='howItWorks-title-paragraph'>At Matchbox Stickers, we understand the importance of exclusivity and uniqueness in the world of art. That's why we've created a marketplace where creators can set the exact time and date their creations will be available for sale, as well as the limited quantity they wish to offer.</p>
        <div className='howItWorks-image-info-container'>
          <div className='howItWorks-info-container1'>
            <div style={{marginBottom: '15px'}}>

          <FontAwesomeIcon style={{marginBottom: '15px'}} size= '5x' icon={faPaintbrush} />
            <div className='howItWorks-imagetitle-styles'>Creators</div>
            </div>
            <div className='howItWorks-imageparagraph-styles'>Simply upload your one-of-a-kind designs, set your sale parameters, and watch as eager collectors flock to your exclusive, time-sensitive sale. But remember, once they're sold out, they're gone for good, adding to the excitement and anticipation of each new release.</div>
          </div>
          <div className='howItWorks-image-info-container2'>
            <div style={{marginBottom: '15px'}}>

          <FontAwesomeIcon style={{marginBottom: '15px'}} size= '5x' icon={faIcons} />
            <div className='howItWorks-imagetitle-styles' >Collectors</div>
            </div>
            <div className='howItWorks-imageparagraph-styles'>Matchbox Stickers offers a treasure trove of rare and unique designs that can't be found anywhere else.  Plus, with new creations going live regularly, there's always something fresh and exciting to discover.</div>
          </div>
          <div className='howItWorks-image-info-container3'>
            <div style={{marginBottom: '15px'}}>

          <FontAwesomeIcon style={{marginBottom: '15px'}} size= '5x' icon={faUsers} />
            <div className='howItWorks-imagetitle-styles' >The Community</div>
            </div>
            <div className='howItWorks-imageparagraph-styles'>By connecting artists and collectors in a dynamic, fast-paced environment, Matchbox Stickers is revolutionizing the world of limited edition stickers. So, don't wait any longer! Experience the thrill of collecting and creating like never before!</div>
          </div>
        </div>
        <div className='howItWorks-getdropalerts-container'>
          <div className='howItWorks-getdropalerts-img-container'></div>
          <div className='hotItWorks-getdropalerts-text-input-container'>
            <div className='howItWorks-getdropalerts-text-input-inner-container'>
              <div className='howItWorks-getdropalerts-text-container'>
                <h5>GET DROP ALERTS</h5>
                <h6>WE PROMISE NOT TO SPAM YOU.</h6>
                <p>Sign up for alerts for upcomming drops and new opportunities for creators.</p>
              </div>
              <div className='input-button-container'>
                <input className='howItWorks-getdropalerts-input' placeholder='    YOUR EMAIL GOES HERE'></input>
                <button className='howItWorks-getdropalerts-input-button'>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
import React from 'react'
import './previous-drops.css'

const PreviousDrops = () => {
  return (
    <div className='previousdrops'>
      <div className='previousdrops-text-container'>
        <h4>PREVIOUS DROPS</h4>
        <h6>Get them before they're gone!</h6>
      </div>
      <div className='previousdrops-carousel'>
        <div className='previousdrops-carousel-slides-container'>
          <div className='previousdrops-carousel-slide1-container'>
            <div className="previousdrops-carousel-slide1-image-container"></div>
            <div className="previousdrops-carousel-slide1-title-button-remaining-container">
              <h6>FRUIT ON FURNITURE</h6>
              <button>SOLD OUT</button>
              <p>0 of 100 REMAINING</p>
            </div>
          </div>
          <div className='previousdrops-carousel-slide2-container'>
            <div className="previousdrops-carousel-slide2-image-container"></div>
            <div className="previousdrops-carousel-slide2-title-button-remaining-container">
              <h6>FRUIT ON FURNITURE</h6>
              <button>SOLD OUT</button>
              <p>0 of 100 REMAINING</p>
            </div>
          </div>
          <div className='previousdrops-carousel-slide3-container'>
            <div className="previousdrops-carousel-slide3-image-container">
               
            </div>
            <div className="previousdrops-carousel-slide3-title-button-remaining-container">
              <h6>FRUIT ON FURNITURE</h6>
              <button>SOLD OUT</button>
              <p>0 of 100 REMAINING</p>
            </div>
          </div>
        </div>
        <div className='previousdrops-carousel-nav-container'>
          <div className='previousdrops-carousel-nav-line-container'>
            <div className='previousdrops-carousel-nav-line'></div>
            <div className='previousdrops-carousel-nav-progress-line'></div>
          </div>
          <div className='previousdrops-carousel-nav-button-container'>
            <button id='previousdrops-carousel-nav-button-left'>&#60;</button>
            <button id='previousdrops-carousel-nav-button-right'>&#62;</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviousDrops
import React from 'react';
import './red-bullets.css'

const RedBullets = () => {
  return (
    <div className='redBullets-container'>
      <div className='redBullets-container1'>
        <div className='redBullets-redCircle'></div>
        <div>&nbsp;New York designed & developed</div>
      </div>
      <div className='redBullets-container2'>
        <div className='redBullets-redCircle'></div>
        <div>&nbsp;Each limited edition pack is signed & numbered</div>
      </div>
      <div className='redBullets-container3'>
        <div className='redBullets-redCircle'></div>
        <div>&nbsp;Limit 2 per customer</div>
      </div> 
    </div>
  )
};

export default RedBullets;

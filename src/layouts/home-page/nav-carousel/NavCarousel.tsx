import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import './nav-carousel.css'

const NavCarousel = () => {
  return <div>

      <AwesomeSlider className='nav-carousel'>
          <div>Each sticker pack contains x stickers. % basic stickers are gaurenteed per pack. Each pack has a 1/5 chance of containing an “Elite” sticker.</div>
          <div>Each drop has a defined quantity, and once it's gone, it won't return</div>
          <div>We release drops that are unique, and of the highest quality</div>
          <div>Don't miss out</div>
      </AwesomeSlider>


        </div>;
};

export default NavCarousel;


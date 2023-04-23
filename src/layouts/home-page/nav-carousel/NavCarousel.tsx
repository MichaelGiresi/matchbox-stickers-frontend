import React, { useEffect, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import './nav-carousel.css'

const NavCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const interval = 10000; // 10 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 4); // Change 4 to the number of slides
    }, interval);

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div>
      <AwesomeSlider
        className="nav-carousel"
        selected={currentSlide}
        onTransitionEnd={({ currentIndex }) => setCurrentSlide(currentIndex)}
      >
        <div>
          A unique marketplace for exclusive, limited edition art. Creators control sale time & quantity.
        </div>
        <div>
          Collectors enjoy the thrill of securing rare, one-of-a-kind creations.
        </div>
        <div>
          Each drop is exclusive and once it's gone, it won't return.
        </div>
        <div>
          Join our community and experience the excitement of collecting and creating like never before.
        </div>
      </AwesomeSlider>
    </div>
  );
};

export default NavCarousel;


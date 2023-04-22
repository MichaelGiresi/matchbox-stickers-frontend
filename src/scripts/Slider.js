import React, { useState } from 'react'
import { SliderData } from './SliderData'

const Slider = ({ slides }) => {
    const [current,setCurrent] = useState(0)
    const length = slides.length

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    console.log(current)

    if(!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

  return (
    <section className='slider'>
        <button className="left-arrow" onClick={prevSlide}>&#60;</button>
        
        {SliderData.map((slide,index) => {
            return (
                <div className={index === current ? "slide active" : 'slide' && 'slide-inactive'} key={index}>
                    <div className='image'>{slide.html}</div>
                </div>
            )
            
        })}
        <button className="right-arrow" onClick={nextSlide} >&#62;</button>
    </section>
  )
}

export default Slider
import React from 'react'
import NavCarousel from '../nav-carousel/NavCarousel'
import RedBullets from '../red-bullets/RedBullets'
import MbsMerch from '../mbs-merch/MbsMerch'
import HowItWorks from '../how-it-works/HowItWorks'
import PreviousDrops from '../previous-drops/PreviousDrops'
import Hero from '../hero/Hero'

const HomePageOutput = () => {
  return (
    <div>

    <NavCarousel/>
    <Hero/>
    <RedBullets/>
    <MbsMerch/>
    <PreviousDrops/>
    <HowItWorks/>
    </div>
  )
}

export default HomePageOutput
import React, {useState, useEffect, useRef } from 'react'
import './hero.css'
import VideoPlayer from '../../../scripts/videoPlayer.js'
const Hero = () => {


  
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const videoPath = `${process.env.PUBLIC_URL}/assets/mbsVideo.mp4`;
    const videoElement = useRef<HTMLVideoElement | null>(null);
    const {
      playerState,
      togglePlay,
      handleOnTimeUpdate,
      handleVideoProgress,
      handleVideoSpeed,
      toggleMute,
      setHeroButtonTime,
    } = VideoPlayer({ videoElement, src: videoPath });
  
    const [currentTime, setCurrentTime] = useState(0);
  
    const handleOnTimeUpdateWithCurrentTime = () => {
      handleOnTimeUpdate();
      if(videoElement.current) {

        setCurrentTime(videoElement.current.currentTime);
      }
    };
  
    useEffect(() => {
      const ids = ['btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6'];
      const timeThresholds = [0, 50, 100, 150, 200, 250];
    
      ids.forEach((id, index) => {
        const button = document.getElementById(id);
    
        if (button) {
          if (
            currentTime >= timeThresholds[index] &&
            (index === timeThresholds.length - 1 || currentTime < timeThresholds[index + 1])
          ) {
            button.classList.add('border-select');
          } else {
            button.classList.remove('border-select');
          }
        }
      });
    }, [currentTime]);
  
  return (
    <div className='hero'>
      <div className="hero-container">
        <div className='hero-video-buttons-container'>
          <div className='hero-buttons-video-container'>
            <div className='hero-video-container'>
              <video 
                className="video"
                ref={videoElement}
                src={videoPath}
                onTimeUpdate={handleOnTimeUpdateWithCurrentTime}
                onLoadedMetadata={() => setIsPageLoaded(true)}
                muted
                autoPlay
                loop
              />
              <div className='video-controls'>
                <button className="video-mute-toggle" onClick={toggleMute}>Mute</button>
              </div>
            </div>
          </div>
        </div>
        <div className='hero-drop-info-container'>
          <div className='hero-drop-info'>
            <h1 className='hero-drop-title'>UPCOMMING DROPS:</h1>
            <p className='hero-drop-upcomming-drop'>Resonance of Forgotten Time</p>
            <p className='hero-drop-upcomming-drop' >Chromatica Dreams</p>
            <p className='hero-drop-upcomming-drop' >Whispered Reflections</p>
            <p className='hero-drop-upcomming-drop' >Quantum Imagination</p>
            <p className='hero-drop-upcomming-drop' >Dance of the Ethereal Shadows</p>
            <p className='hero-drop-upcomming-drop' >Silent Symphony of the Cosmos</p>
          </div>
          
          {/* <div className='hero-drop-info-container2'>
            <div className='hero-drop-into-title'>DROP #1</div>
            <h1 className='hero-drop-title'>WHATEVER WEATHER</h1>
            <p id='hero-info'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            <button id='hero-button'>ADD TO CART <sup className='sup-dollar'>$</sup>12.00</button>
            <div className="remaining__remainingProgressBar">                
              <h6 id="remaining">21 <span className='remaining-span'>of 100</span> Remaining</h6>
              <div id="remainingProgressBar"></div>
              <div id="remainingProgressBarStatus"></div>
            </div>
          </div> */}
        </div>
      </div>
      {/* <div className='hero-bottom'>
        <div className="countdown">
          <h6 id="countdown__nextDrop">NEXT DROP</h6>
          <h5 id="countdown__dropTitle">CLASSIC<br/> CARS</h5>
          <h5 id="countdown__timeRemaining">JULY 1<sup className='sup'>ST</sup></h5>
        </div>
      </div> */}
    </div>

  )


}
export default Hero;

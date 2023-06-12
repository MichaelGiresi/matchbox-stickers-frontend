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
          
        </div>
      </div>
    </div>

  )


}
export default Hero;

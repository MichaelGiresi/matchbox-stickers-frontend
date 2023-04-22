import React, {useState, useEffect, useRef } from 'react'
import video from '../assets/video.mp4'
import VideoPlayer from './videoPlayer'

const HeroVideoButtons = () => {

  const videoElement = useRef(null)
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    heroButtonOneTime,
    heroButtonTwoTime,
    heroButtonThreeTime,
    heroButtonFourTime,
    heroButtonFiveTime,
    heroButtonSixTime,

  } = VideoPlayer(videoElement)


useEffect(() => {

  
  if(HeroVideoButtons) {
    console.log(videoElement.current.currentTime)
    const id1 = document.getElementById('btn1')
    const id2 = document.getElementById('btn2')
    const id3 = document.getElementById('btn3')
    const id4 = document.getElementById('btn4')
    const id5 = document.getElementById('btn5')
    const id6 = document.getElementById('btn6')

    if((videoElement.current.currentTime <= 49.9999))  {
      id1.classList.add('border-select')
    } else {
      id1.classList.remove('border-select')
    }
    if(videoElement.current.currentTime >= 50 && videoElement.current.currentTime <= 99.9999) {
      id2.classList.add('border-select')
    } else {
      id2.classList.remove('border-select')
    }
    if(videoElement.current.currentTime >= 100 && videoElement.current.currentTime <= 149.9999) {
      id3.classList.add('border-select')
    } else {
      id3.classList.remove('border-select')
    }
    if(videoElement.current.currentTime >= 150 && videoElement.current.currentTime <= 199.9999) {
      id4.classList.add('border-select')
    } else {
      id4.classList.remove('border-select')
    }
    if(videoElement.current.currentTime >= 200 && videoElement.current.currentTime <= 249.9999) {
      id5.classList.add('border-select')
    } else {
      id5.classList.remove('border-select')
    }
    if(videoElement.current.currentTime >= 250 ) {
      id6.classList.add('border-select')
    } else {
      id6.classList.remove('border-select')
    }
  }
})
  
  return (
    <div className='hero-buttons-video-container'>
              <div className='hero-button-container'>
        <button id='btn1' className='hero-button-1 ' onClick={heroButtonOneTime}>

        </button>
        <button id='btn2' className='hero-button-2' onClick={heroButtonTwoTime} >              {!playerState.isPlaying ? (
                <i className="bx bx-play"></i>
              ) : (
                <i className="bx bx-pause"></i>
              )}</button>
        <button id="btn3" className='hero-button-3' onClick={heroButtonThreeTime}></button>
        <button id="btn4" className='hero-button-4' onClick={heroButtonFourTime}></button>
        <button id="btn5" className='hero-button-5' onClick={heroButtonFiveTime}></button>
        <button id="btn6" className='hero-button-6' onClick={heroButtonSixTime}></button>
      </div>
      <div className='hero-video-container'>



        <video 
               className="video"
               src={video} 
               ref={videoElement}
               onClick={togglePlay}
               onTimeUpdate={handleOnTimeUpdate}
               muted
               autoPlay
               loop
               />
               <div className='video-controls'>
               <input 
                      className="video-slider"
                      type='range' 
                      min="0"
                      max="100"
                      value={playerState.progress}
                      onChange={(e) => handleVideoProgress(e)}
                        />

              <select
                className="video-speed-select"
                value={playerState.speed}
                onChange= {(e) => handleVideoSpeed(e)}>
                  <option value="0.50">0.50</option>
                  <option value="1">1</option>
                  <option value="1.25">1.25</option>
                  <option value="2">2</option>
                </select>
                      <button className="video-mute-toggle" onClick={toggleMute}>Mute</button>
                      </div>
      </div>
    </div>
  )
}

export default HeroVideoButtons
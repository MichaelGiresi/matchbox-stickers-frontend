// // START CAROUSEL

// // import NavCarousel from "../components/NavCarousel";



// let slidePosition = 0;
// const slides = document.getElementsByClassName('carousel__item');
// const totalSlides = slides.length;

// document.getElementById('carousel__button--next')
// .addEventListener("click", function(){
//     moveToNextSlide();
// })

// document.getElementById('carousel__button--prev')
// .addEventListener("click", function(){
//     moveToPrevSlide();
// })

// function updateSlidePosition() {
//     for (let slide of slides) {
//         slide.classList.remove ('carousel__item--visible')
//         slide.classList.add ('carousel__item--hidden')
//     }
//     slides[slidePosition].classList.add('carousel__item--visible')
// }



// function moveToNextSlide() {
//     if (slidePosition == totalSlides -1) {
//         slidePosition = 0
//     } else {
//         slidePosition++;
//     }
// updateSlidePosition()
// }

// function moveToPrevSlide()  {   
//     if (slidePosition == 0) {
//     slidePosition = totalSlides - 1
// } else {
//     slidePosition--;
// }
// updateSlidePosition()
// }

// // END CAROUSEL

// // // VIDEO + VIDEO BUTTONS

// // const video = document.getElementById('videoid');
// // const buttonOne = document.getElementById('vid__button-1');
// // const buttonTwo = document.getElementById('vid__button-2');
// // const buttonThree = document.getElementById('vid__button-3');
// // const buttonFour = document.getElementById('vid__button-4');
// // const buttonFive = document.getElementById('vid__button-5');
// // const buttonSix = document.getElementById('vid__button-6');

// // buttonOne.addEventListener('click', buttonOneTimeHandler, false);

// // function buttonOneTimeHandler() {
// //     if (buttonOne) {
// //         document.getElementById('videoid').currentTime = 50;
         
// //     }
// //  }

// //  buttonTwo.addEventListener('click', buttonTwoTimeHandler, false);

// // function buttonTwoTimeHandler() {
// //     if (buttonTwo) {
// //         document.getElementById('videoid').currentTime = 60;
// //     }
// //  }

// //  buttonThree.addEventListener('click', buttonThreeTimeHandler, false);

// // function buttonThreeTimeHandler() {
// //     if (buttonThree) {
// //         document.getElementById('videoid').currentTime = 70;
// //     }
// //  }

// //  buttonFour.addEventListener('click', buttonFourTimeHandler, false);

// // function buttonFourTimeHandler() {
// //     if (buttonFour) {
// //         document.getElementById('videoid').currentTime = 80;
// //     }
// //  }

// //  buttonFive.addEventListener('click', buttonFiveTimeHandler, false);

// // function buttonFiveTimeHandler() {
// //     if (buttonFive) {
// //         document.getElementById('videoid').currentTime = 90;
// //     }
// //  }

// //  buttonSix.addEventListener('click', buttonSixTimeHandler, false);

// // function buttonSixTimeHandler() {
// //     if (buttonSix) {
// //         document.getElementById('videoid').currentTime = 100;
// //     }
// //  }

// // // VIDEO AND VIDEO BUTTONS END

// // // INVENTORY REMAINDER 


// // const elem = document.querySelector('#intro');


// // console.log(elem.innerText);

// // console.log(elem.textContent);

// // elem.innerText = 'Hey there! I am Atta';
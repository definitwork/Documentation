/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/HomePage.js":
/*!************************************!*\
  !*** ./src/components/HomePage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePage: () => (/* binding */ HomePage)
/* harmony export */ });
async function HomePage() {

  const cardbtnmore = document.querySelector('.cards__button_more'),
    cardbtnhide = document.querySelector('.cards__button_hide'),
    cardmore = document.querySelector('.cards__button_m'),
    cardhide = document.querySelector('.cards__button_h'),

    board = document.querySelector('.board__cards_container')

    cardbtnhide.addEventListener('click', ()=>{
      cardhide.classList.toggle('active')
      cardmore.classList.toggle('active')
      board.classList.toggle('full')
    })

    cardbtnmore.addEventListener('click', ()=>{
      cardhide.classList.toggle('active')
      cardmore.classList.toggle('active')
      board.classList.toggle('full')
    })

  return    
}


/***/ }),

/***/ "./src/components/videoplayer.js":
/*!***************************************!*\
  !*** ./src/components/videoplayer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoPlayer: () => (/* binding */ VideoPlayer)
/* harmony export */ });
function VideoPlayer() {

  const videoPlayer = document.querySelector('.video-player'),
    video = document.querySelector('.main-video'),
    progressAreaTime = document.querySelector('.progressAreaTime'),
    controls = document.querySelector('.controls'),
    progressArea = document.querySelector('.progress-area'),
    progressBar = document.querySelector('.progress-bar'),

    iconPlay = document.querySelector('.icon__play'),
    iconVolume = document.querySelector('.icon__volume'),
    iconFullscreen = document.querySelector('.icon__fullscreen'),

    current = document.querySelector('.current'),
    duration = document.querySelector('.duration'),

    volumeRange = document.querySelector('.volume_range')

  window.addEventListener('webkitfullscreenchange', ()=> {
    if(iconFullscreen.innerText === 'fullscreen'){
      iconFullscreen.innerText = 'fullscreen_exit'
    } else if(iconFullscreen.innerText === 'fullscreen_exit'){
      iconFullscreen.innerText = 'fullscreen'
    }
  })

  iconPlay.addEventListener('click', ()=>{
    if(iconPlay.innerText === 'play_arrow' || iconPlay.innerText === 'replay'){
      video.play()
      iconPlay.innerText = 'pause'
    } else if(iconPlay.innerText === 'pause'){
      video.pause()
      iconPlay.innerText = 'play_arrow'
    }
  })

  iconFullscreen.addEventListener('click', ()=>{
    if(iconFullscreen.innerText === 'fullscreen'){
      videoPlayer.webkitRequestFullscreen()
    } else if(iconFullscreen.innerText === 'fullscreen_exit'){
      document.webkitExitFullscreen()
    }
  })

  iconVolume.addEventListener('click', ()=>{
    if(volumeRange.value == '0'){
      volumeRange.value = '80'
      iconVolume.innerText = 'volume_up'
    }else{
      volumeRange.value = '0'
      iconVolume.innerText = 'volume_off'
    }
    video.volume = Number(volumeRange.value) / 100
  })

  volumeRange.addEventListener('change', ()=>{
    video.volume = Number(volumeRange.value) / 100
      if(Number(volumeRange.value) == 0) {
        iconVolume.innerText = 'volume_off'
      }else if(Number(volumeRange.current.value) < 40){
        iconVolume.innerText = 'volume_down'
      }else{
        iconVolume.innerText = 'volume_up'
      }
  })

  return    
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _components_HomePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/HomePage */ "./src/components/HomePage.js");
/* harmony import */ var _components_videoplayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/videoplayer */ "./src/components/videoplayer.js");

 
 

addEventListener("DOMContentLoaded", (event) => {
    (0,_components_HomePage__WEBPACK_IMPORTED_MODULE_1__.HomePage)()
    ;(0,_components_videoplayer__WEBPACK_IMPORTED_MODULE_2__.VideoPlayer)()
});


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZV9wYWdlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0Qk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7OztVQ25FQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOcUI7QUFDMkI7QUFDTTtBQUN0RDtBQUNBO0FBQ0EsSUFBSSw4REFBUTtBQUNaLElBQUkscUVBQVc7QUFDZixDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ob21lX3BhZ2UvLi9zcmMvaW5kZXguc2Nzcz9hNWRlIiwid2VicGFjazovL2hvbWVfcGFnZS8uL3NyYy9jb21wb25lbnRzL0hvbWVQYWdlLmpzIiwid2VicGFjazovL2hvbWVfcGFnZS8uL3NyYy9jb21wb25lbnRzL3ZpZGVvcGxheWVyLmpzIiwid2VicGFjazovL2hvbWVfcGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ob21lX3BhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hvbWVfcGFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hvbWVfcGFnZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hvbWVfcGFnZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gSG9tZVBhZ2UoKSB7XHJcblxyXG4gIGNvbnN0IGNhcmRidG5tb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRzX19idXR0b25fbW9yZScpLFxyXG4gICAgY2FyZGJ0bmhpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZHNfX2J1dHRvbl9oaWRlJyksXHJcbiAgICBjYXJkbW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkc19fYnV0dG9uX20nKSxcclxuICAgIGNhcmRoaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRzX19idXR0b25faCcpLFxyXG5cclxuICAgIGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkX19jYXJkc19jb250YWluZXInKVxyXG5cclxuICAgIGNhcmRidG5oaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgY2FyZGhpZGUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgY2FyZG1vcmUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgYm9hcmQuY2xhc3NMaXN0LnRvZ2dsZSgnZnVsbCcpXHJcbiAgICB9KVxyXG5cclxuICAgIGNhcmRidG5tb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgY2FyZGhpZGUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgY2FyZG1vcmUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgYm9hcmQuY2xhc3NMaXN0LnRvZ2dsZSgnZnVsbCcpXHJcbiAgICB9KVxyXG5cclxuICByZXR1cm4gICAgXHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIFZpZGVvUGxheWVyKCkge1xyXG5cclxuICBjb25zdCB2aWRlb1BsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1wbGF5ZXInKSxcclxuICAgIHZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdmlkZW8nKSxcclxuICAgIHByb2dyZXNzQXJlYVRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3NBcmVhVGltZScpLFxyXG4gICAgY29udHJvbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbHMnKSxcclxuICAgIHByb2dyZXNzQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy1hcmVhJyksXHJcbiAgICBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy1iYXInKSxcclxuXHJcbiAgICBpY29uUGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pY29uX19wbGF5JyksXHJcbiAgICBpY29uVm9sdW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmljb25fX3ZvbHVtZScpLFxyXG4gICAgaWNvbkZ1bGxzY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaWNvbl9fZnVsbHNjcmVlbicpLFxyXG5cclxuICAgIGN1cnJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpLFxyXG4gICAgZHVyYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHVyYXRpb24nKSxcclxuXHJcbiAgICB2b2x1bWVSYW5nZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52b2x1bWVfcmFuZ2UnKVxyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsICgpPT4ge1xyXG4gICAgaWYoaWNvbkZ1bGxzY3JlZW4uaW5uZXJUZXh0ID09PSAnZnVsbHNjcmVlbicpe1xyXG4gICAgICBpY29uRnVsbHNjcmVlbi5pbm5lclRleHQgPSAnZnVsbHNjcmVlbl9leGl0J1xyXG4gICAgfSBlbHNlIGlmKGljb25GdWxsc2NyZWVuLmlubmVyVGV4dCA9PT0gJ2Z1bGxzY3JlZW5fZXhpdCcpe1xyXG4gICAgICBpY29uRnVsbHNjcmVlbi5pbm5lclRleHQgPSAnZnVsbHNjcmVlbidcclxuICAgIH1cclxuICB9KVxyXG5cclxuICBpY29uUGxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICBpZihpY29uUGxheS5pbm5lclRleHQgPT09ICdwbGF5X2Fycm93JyB8fCBpY29uUGxheS5pbm5lclRleHQgPT09ICdyZXBsYXknKXtcclxuICAgICAgdmlkZW8ucGxheSgpXHJcbiAgICAgIGljb25QbGF5LmlubmVyVGV4dCA9ICdwYXVzZSdcclxuICAgIH0gZWxzZSBpZihpY29uUGxheS5pbm5lclRleHQgPT09ICdwYXVzZScpe1xyXG4gICAgICB2aWRlby5wYXVzZSgpXHJcbiAgICAgIGljb25QbGF5LmlubmVyVGV4dCA9ICdwbGF5X2Fycm93J1xyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGljb25GdWxsc2NyZWVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgIGlmKGljb25GdWxsc2NyZWVuLmlubmVyVGV4dCA9PT0gJ2Z1bGxzY3JlZW4nKXtcclxuICAgICAgdmlkZW9QbGF5ZXIud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKVxyXG4gICAgfSBlbHNlIGlmKGljb25GdWxsc2NyZWVuLmlubmVyVGV4dCA9PT0gJ2Z1bGxzY3JlZW5fZXhpdCcpe1xyXG4gICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgaWNvblZvbHVtZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICBpZih2b2x1bWVSYW5nZS52YWx1ZSA9PSAnMCcpe1xyXG4gICAgICB2b2x1bWVSYW5nZS52YWx1ZSA9ICc4MCdcclxuICAgICAgaWNvblZvbHVtZS5pbm5lclRleHQgPSAndm9sdW1lX3VwJ1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHZvbHVtZVJhbmdlLnZhbHVlID0gJzAnXHJcbiAgICAgIGljb25Wb2x1bWUuaW5uZXJUZXh0ID0gJ3ZvbHVtZV9vZmYnXHJcbiAgICB9XHJcbiAgICB2aWRlby52b2x1bWUgPSBOdW1iZXIodm9sdW1lUmFuZ2UudmFsdWUpIC8gMTAwXHJcbiAgfSlcclxuXHJcbiAgdm9sdW1lUmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCk9PntcclxuICAgIHZpZGVvLnZvbHVtZSA9IE51bWJlcih2b2x1bWVSYW5nZS52YWx1ZSkgLyAxMDBcclxuICAgICAgaWYoTnVtYmVyKHZvbHVtZVJhbmdlLnZhbHVlKSA9PSAwKSB7XHJcbiAgICAgICAgaWNvblZvbHVtZS5pbm5lclRleHQgPSAndm9sdW1lX29mZidcclxuICAgICAgfWVsc2UgaWYoTnVtYmVyKHZvbHVtZVJhbmdlLmN1cnJlbnQudmFsdWUpIDwgNDApe1xyXG4gICAgICAgIGljb25Wb2x1bWUuaW5uZXJUZXh0ID0gJ3ZvbHVtZV9kb3duJ1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBpY29uVm9sdW1lLmlubmVyVGV4dCA9ICd2b2x1bWVfdXAnXHJcbiAgICAgIH1cclxuICB9KVxyXG5cclxuICByZXR1cm4gICAgXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9pbmRleC5zY3NzJ1xyXG5pbXBvcnQgeyBIb21lUGFnZSB9IGZyb20gJy4vY29tcG9uZW50cy9Ib21lUGFnZScgXHJcbmltcG9ydCB7IFZpZGVvUGxheWVyIH0gZnJvbSAnLi9jb21wb25lbnRzL3ZpZGVvcGxheWVyJyBcclxuXHJcbmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIChldmVudCkgPT4ge1xyXG4gICAgSG9tZVBhZ2UoKVxyXG4gICAgVmlkZW9QbGF5ZXIoKVxyXG59KTtcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
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

/***/ "./src/components/headerButton.js":
/*!****************************************!*\
  !*** ./src/components/headerButton.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderAfterRender: () => (/* binding */ HeaderAfterRender),
/* harmony export */   HeaderButton: () => (/* binding */ HeaderButton)
/* harmony export */ });
async function HeaderButton() {
  let user = '',
    nouser = ''
  const data = localStorage.getItem('username');
  data? user = 'active' : nouser = 'active'
    
  return (
    `
      <button class='button__log-in ${nouser}'>
        <div class="button__inner">
          <img src="/static/img/user.svg" alt="" class="user-svg"></img>
          <span class="header_log-in">Вход</span>
        </div>
      </button>
      <button class='header__user ${user}'>U</button>
      <div class='header__logout'>
        <button class='header__logout__btn'>Выйти</button>
      </div>
    `
  )
}

function HeaderAfterRender(){
  
  const loginBtn = document.querySelector('.button__log-in'),
    userBtn = document.querySelector('.header__user'),
    logoutBtn = document.querySelector('.header__logout__btn')
    
  
  loginBtn.addEventListener('click', (e) => {
    const body = document.querySelector('body'),
      popup = document.querySelector('.popup')

    popup.classList.toggle('active')
    body.style.overflow = 'hidden'
  })
  
  logoutBtn.addEventListener('click', ()=>{
    fetch('http://127.0.0.1:8000/api/v1/profile/logout/')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if ('success' in data) {
        let logout = document.querySelector('.header__logout')
        logout.classList.toggle('active')

        localStorage.removeItem('username')

        const noname = document.querySelector('.button__log-in'),
            user = document.querySelector('.header__user')
        user.classList.toggle('active')
        noname.classList.toggle('active')
      }
    })
  })
    
  userBtn.addEventListener('click', ()=>{
    const userMenu = document.querySelector('.header__logout')
    userMenu.classList.toggle('active')
  })
}


/***/ }),

/***/ "./src/components/popup.js":
/*!*********************************!*\
  !*** ./src/components/popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Popup: () => (/* binding */ Popup),
/* harmony export */   PopupAfterRender: () => (/* binding */ PopupAfterRender)
/* harmony export */ });
/* harmony import */ var _components_headerButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/headerButton */ "./src/components/headerButton.js");


async function Popup() {

  return (
    `
    <div class="popup__container">
      <div class="close">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.583 14.5834L35.4163 35.4167M14.583 35.4167L35.4163 14.5834" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.583 14.5834L35.4163 35.4167M14.583 35.4167L35.4163 14.5834" stroke="black" stroke-opacity="0.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      ${loginPopup()}
      ${registerPopup()}
      ${recoveryPopup()}
      ${sendPopup()}
    </div>
    
    `
  )
}

function PopupAfterRender(){
  const loginBtn = document.querySelector('.popup__input_login'),
    registerBtn = document.querySelector('.popup__input_register'),
    restorePassword = document.querySelector('.popup__input_restore'),
    setLoginBtn = document.querySelector('.popup__button-login'),
    setRegisterBtn = document.querySelector('.popup__button-register'),
    fogrotBtn = document.querySelector('.forgot-password_btn'),
    returnLoginBtn = document.querySelector('.popup__button_login'),
    close = document.querySelector('.close'),
    popup = document.querySelector('.popup'),

    login = document.querySelector('.popup__log-in'),
    register = document.querySelector('.popup__register'),
    recovery = document.querySelector('.popup__recovery'),
    send = document.querySelector('.popup__send')

    setRegisterBtn.addEventListener('click', ()=>{
      login.classList.toggle('active')
      register.classList.toggle('active')
    })

    close.addEventListener('click', ()=> {
      const regActive = document.querySelector('.popup__register.active'),
        logActive = document.querySelector('.popup__log-in.active'),
        recActive = document.querySelector('.popup__recovery.active'),
        body = document.querySelector('body')
        body.style.overflow = 'auto'
        popup.classList.toggle('active')

        if (!logActive){login.classList.toggle('active')}
        if (recActive){recovery.classList.toggle('active')}
        if (regActive){register.classList.toggle('active')}

    })

    setLoginBtn.addEventListener('click', ()=>{
      login.classList.toggle('active')
      register.classList.toggle('active')
    })

    returnLoginBtn.addEventListener('click', ()=>{
      login.classList.toggle('active')
      recovery.classList.toggle('active')
    })

    fogrotBtn.addEventListener('click', ()=>{
      login.classList.toggle('active')
      recovery.classList.toggle('active')
    })

    restorePassword.addEventListener('click', (e)=>{
      e.preventDefault()
      const form = document.forms.popup__recovery,
        email = form.elements.email.value

      const csrftoken = getCookie('csrftoken')
      const body = JSON.stringify({email: email})

      fetch(`http://127.0.0.1:8000/api/v1/profile/email-check/`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken,},
        body
      }).then((response) => {
        if (response.status == 201){
          recovery.classList.toggle('active')
          send.classList.toggle('active')
        } else {
          return response.json()
        }
      }).then((data) => {
        console.log(data)
      })
    })

    registerBtn.addEventListener('click', (e)=>{
            
      e.preventDefault()
      const form = document.forms.popup__register,
        username = form.elements.username.value,
        email = form.elements.email.value,
        password = form.elements.password.value,
        password2 = form.elements.password2.value,
        accept_terms = form.elements.accept_terms.value,
        recaptcha = localStorage.getItem('captcha')


      const data = {
          'username': username,
          'email': email,
          'password': password,
          'password2': password2,
          'accept_terms': accept_terms,
          'recaptcha': recaptcha
      }

      auth(data)
    })

    loginBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const form = document.forms.popup__login
      const username = form.elements.username.value
      const password = form.elements.password.value
      const data = {
          'username': username,
          'password': password,
      }

      auth(data)
  })
}

function auth(data){
  let url = null
  'password2' in data ? url = `http://127.0.0.1:8000/api/v1/profile/register/`: url = `http://127.0.0.1:8000/api/v1/profile/login/`
  const csrftoken = getCookie('csrftoken')
  data['csrftoken'] = csrftoken
  async function postData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(data),
    });
    if (response.status == 201) {
      const popup = document.querySelector('.popup'),
        body = document.querySelector('body'),
        login = document.querySelector('.popup__log-in'),
        register = document.querySelector('.popup__register')
    
      popup.classList.toggle('active')
      login.classList.toggle('active')
      register.classList.toggle('active')

      body.style.overflow = 'auto'

      return location.href = 'http://127.0.0.1:8000/api/v1/profile/email-confirmation-sent/'
    }
    return await response.json();
  }
  
  postData(url, data).then((data) => {

    if ('success' in data) {
      const popup = document.querySelector('.popup')
      popup.classList.toggle('active')

      localStorage.setItem('username', 'Johan')

      const headerButton = document.querySelector('#header-button')
      ;(0,_components_headerButton__WEBPACK_IMPORTED_MODULE_0__.HeaderButton)().then((html) => headerButton.innerHTML = html).then(() => (0,_components_headerButton__WEBPACK_IMPORTED_MODULE_0__.HeaderAfterRender)())

    } else {
      let error = document.getElementsByClassName('form-error')
      if (!error[0]) {
          const newError = document.getElementsByClassName('error')
          newError[0].classList.toggle('active')
          newError[1].classList.toggle('active')
      }
    }
  });
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}



function loginPopup() {
  return (
    `
    <form class="popup__log-in active" name="popup__login">
      <label class='form-label'><input class='popup__input' name="username" id="username" type="text" placeholder="Имя пользователя" /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <label class='form-label'><input class='popup__input' name="password" type="password" placeholder="Пароль" /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <input type="submit" value="Войти" class="popup__input_green popup__input_login"/>
      <p class="forgot-password">Забыли пароль? <button type='button' class="forgot-password_btn">Восстановить пароль</button></p>
      <p class="login-using">Войти с помощью</p>
      <div class="popup_links">
        <a href="" class="popup_link">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_924_1247)">
              <path d="M8.19835 29.1946C7.57851 28.9933 6.95868 28.5906 6.54545 27.7852C6.13223 27.3825 5.71901 26.7785 5.09917 25.9732C4.27273 24.7651 3.44628 23.1544 2.82645 21.5436C2.20661 19.7315 2 17.9195 2 16.1074C2 14.094 2.41322 12.4832 3.23967 11.0738C3.8595 9.86577 4.89256 9.0604 5.92562 8.25503C6.95868 7.65101 8.19835 7.24832 9.43801 7.24832C9.85124 7.24832 10.2645 7.24832 10.8843 7.44966C11.2975 7.44966 11.7107 7.65101 12.3306 7.85235C12.9504 8.05369 13.3636 8.25503 13.5702 8.25503C13.9835 8.45638 14.3967 8.45638 14.6033 8.45638C14.8099 8.45638 15.0165 8.45638 15.4298 8.25503C15.6364 8.25503 16.0496 8.05369 16.4628 7.85235C16.876 7.65101 17.2893 7.44966 17.7025 7.44966C18.1157 7.44966 18.5289 7.24832 18.9421 7.24832C19.3554 7.24832 19.9752 7.04698 20.3884 7.24832C21.2149 7.24832 22.0413 7.44966 22.8678 7.85235C24.1074 8.25503 25.1405 9.26175 25.9669 10.2685C25.7603 10.2685 25.3471 10.4698 25.1405 10.8725C24.5207 11.4765 23.9008 12.0805 23.4876 12.6846C23.0744 13.6913 22.6612 14.698 22.6612 15.906C22.6612 17.3154 23.0744 18.5235 23.6942 19.5302C24.1074 20.3356 24.9339 20.9396 25.5537 21.3423C26.1735 21.5436 26.5868 21.745 26.7934 21.9463C26.7934 22.349 26.5868 22.953 26.3802 23.1544C25.9669 24.3624 25.3471 25.1678 24.7273 26.1745C24.1074 26.9799 23.6942 27.5839 23.4876 27.7852C22.8678 28.3893 22.4545 28.9933 21.8347 29.1946C21.4215 29.5973 20.8016 29.7987 19.9752 29.7987C19.562 29.7987 19.1488 29.7987 18.7355 29.5973C18.5289 29.5973 18.1157 29.396 17.7025 29.1946C17.0826 28.9933 16.876 28.7919 16.4628 28.7919C16.0496 28.5906 15.4298 28.5906 15.0165 28.5906C14.6033 28.5906 13.9835 28.5906 13.5702 28.7919C13.157 28.7919 12.7438 28.9933 12.3306 29.1946C11.7107 29.396 11.5041 29.5973 11.2975 29.5973C10.8843 29.7987 10.4711 29.7987 10.0578 29.7987C9.43802 29.7987 8.81818 29.5973 8.19835 29.1946ZM16.876 6.24161C16.0496 6.64429 15.2231 6.84564 14.3967 6.84564C14.1901 6.04027 14.3967 5.2349 14.8099 4.22819C15.2231 3.42282 15.4298 2.81879 16.0496 2.21476C16.6694 1.61074 17.2893 1.00671 18.1157 0.604027C18.9421 0.201343 19.7686 0 20.595 0C20.595 0.805369 20.3884 1.61074 20.1818 2.61745C19.9752 3.42282 19.3554 4.02685 18.9421 4.63087C18.3223 5.43624 17.7025 5.83893 16.876 6.24161Z" fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_924_1247">
                <rect width="25" height="30" fill="white" transform="translate(2)"/>
              </clipPath>
            </defs>
          </svg>
        </a>
        <a href="" class="popup_link">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_924_1241)">
              <path d="M30 15C30 6.7157 23.2843 -2.67029e-05 15 -2.67029e-05C6.71572 -2.67029e-05 0 6.7157 0 15C0 22.4869 5.48528 28.6925 12.6562 29.8177V19.3359H8.84766V15H12.6562V11.6953C12.6562 7.93591 14.8956 5.85935 18.322 5.85935C19.9631 5.85935 21.6797 6.15232 21.6797 6.15232V9.84372H19.7882C17.9249 9.84372 17.3438 11 17.3438 12.1862V15H21.5039L20.8389 19.3359H17.3438V29.8177C24.5147 28.6925 30 22.4869 30 15Z" fill="white"/>
              <path d="M20.8389 19.3359L21.5039 15H17.3438V12.1862C17.3438 11 17.9249 9.84375 19.7882 9.84375H21.6797V6.15234C21.6797 6.15234 19.9631 5.85938 18.322 5.85938C14.8956 5.85938 12.6563 7.93594 12.6563 11.6953V15H8.84766V19.3359H12.6563V29.8178C13.4199 29.9376 14.2027 30 15 30C15.7973 30 16.5801 29.9376 17.3438 29.8178V19.3359H20.8389Z" fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_924_1241">
                <rect width="30" height="30" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </a>
        <a href="" class="popup_link">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.2 15.3125C28.2 14.3375 28.1125 13.4 27.95 12.5H15V17.8188H22.4C22.0813 19.5375 21.1125 20.9938 19.6563 21.9688V25.4187H24.1C26.7 23.025 28.2 19.5 28.2 15.3125Z" fill="black"/>
            <path d="M15.0004 28.75C18.7129 28.75 21.8254 27.5188 24.1004 25.4188L19.6566 21.9688C18.4254 22.7938 16.8504 23.2813 15.0004 23.2813C11.4191 23.2813 8.38789 20.8625 7.30664 17.6125H2.71289V21.175C4.97539 25.6688 9.62539 28.75 15.0004 28.75Z" fill="black"/>
            <path d="M7.30625 17.6125C7.03125 16.7875 6.875 15.9062 6.875 15C6.875 14.0937 7.03125 13.2125 7.30625 12.3875V8.82495H2.7125C1.75 10.741 1.24915 12.8557 1.25 15C1.25 17.2187 1.78125 19.3187 2.7125 21.175L7.30625 17.6125Z" fill="black"/>
            <path d="M15.0004 6.71875C17.0191 6.71875 18.8316 7.4125 20.2566 8.775L24.2004 4.83125C21.8191 2.6125 18.7066 1.25 15.0004 1.25C9.62539 1.25 4.97539 4.33125 2.71289 8.825L7.30664 12.3875C8.38789 9.1375 11.4191 6.71875 15.0004 6.71875Z" fill="black"/>
          </svg>
        </a>
      </div>
      <p class="no-account-yet">Нет аккаунта?</p>
      <button type="button" class="popup__button popup__button-register">Зарегистрироваться</button>
    </form>

    `
  )
}

function registerPopup() {
  return (
    `
    <form class="popup__register" name="popup__register">
      <label class='form-label'><input class='popup__input' name="username" type="text" placeholder="Имя пользователя" /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <label class='form-label'><input class='popup__input' name="email" type="email" placeholder="Электронная почта" /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <label class='form-label'><input class='popup__input' name="password" type="password" placeholder="Пароль" /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <label class='form-label'><input class='popup__input' name="password2" type="password" placeholder='Повторить пароль' /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <div class="popup__check">
        <input type="checkbox" name="accept_terms" id="accept_terms" ></input>
        <span class="popup__check_text">Я принимаю условия <a>пользовательского соглашения</a></span>
      </div>
      <div class="popup-recaptcha">
        <div class="g-recaptcha" data-sitekey="6LcQ4VgpAAAAAIB4_vqPGiezzBMek9n30gUqXF3Q" data-callback='getRecaptcha'></div>
      </div>
      <input type="submit" value="Зарегистрироваться" class="popup__input_green popup__input_register"></input>
      <p class="login-using">Зарегистрироваться с помощью</p>
      <div class="popup_links">
        <a href="" class="popup_link">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_924_1247)">
              <path d="M8.19835 29.1946C7.57851 28.9933 6.95868 28.5906 6.54545 27.7852C6.13223 27.3825 5.71901 26.7785 5.09917 25.9732C4.27273 24.7651 3.44628 23.1544 2.82645 21.5436C2.20661 19.7315 2 17.9195 2 16.1074C2 14.094 2.41322 12.4832 3.23967 11.0738C3.8595 9.86577 4.89256 9.0604 5.92562 8.25503C6.95868 7.65101 8.19835 7.24832 9.43801 7.24832C9.85124 7.24832 10.2645 7.24832 10.8843 7.44966C11.2975 7.44966 11.7107 7.65101 12.3306 7.85235C12.9504 8.05369 13.3636 8.25503 13.5702 8.25503C13.9835 8.45638 14.3967 8.45638 14.6033 8.45638C14.8099 8.45638 15.0165 8.45638 15.4298 8.25503C15.6364 8.25503 16.0496 8.05369 16.4628 7.85235C16.876 7.65101 17.2893 7.44966 17.7025 7.44966C18.1157 7.44966 18.5289 7.24832 18.9421 7.24832C19.3554 7.24832 19.9752 7.04698 20.3884 7.24832C21.2149 7.24832 22.0413 7.44966 22.8678 7.85235C24.1074 8.25503 25.1405 9.26175 25.9669 10.2685C25.7603 10.2685 25.3471 10.4698 25.1405 10.8725C24.5207 11.4765 23.9008 12.0805 23.4876 12.6846C23.0744 13.6913 22.6612 14.698 22.6612 15.906C22.6612 17.3154 23.0744 18.5235 23.6942 19.5302C24.1074 20.3356 24.9339 20.9396 25.5537 21.3423C26.1735 21.5436 26.5868 21.745 26.7934 21.9463C26.7934 22.349 26.5868 22.953 26.3802 23.1544C25.9669 24.3624 25.3471 25.1678 24.7273 26.1745C24.1074 26.9799 23.6942 27.5839 23.4876 27.7852C22.8678 28.3893 22.4545 28.9933 21.8347 29.1946C21.4215 29.5973 20.8016 29.7987 19.9752 29.7987C19.562 29.7987 19.1488 29.7987 18.7355 29.5973C18.5289 29.5973 18.1157 29.396 17.7025 29.1946C17.0826 28.9933 16.876 28.7919 16.4628 28.7919C16.0496 28.5906 15.4298 28.5906 15.0165 28.5906C14.6033 28.5906 13.9835 28.5906 13.5702 28.7919C13.157 28.7919 12.7438 28.9933 12.3306 29.1946C11.7107 29.396 11.5041 29.5973 11.2975 29.5973C10.8843 29.7987 10.4711 29.7987 10.0578 29.7987C9.43802 29.7987 8.81818 29.5973 8.19835 29.1946ZM16.876 6.24161C16.0496 6.64429 15.2231 6.84564 14.3967 6.84564C14.1901 6.04027 14.3967 5.2349 14.8099 4.22819C15.2231 3.42282 15.4298 2.81879 16.0496 2.21476C16.6694 1.61074 17.2893 1.00671 18.1157 0.604027C18.9421 0.201343 19.7686 0 20.595 0C20.595 0.805369 20.3884 1.61074 20.1818 2.61745C19.9752 3.42282 19.3554 4.02685 18.9421 4.63087C18.3223 5.43624 17.7025 5.83893 16.876 6.24161Z" fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_924_1247">
                <rect width="25" height="30" fill="white" transform="translate(2)"/>
              </clipPath>
            </defs>
          </svg>
        </a>
        <a href="" class="popup_link">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_924_1241)">
              <path d="M30 15C30 6.7157 23.2843 -2.67029e-05 15 -2.67029e-05C6.71572 -2.67029e-05 0 6.7157 0 15C0 22.4869 5.48528 28.6925 12.6562 29.8177V19.3359H8.84766V15H12.6562V11.6953C12.6562 7.93591 14.8956 5.85935 18.322 5.85935C19.9631 5.85935 21.6797 6.15232 21.6797 6.15232V9.84372H19.7882C17.9249 9.84372 17.3438 11 17.3438 12.1862V15H21.5039L20.8389 19.3359H17.3438V29.8177C24.5147 28.6925 30 22.4869 30 15Z" fill="white"/>
              <path d="M20.8389 19.3359L21.5039 15H17.3438V12.1862C17.3438 11 17.9249 9.84375 19.7882 9.84375H21.6797V6.15234C21.6797 6.15234 19.9631 5.85938 18.322 5.85938C14.8956 5.85938 12.6563 7.93594 12.6563 11.6953V15H8.84766V19.3359H12.6563V29.8178C13.4199 29.9376 14.2027 30 15 30C15.7973 30 16.5801 29.9376 17.3438 29.8178V19.3359H20.8389Z" fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_924_1241">
                <rect width="30" height="30" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </a>
        <a href="" class="popup_link">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.2 15.3125C28.2 14.3375 28.1125 13.4 27.95 12.5H15V17.8188H22.4C22.0813 19.5375 21.1125 20.9938 19.6563 21.9688V25.4187H24.1C26.7 23.025 28.2 19.5 28.2 15.3125Z" fill="black"/>
            <path d="M15.0004 28.75C18.7129 28.75 21.8254 27.5188 24.1004 25.4188L19.6566 21.9688C18.4254 22.7938 16.8504 23.2813 15.0004 23.2813C11.4191 23.2813 8.38789 20.8625 7.30664 17.6125H2.71289V21.175C4.97539 25.6688 9.62539 28.75 15.0004 28.75Z" fill="black"/>
            <path d="M7.30625 17.6125C7.03125 16.7875 6.875 15.9062 6.875 15C6.875 14.0937 7.03125 13.2125 7.30625 12.3875V8.82495H2.7125C1.75 10.741 1.24915 12.8557 1.25 15C1.25 17.2187 1.78125 19.3187 2.7125 21.175L7.30625 17.6125Z" fill="black"/>
            <path d="M15.0004 6.71875C17.0191 6.71875 18.8316 7.4125 20.2566 8.775L24.2004 4.83125C21.8191 2.6125 18.7066 1.25 15.0004 1.25C9.62539 1.25 4.97539 4.33125 2.71289 8.825L7.30664 12.3875C8.38789 9.1375 11.4191 6.71875 15.0004 6.71875Z" fill="black"/>
          </svg>
        </a>
      </div>
      <p class="no-account-yet">Уже есть аккаунт?</p>
      <button type="button" class="popup__button popup__button-login">Войти</button>
    </form>

    `
  )
}

function recoveryPopup() {
  return (
    `
    <form class="popup__recovery" name="popup__recovery">
      <label class='form-label'><input class='popup__input' type="email" name="email" placeholder="E-mail, указанный при регистрации" /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <input type="submit" value="Восстановить" class="popup__input_green popup__input_restore"></input>
      <button type="button" class="popup__button popup__button_login">Войти</button>
    </form>
    
    `
  )
}

function sendPopup() {
  return (
    `
      <p class='popup__send'>Иди на почту</p>

    `
  )
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
/* harmony import */ var _components_headerButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/headerButton */ "./src/components/headerButton.js");
/* harmony import */ var _components_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/popup */ "./src/components/popup.js");




const popup = document.querySelector('#popup'),
  headerButton = document.querySelector('#header-button'),
  headerBurger = document.querySelector('.header__burger'),
  menu = document.querySelector('.menu')


headerBurger.addEventListener('click', ()=>{
  const body = document.querySelector('body')
  menu.classList.toggle('side')
  menu.classList.toggle('active')
  body.style.overflow = 'hidden'
})

menu.addEventListener('click', (e)=> {
  if(document.querySelector('.menu.side.active')){
    if(e.target.className === 'menu side active'){
      menu.classList.toggle('side')
      menu.classList.toggle('active')
      const body = document.querySelector('body')
      body.style.overflow = 'auto'
    }
  }
})


;(0,_components_headerButton__WEBPACK_IMPORTED_MODULE_1__.HeaderButton)().then((html) => headerButton.innerHTML = html).then(() => (0,_components_headerButton__WEBPACK_IMPORTED_MODULE_1__.HeaderAfterRender)())
;(0,_components_popup__WEBPACK_IMPORTED_MODULE_2__.Popup)().then((html) => popup.innerHTML = html).then(() => (0,_components_popup__WEBPACK_IMPORTED_MODULE_2__.PopupAfterRender)())
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU87QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxLQUFLO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdENEU7QUFDNUU7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLFFBQVE7QUFDUixRQUFRO0FBQ1IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4Qix1QkFBdUI7QUFDdkIsdUJBQXVCO0FBQ3ZCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGFBQWE7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDBGQUEwRjtBQUM3RztBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sdUVBQVksNERBQTRELDJFQUFpQjtBQUMvRjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkJBQTZCLHFDQUFxQztBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDMVVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05xQjtBQUNzRDtBQUNmO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsdUVBQVksNERBQTRELDJFQUFpQjtBQUN6Rix5REFBSyxxREFBcUQsbUVBQWdCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWFkZXJfZm9vdGVyLy4vc3JjL2luZGV4LnNjc3M/YTVkZSIsIndlYnBhY2s6Ly9oZWFkZXJfZm9vdGVyLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyQnV0dG9uLmpzIiwid2VicGFjazovL2hlYWRlcl9mb290ZXIvLi9zcmMvY29tcG9uZW50cy9wb3B1cC5qcyIsIndlYnBhY2s6Ly9oZWFkZXJfZm9vdGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hlYWRlcl9mb290ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hlYWRlcl9mb290ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oZWFkZXJfZm9vdGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGVhZGVyX2Zvb3Rlci8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gSGVhZGVyQnV0dG9uKCkge1xyXG4gIGxldCB1c2VyID0gJycsXHJcbiAgICBub3VzZXIgPSAnJ1xyXG4gIGNvbnN0IGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKTtcclxuICBkYXRhPyB1c2VyID0gJ2FjdGl2ZScgOiBub3VzZXIgPSAnYWN0aXZlJ1xyXG4gICAgXHJcbiAgcmV0dXJuIChcclxuICAgIGBcclxuICAgICAgPGJ1dHRvbiBjbGFzcz0nYnV0dG9uX19sb2ctaW4gJHtub3VzZXJ9Jz5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uX19pbm5lclwiPlxyXG4gICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2ltZy91c2VyLnN2Z1wiIGFsdD1cIlwiIGNsYXNzPVwidXNlci1zdmdcIj48L2ltZz5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVhZGVyX2xvZy1pblwiPtCS0YXQvtC0PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz0naGVhZGVyX191c2VyICR7dXNlcn0nPlU8L2J1dHRvbj5cclxuICAgICAgPGRpdiBjbGFzcz0naGVhZGVyX19sb2dvdXQnPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9J2hlYWRlcl9fbG9nb3V0X19idG4nPtCS0YvQudGC0Lg8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgXHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSGVhZGVyQWZ0ZXJSZW5kZXIoKXtcclxuICBcclxuICBjb25zdCBsb2dpbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b25fX2xvZy1pbicpLFxyXG4gICAgdXNlckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3VzZXInKSxcclxuICAgIGxvZ291dEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2xvZ291dF9fYnRuJylcclxuICAgIFxyXG4gIFxyXG4gIGxvZ2luQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JyksXHJcbiAgICAgIHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJylcclxuXHJcbiAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXHJcbiAgfSlcclxuICBcclxuICBsb2dvdXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgZmV0Y2goJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdjEvcHJvZmlsZS9sb2dvdXQvJylcclxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgfSlcclxuICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgIGlmICgnc3VjY2VzcycgaW4gZGF0YSkge1xyXG4gICAgICAgIGxldCBsb2dvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19sb2dvdXQnKVxyXG4gICAgICAgIGxvZ291dC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcm5hbWUnKVxyXG5cclxuICAgICAgICBjb25zdCBub25hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uX19sb2ctaW4nKSxcclxuICAgICAgICAgICAgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3VzZXInKVxyXG4gICAgICAgIHVzZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgICBub25hbWUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KVxyXG4gICAgXHJcbiAgdXNlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICBjb25zdCB1c2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2xvZ291dCcpXHJcbiAgICB1c2VyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gIH0pXHJcbn1cclxuIiwiaW1wb3J0IHsgSGVhZGVyQnV0dG9uLCBIZWFkZXJBZnRlclJlbmRlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvaGVhZGVyQnV0dG9uJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBvcHVwKCkge1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgYFxyXG4gICAgPGRpdiBjbGFzcz1cInBvcHVwX19jb250YWluZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNsb3NlXCI+XHJcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjUwXCIgaGVpZ2h0PVwiNTBcIiB2aWV3Qm94PVwiMCAwIDUwIDUwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgICAgICA8cGF0aCBkPVwiTTE0LjU4MyAxNC41ODM0TDM1LjQxNjMgMzUuNDE2N00xNC41ODMgMzUuNDE2N0wzNS40MTYzIDE0LjU4MzRcIiBzdHJva2U9XCJibGFja1wiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cclxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTQuNTgzIDE0LjU4MzRMMzUuNDE2MyAzNS40MTY3TTE0LjU4MyAzNS40MTY3TDM1LjQxNjMgMTQuNTgzNFwiIHN0cm9rZT1cImJsYWNrXCIgc3Ryb2tlLW9wYWNpdHk9XCIwLjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICAke2xvZ2luUG9wdXAoKX1cclxuICAgICAgJHtyZWdpc3RlclBvcHVwKCl9XHJcbiAgICAgICR7cmVjb3ZlcnlQb3B1cCgpfVxyXG4gICAgICAke3NlbmRQb3B1cCgpfVxyXG4gICAgPC9kaXY+XHJcbiAgICBcclxuICAgIGBcclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQb3B1cEFmdGVyUmVuZGVyKCl7XHJcbiAgY29uc3QgbG9naW5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2lucHV0X2xvZ2luJyksXHJcbiAgICByZWdpc3RlckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9faW5wdXRfcmVnaXN0ZXInKSxcclxuICAgIHJlc3RvcmVQYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9faW5wdXRfcmVzdG9yZScpLFxyXG4gICAgc2V0TG9naW5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2J1dHRvbi1sb2dpbicpLFxyXG4gICAgc2V0UmVnaXN0ZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2J1dHRvbi1yZWdpc3RlcicpLFxyXG4gICAgZm9ncm90QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcmdvdC1wYXNzd29yZF9idG4nKSxcclxuICAgIHJldHVybkxvZ2luQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19idXR0b25fbG9naW4nKSxcclxuICAgIGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlJyksXHJcbiAgICBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCcpLFxyXG5cclxuICAgIGxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19sb2ctaW4nKSxcclxuICAgIHJlZ2lzdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19yZWdpc3RlcicpLFxyXG4gICAgcmVjb3ZlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3JlY292ZXJ5JyksXHJcbiAgICBzZW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19zZW5kJylcclxuXHJcbiAgICBzZXRSZWdpc3RlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGxvZ2luLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIHJlZ2lzdGVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICB9KVxyXG5cclxuICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XHJcbiAgICAgIGNvbnN0IHJlZ0FjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fcmVnaXN0ZXIuYWN0aXZlJyksXHJcbiAgICAgICAgbG9nQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19sb2ctaW4uYWN0aXZlJyksXHJcbiAgICAgICAgcmVjQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19yZWNvdmVyeS5hY3RpdmUnKSxcclxuICAgICAgICBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXHJcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJ1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcblxyXG4gICAgICAgIGlmICghbG9nQWN0aXZlKXtsb2dpbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKX1cclxuICAgICAgICBpZiAocmVjQWN0aXZlKXtyZWNvdmVyeS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKX1cclxuICAgICAgICBpZiAocmVnQWN0aXZlKXtyZWdpc3Rlci5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKX1cclxuXHJcbiAgICB9KVxyXG5cclxuICAgIHNldExvZ2luQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgbG9naW4uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgcmVnaXN0ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuTG9naW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICBsb2dpbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICByZWNvdmVyeS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgfSlcclxuXHJcbiAgICBmb2dyb3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICBsb2dpbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICByZWNvdmVyeS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgfSlcclxuXHJcbiAgICByZXN0b3JlUGFzc3dvcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5mb3Jtcy5wb3B1cF9fcmVjb3ZlcnksXHJcbiAgICAgICAgZW1haWwgPSBmb3JtLmVsZW1lbnRzLmVtYWlsLnZhbHVlXHJcblxyXG4gICAgICBjb25zdCBjc3JmdG9rZW4gPSBnZXRDb29raWUoJ2NzcmZ0b2tlbicpXHJcbiAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7ZW1haWw6IGVtYWlsfSlcclxuXHJcbiAgICAgIGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL3Byb2ZpbGUvZW1haWwtY2hlY2svYCwge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsICdYLUNTUkZUb2tlbic6IGNzcmZ0b2tlbix9LFxyXG4gICAgICAgIGJvZHlcclxuICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMSl7XHJcbiAgICAgICAgICByZWNvdmVyeS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgc2VuZC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgcmVnaXN0ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICAgICAgICAgICAgXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZm9ybXMucG9wdXBfX3JlZ2lzdGVyLFxyXG4gICAgICAgIHVzZXJuYW1lID0gZm9ybS5lbGVtZW50cy51c2VybmFtZS52YWx1ZSxcclxuICAgICAgICBlbWFpbCA9IGZvcm0uZWxlbWVudHMuZW1haWwudmFsdWUsXHJcbiAgICAgICAgcGFzc3dvcmQgPSBmb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlLFxyXG4gICAgICAgIHBhc3N3b3JkMiA9IGZvcm0uZWxlbWVudHMucGFzc3dvcmQyLnZhbHVlLFxyXG4gICAgICAgIGFjY2VwdF90ZXJtcyA9IGZvcm0uZWxlbWVudHMuYWNjZXB0X3Rlcm1zLnZhbHVlLFxyXG4gICAgICAgIHJlY2FwdGNoYSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXB0Y2hhJylcclxuXHJcblxyXG4gICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgJ3VzZXJuYW1lJzogdXNlcm5hbWUsXHJcbiAgICAgICAgICAnZW1haWwnOiBlbWFpbCxcclxuICAgICAgICAgICdwYXNzd29yZCc6IHBhc3N3b3JkLFxyXG4gICAgICAgICAgJ3Bhc3N3b3JkMic6IHBhc3N3b3JkMixcclxuICAgICAgICAgICdhY2NlcHRfdGVybXMnOiBhY2NlcHRfdGVybXMsXHJcbiAgICAgICAgICAncmVjYXB0Y2hhJzogcmVjYXB0Y2hhXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGF1dGgoZGF0YSlcclxuICAgIH0pXHJcblxyXG4gICAgbG9naW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmZvcm1zLnBvcHVwX19sb2dpblxyXG4gICAgICBjb25zdCB1c2VybmFtZSA9IGZvcm0uZWxlbWVudHMudXNlcm5hbWUudmFsdWVcclxuICAgICAgY29uc3QgcGFzc3dvcmQgPSBmb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlXHJcbiAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICAndXNlcm5hbWUnOiB1c2VybmFtZSxcclxuICAgICAgICAgICdwYXNzd29yZCc6IHBhc3N3b3JkLFxyXG4gICAgICB9XHJcblxyXG4gICAgICBhdXRoKGRhdGEpXHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gYXV0aChkYXRhKXtcclxuICBsZXQgdXJsID0gbnVsbFxyXG4gICdwYXNzd29yZDInIGluIGRhdGEgPyB1cmwgPSBgaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS92MS9wcm9maWxlL3JlZ2lzdGVyL2A6IHVybCA9IGBodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL3Byb2ZpbGUvbG9naW4vYFxyXG4gIGNvbnN0IGNzcmZ0b2tlbiA9IGdldENvb2tpZSgnY3NyZnRva2VuJylcclxuICBkYXRhWydjc3JmdG9rZW4nXSA9IGNzcmZ0b2tlblxyXG4gIGFzeW5jIGZ1bmN0aW9uIHBvc3REYXRhKHVybCwgZGF0YSkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAnWC1DU1JGVG9rZW4nOiBjc3JmdG9rZW4sXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgfSk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMSkge1xyXG4gICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCcpLFxyXG4gICAgICAgIGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JyksXHJcbiAgICAgICAgbG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2xvZy1pbicpLFxyXG4gICAgICAgIHJlZ2lzdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19yZWdpc3RlcicpXHJcbiAgICBcclxuICAgICAgcG9wdXAuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgbG9naW4uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgcmVnaXN0ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuXHJcbiAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0bydcclxuXHJcbiAgICAgIHJldHVybiBsb2NhdGlvbi5ocmVmID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdjEvcHJvZmlsZS9lbWFpbC1jb25maXJtYXRpb24tc2VudC8nXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIH1cclxuICBcclxuICBwb3N0RGF0YSh1cmwsIGRhdGEpLnRoZW4oKGRhdGEpID0+IHtcclxuXHJcbiAgICBpZiAoJ3N1Y2Nlc3MnIGluIGRhdGEpIHtcclxuICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKVxyXG4gICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG5cclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJuYW1lJywgJ0pvaGFuJylcclxuXHJcbiAgICAgIGNvbnN0IGhlYWRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoZWFkZXItYnV0dG9uJylcclxuICAgICAgSGVhZGVyQnV0dG9uKCkudGhlbigoaHRtbCkgPT4gaGVhZGVyQnV0dG9uLmlubmVySFRNTCA9IGh0bWwpLnRoZW4oKCkgPT4gSGVhZGVyQWZ0ZXJSZW5kZXIoKSlcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgZXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtLWVycm9yJylcclxuICAgICAgaWYgKCFlcnJvclswXSkge1xyXG4gICAgICAgICAgY29uc3QgbmV3RXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdlcnJvcicpXHJcbiAgICAgICAgICBuZXdFcnJvclswXS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgbmV3RXJyb3JbMV0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb29raWUobmFtZSkge1xyXG4gIGxldCBtYXRjaGVzID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoXHJcbiAgICBcIig/Ol58OyApXCIgKyBuYW1lLnJlcGxhY2UoLyhbXFwuJD8qfHt9XFwoXFwpXFxbXFxdXFxcXFxcL1xcK15dKS9nLCAnXFxcXCQxJykgKyBcIj0oW147XSopXCJcclxuICApKTtcclxuICByZXR1cm4gbWF0Y2hlcyA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaGVzWzFdKSA6IHVuZGVmaW5lZDtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBsb2dpblBvcHVwKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICBgXHJcbiAgICA8Zm9ybSBjbGFzcz1cInBvcHVwX19sb2ctaW4gYWN0aXZlXCIgbmFtZT1cInBvcHVwX19sb2dpblwiPlxyXG4gICAgICA8bGFiZWwgY2xhc3M9J2Zvcm0tbGFiZWwnPjxpbnB1dCBjbGFzcz0ncG9wdXBfX2lucHV0JyBuYW1lPVwidXNlcm5hbWVcIiBpZD1cInVzZXJuYW1lXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cItCY0LzRjyDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cIiAvPjxkaXYgY2xhc3M9J2Zvcm0tZXJyb3InPjxkaXY+PHAgY2xhc3M9J2Zvcm0tZXJyb3JfbWVzc2FnZSc+PC9wPjwvZGl2PjwvZGl2PjwvbGFiZWw+XHJcbiAgICAgIDxsYWJlbCBjbGFzcz0nZm9ybS1sYWJlbCc+PGlucHV0IGNsYXNzPSdwb3B1cF9faW5wdXQnIG5hbWU9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwi0J/QsNGA0L7Qu9GMXCIgLz48ZGl2IGNsYXNzPSdmb3JtLWVycm9yJz48ZGl2PjxwIGNsYXNzPSdmb3JtLWVycm9yX21lc3NhZ2UnPjwvcD48L2Rpdj48L2Rpdj48L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwi0JLQvtC50YLQuFwiIGNsYXNzPVwicG9wdXBfX2lucHV0X2dyZWVuIHBvcHVwX19pbnB1dF9sb2dpblwiLz5cclxuICAgICAgPHAgY2xhc3M9XCJmb3Jnb3QtcGFzc3dvcmRcIj7Ql9Cw0LHRi9C70Lgg0L/QsNGA0L7Qu9GMPyA8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9XCJmb3Jnb3QtcGFzc3dvcmRfYnRuXCI+0JLQvtGB0YHRgtCw0L3QvtCy0LjRgtGMINC/0LDRgNC+0LvRjDwvYnV0dG9uPjwvcD5cclxuICAgICAgPHAgY2xhc3M9XCJsb2dpbi11c2luZ1wiPtCS0L7QudGC0Lgg0YEg0L/QvtC80L7RidGM0Y48L3A+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwb3B1cF9saW5rc1wiPlxyXG4gICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cInBvcHVwX2xpbmtcIj5cclxuICAgICAgICAgIDxzdmcgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICAgICAgICA8ZyBjbGlwUGF0aD1cInVybCgjY2xpcDBfOTI0XzEyNDcpXCI+XHJcbiAgICAgICAgICAgICAgPHBhdGggZD1cIk04LjE5ODM1IDI5LjE5NDZDNy41Nzg1MSAyOC45OTMzIDYuOTU4NjggMjguNTkwNiA2LjU0NTQ1IDI3Ljc4NTJDNi4xMzIyMyAyNy4zODI1IDUuNzE5MDEgMjYuNzc4NSA1LjA5OTE3IDI1Ljk3MzJDNC4yNzI3MyAyNC43NjUxIDMuNDQ2MjggMjMuMTU0NCAyLjgyNjQ1IDIxLjU0MzZDMi4yMDY2MSAxOS43MzE1IDIgMTcuOTE5NSAyIDE2LjEwNzRDMiAxNC4wOTQgMi40MTMyMiAxMi40ODMyIDMuMjM5NjcgMTEuMDczOEMzLjg1OTUgOS44NjU3NyA0Ljg5MjU2IDkuMDYwNCA1LjkyNTYyIDguMjU1MDNDNi45NTg2OCA3LjY1MTAxIDguMTk4MzUgNy4yNDgzMiA5LjQzODAxIDcuMjQ4MzJDOS44NTEyNCA3LjI0ODMyIDEwLjI2NDUgNy4yNDgzMiAxMC44ODQzIDcuNDQ5NjZDMTEuMjk3NSA3LjQ0OTY2IDExLjcxMDcgNy42NTEwMSAxMi4zMzA2IDcuODUyMzVDMTIuOTUwNCA4LjA1MzY5IDEzLjM2MzYgOC4yNTUwMyAxMy41NzAyIDguMjU1MDNDMTMuOTgzNSA4LjQ1NjM4IDE0LjM5NjcgOC40NTYzOCAxNC42MDMzIDguNDU2MzhDMTQuODA5OSA4LjQ1NjM4IDE1LjAxNjUgOC40NTYzOCAxNS40Mjk4IDguMjU1MDNDMTUuNjM2NCA4LjI1NTAzIDE2LjA0OTYgOC4wNTM2OSAxNi40NjI4IDcuODUyMzVDMTYuODc2IDcuNjUxMDEgMTcuMjg5MyA3LjQ0OTY2IDE3LjcwMjUgNy40NDk2NkMxOC4xMTU3IDcuNDQ5NjYgMTguNTI4OSA3LjI0ODMyIDE4Ljk0MjEgNy4yNDgzMkMxOS4zNTU0IDcuMjQ4MzIgMTkuOTc1MiA3LjA0Njk4IDIwLjM4ODQgNy4yNDgzMkMyMS4yMTQ5IDcuMjQ4MzIgMjIuMDQxMyA3LjQ0OTY2IDIyLjg2NzggNy44NTIzNUMyNC4xMDc0IDguMjU1MDMgMjUuMTQwNSA5LjI2MTc1IDI1Ljk2NjkgMTAuMjY4NUMyNS43NjAzIDEwLjI2ODUgMjUuMzQ3MSAxMC40Njk4IDI1LjE0MDUgMTAuODcyNUMyNC41MjA3IDExLjQ3NjUgMjMuOTAwOCAxMi4wODA1IDIzLjQ4NzYgMTIuNjg0NkMyMy4wNzQ0IDEzLjY5MTMgMjIuNjYxMiAxNC42OTggMjIuNjYxMiAxNS45MDZDMjIuNjYxMiAxNy4zMTU0IDIzLjA3NDQgMTguNTIzNSAyMy42OTQyIDE5LjUzMDJDMjQuMTA3NCAyMC4zMzU2IDI0LjkzMzkgMjAuOTM5NiAyNS41NTM3IDIxLjM0MjNDMjYuMTczNSAyMS41NDM2IDI2LjU4NjggMjEuNzQ1IDI2Ljc5MzQgMjEuOTQ2M0MyNi43OTM0IDIyLjM0OSAyNi41ODY4IDIyLjk1MyAyNi4zODAyIDIzLjE1NDRDMjUuOTY2OSAyNC4zNjI0IDI1LjM0NzEgMjUuMTY3OCAyNC43MjczIDI2LjE3NDVDMjQuMTA3NCAyNi45Nzk5IDIzLjY5NDIgMjcuNTgzOSAyMy40ODc2IDI3Ljc4NTJDMjIuODY3OCAyOC4zODkzIDIyLjQ1NDUgMjguOTkzMyAyMS44MzQ3IDI5LjE5NDZDMjEuNDIxNSAyOS41OTczIDIwLjgwMTYgMjkuNzk4NyAxOS45NzUyIDI5Ljc5ODdDMTkuNTYyIDI5Ljc5ODcgMTkuMTQ4OCAyOS43OTg3IDE4LjczNTUgMjkuNTk3M0MxOC41Mjg5IDI5LjU5NzMgMTguMTE1NyAyOS4zOTYgMTcuNzAyNSAyOS4xOTQ2QzE3LjA4MjYgMjguOTkzMyAxNi44NzYgMjguNzkxOSAxNi40NjI4IDI4Ljc5MTlDMTYuMDQ5NiAyOC41OTA2IDE1LjQyOTggMjguNTkwNiAxNS4wMTY1IDI4LjU5MDZDMTQuNjAzMyAyOC41OTA2IDEzLjk4MzUgMjguNTkwNiAxMy41NzAyIDI4Ljc5MTlDMTMuMTU3IDI4Ljc5MTkgMTIuNzQzOCAyOC45OTMzIDEyLjMzMDYgMjkuMTk0NkMxMS43MTA3IDI5LjM5NiAxMS41MDQxIDI5LjU5NzMgMTEuMjk3NSAyOS41OTczQzEwLjg4NDMgMjkuNzk4NyAxMC40NzExIDI5Ljc5ODcgMTAuMDU3OCAyOS43OTg3QzkuNDM4MDIgMjkuNzk4NyA4LjgxODE4IDI5LjU5NzMgOC4xOTgzNSAyOS4xOTQ2Wk0xNi44NzYgNi4yNDE2MUMxNi4wNDk2IDYuNjQ0MjkgMTUuMjIzMSA2Ljg0NTY0IDE0LjM5NjcgNi44NDU2NEMxNC4xOTAxIDYuMDQwMjcgMTQuMzk2NyA1LjIzNDkgMTQuODA5OSA0LjIyODE5QzE1LjIyMzEgMy40MjI4MiAxNS40Mjk4IDIuODE4NzkgMTYuMDQ5NiAyLjIxNDc2QzE2LjY2OTQgMS42MTA3NCAxNy4yODkzIDEuMDA2NzEgMTguMTE1NyAwLjYwNDAyN0MxOC45NDIxIDAuMjAxMzQzIDE5Ljc2ODYgMCAyMC41OTUgMEMyMC41OTUgMC44MDUzNjkgMjAuMzg4NCAxLjYxMDc0IDIwLjE4MTggMi42MTc0NUMxOS45NzUyIDMuNDIyODIgMTkuMzU1NCA0LjAyNjg1IDE4Ljk0MjEgNC42MzA4N0MxOC4zMjIzIDUuNDM2MjQgMTcuNzAyNSA1LjgzODkzIDE2Ljg3NiA2LjI0MTYxWlwiIGZpbGw9XCJibGFja1wiLz5cclxuICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICA8ZGVmcz5cclxuICAgICAgICAgICAgICA8Y2xpcFBhdGggaWQ9XCJjbGlwMF85MjRfMTI0N1wiPlxyXG4gICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIyNVwiIGhlaWdodD1cIjMwXCIgZmlsbD1cIndoaXRlXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDIpXCIvPlxyXG4gICAgICAgICAgICAgIDwvY2xpcFBhdGg+XHJcbiAgICAgICAgICAgIDwvZGVmcz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJwb3B1cF9saW5rXCI+XHJcbiAgICAgICAgICA8c3ZnIHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCIzMFwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgICAgICAgPGcgY2xpcFBhdGg9XCJ1cmwoI2NsaXAwXzkyNF8xMjQxKVwiPlxyXG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMzAgMTVDMzAgNi43MTU3IDIzLjI4NDMgLTIuNjcwMjllLTA1IDE1IC0yLjY3MDI5ZS0wNUM2LjcxNTcyIC0yLjY3MDI5ZS0wNSAwIDYuNzE1NyAwIDE1QzAgMjIuNDg2OSA1LjQ4NTI4IDI4LjY5MjUgMTIuNjU2MiAyOS44MTc3VjE5LjMzNTlIOC44NDc2NlYxNUgxMi42NTYyVjExLjY5NTNDMTIuNjU2MiA3LjkzNTkxIDE0Ljg5NTYgNS44NTkzNSAxOC4zMjIgNS44NTkzNUMxOS45NjMxIDUuODU5MzUgMjEuNjc5NyA2LjE1MjMyIDIxLjY3OTcgNi4xNTIzMlY5Ljg0MzcySDE5Ljc4ODJDMTcuOTI0OSA5Ljg0MzcyIDE3LjM0MzggMTEgMTcuMzQzOCAxMi4xODYyVjE1SDIxLjUwMzlMMjAuODM4OSAxOS4zMzU5SDE3LjM0MzhWMjkuODE3N0MyNC41MTQ3IDI4LjY5MjUgMzAgMjIuNDg2OSAzMCAxNVpcIiBmaWxsPVwid2hpdGVcIi8+XHJcbiAgICAgICAgICAgICAgPHBhdGggZD1cIk0yMC44Mzg5IDE5LjMzNTlMMjEuNTAzOSAxNUgxNy4zNDM4VjEyLjE4NjJDMTcuMzQzOCAxMSAxNy45MjQ5IDkuODQzNzUgMTkuNzg4MiA5Ljg0Mzc1SDIxLjY3OTdWNi4xNTIzNEMyMS42Nzk3IDYuMTUyMzQgMTkuOTYzMSA1Ljg1OTM4IDE4LjMyMiA1Ljg1OTM4QzE0Ljg5NTYgNS44NTkzOCAxMi42NTYzIDcuOTM1OTQgMTIuNjU2MyAxMS42OTUzVjE1SDguODQ3NjZWMTkuMzM1OUgxMi42NTYzVjI5LjgxNzhDMTMuNDE5OSAyOS45Mzc2IDE0LjIwMjcgMzAgMTUgMzBDMTUuNzk3MyAzMCAxNi41ODAxIDI5LjkzNzYgMTcuMzQzOCAyOS44MTc4VjE5LjMzNTlIMjAuODM4OVpcIiBmaWxsPVwiYmxhY2tcIi8+XHJcbiAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgPGRlZnM+XHJcbiAgICAgICAgICAgICAgPGNsaXBQYXRoIGlkPVwiY2xpcDBfOTI0XzEyNDFcIj5cclxuICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCIzMFwiIGZpbGw9XCJ3aGl0ZVwiLz5cclxuICAgICAgICAgICAgICA8L2NsaXBQYXRoPlxyXG4gICAgICAgICAgICA8L2RlZnM+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwicG9wdXBfbGlua1wiPlxyXG4gICAgICAgICAgPHN2ZyB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjguMiAxNS4zMTI1QzI4LjIgMTQuMzM3NSAyOC4xMTI1IDEzLjQgMjcuOTUgMTIuNUgxNVYxNy44MTg4SDIyLjRDMjIuMDgxMyAxOS41Mzc1IDIxLjExMjUgMjAuOTkzOCAxOS42NTYzIDIxLjk2ODhWMjUuNDE4N0gyNC4xQzI2LjcgMjMuMDI1IDI4LjIgMTkuNSAyOC4yIDE1LjMxMjVaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTE1LjAwMDQgMjguNzVDMTguNzEyOSAyOC43NSAyMS44MjU0IDI3LjUxODggMjQuMTAwNCAyNS40MTg4TDE5LjY1NjYgMjEuOTY4OEMxOC40MjU0IDIyLjc5MzggMTYuODUwNCAyMy4yODEzIDE1LjAwMDQgMjMuMjgxM0MxMS40MTkxIDIzLjI4MTMgOC4zODc4OSAyMC44NjI1IDcuMzA2NjQgMTcuNjEyNUgyLjcxMjg5VjIxLjE3NUM0Ljk3NTM5IDI1LjY2ODggOS42MjUzOSAyOC43NSAxNS4wMDA0IDI4Ljc1WlwiIGZpbGw9XCJibGFja1wiLz5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk03LjMwNjI1IDE3LjYxMjVDNy4wMzEyNSAxNi43ODc1IDYuODc1IDE1LjkwNjIgNi44NzUgMTVDNi44NzUgMTQuMDkzNyA3LjAzMTI1IDEzLjIxMjUgNy4zMDYyNSAxMi4zODc1VjguODI0OTVIMi43MTI1QzEuNzUgMTAuNzQxIDEuMjQ5MTUgMTIuODU1NyAxLjI1IDE1QzEuMjUgMTcuMjE4NyAxLjc4MTI1IDE5LjMxODcgMi43MTI1IDIxLjE3NUw3LjMwNjI1IDE3LjYxMjVaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTE1LjAwMDQgNi43MTg3NUMxNy4wMTkxIDYuNzE4NzUgMTguODMxNiA3LjQxMjUgMjAuMjU2NiA4Ljc3NUwyNC4yMDA0IDQuODMxMjVDMjEuODE5MSAyLjYxMjUgMTguNzA2NiAxLjI1IDE1LjAwMDQgMS4yNUM5LjYyNTM5IDEuMjUgNC45NzUzOSA0LjMzMTI1IDIuNzEyODkgOC44MjVMNy4zMDY2NCAxMi4zODc1QzguMzg3ODkgOS4xMzc1IDExLjQxOTEgNi43MTg3NSAxNS4wMDA0IDYuNzE4NzVaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPHAgY2xhc3M9XCJuby1hY2NvdW50LXlldFwiPtCd0LXRgiDQsNC60LrQsNGD0L3RgtCwPzwvcD5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwb3B1cF9fYnV0dG9uIHBvcHVwX19idXR0b24tcmVnaXN0ZXJcIj7Ql9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y88L2J1dHRvbj5cclxuICAgIDwvZm9ybT5cclxuXHJcbiAgICBgXHJcbiAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3RlclBvcHVwKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICBgXHJcbiAgICA8Zm9ybSBjbGFzcz1cInBvcHVwX19yZWdpc3RlclwiIG5hbWU9XCJwb3B1cF9fcmVnaXN0ZXJcIj5cclxuICAgICAgPGxhYmVsIGNsYXNzPSdmb3JtLWxhYmVsJz48aW5wdXQgY2xhc3M9J3BvcHVwX19pbnB1dCcgbmFtZT1cInVzZXJuYW1lXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cItCY0LzRjyDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cIiAvPjxkaXYgY2xhc3M9J2Zvcm0tZXJyb3InPjxkaXY+PHAgY2xhc3M9J2Zvcm0tZXJyb3JfbWVzc2FnZSc+PC9wPjwvZGl2PjwvZGl2PjwvbGFiZWw+XHJcbiAgICAgIDxsYWJlbCBjbGFzcz0nZm9ybS1sYWJlbCc+PGlucHV0IGNsYXNzPSdwb3B1cF9faW5wdXQnIG5hbWU9XCJlbWFpbFwiIHR5cGU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwi0K3Qu9C10LrRgtGA0L7QvdC90LDRjyDQv9C+0YfRgtCwXCIgLz48ZGl2IGNsYXNzPSdmb3JtLWVycm9yJz48ZGl2PjxwIGNsYXNzPSdmb3JtLWVycm9yX21lc3NhZ2UnPjwvcD48L2Rpdj48L2Rpdj48L2xhYmVsPlxyXG4gICAgICA8bGFiZWwgY2xhc3M9J2Zvcm0tbGFiZWwnPjxpbnB1dCBjbGFzcz0ncG9wdXBfX2lucHV0JyBuYW1lPVwicGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cItCf0LDRgNC+0LvRjFwiIC8+PGRpdiBjbGFzcz0nZm9ybS1lcnJvcic+PGRpdj48cCBjbGFzcz0nZm9ybS1lcnJvcl9tZXNzYWdlJz48L3A+PC9kaXY+PC9kaXY+PC9sYWJlbD5cclxuICAgICAgPGxhYmVsIGNsYXNzPSdmb3JtLWxhYmVsJz48aW5wdXQgY2xhc3M9J3BvcHVwX19pbnB1dCcgbmFtZT1cInBhc3N3b3JkMlwiIHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPSfQn9C+0LLRgtC+0YDQuNGC0Ywg0L/QsNGA0L7Qu9GMJyAvPjxkaXYgY2xhc3M9J2Zvcm0tZXJyb3InPjxkaXY+PHAgY2xhc3M9J2Zvcm0tZXJyb3JfbWVzc2FnZSc+PC9wPjwvZGl2PjwvZGl2PjwvbGFiZWw+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwb3B1cF9fY2hlY2tcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImFjY2VwdF90ZXJtc1wiIGlkPVwiYWNjZXB0X3Rlcm1zXCIgPjwvaW5wdXQ+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwb3B1cF9fY2hlY2tfdGV4dFwiPtCvINC/0YDQuNC90LjQvNCw0Y4g0YPRgdC70L7QstC40Y8gPGE+0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC+0LPQviDRgdC+0LPQu9Cw0YjQtdC90LjRjzwvYT48L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicG9wdXAtcmVjYXB0Y2hhXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImctcmVjYXB0Y2hhXCIgZGF0YS1zaXRla2V5PVwiNkxjUTRWZ3BBQUFBQUlCNF92cVBHaWV6ekJNZWs5bjMwZ1VxWEYzUVwiIGRhdGEtY2FsbGJhY2s9J2dldFJlY2FwdGNoYSc+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwi0JfQsNGA0LXQs9C40YHRgtGA0LjRgNC+0LLQsNGC0YzRgdGPXCIgY2xhc3M9XCJwb3B1cF9faW5wdXRfZ3JlZW4gcG9wdXBfX2lucHV0X3JlZ2lzdGVyXCI+PC9pbnB1dD5cclxuICAgICAgPHAgY2xhc3M9XCJsb2dpbi11c2luZ1wiPtCX0LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDRgtGM0YHRjyDRgSDQv9C+0LzQvtGJ0YzRjjwvcD5cclxuICAgICAgPGRpdiBjbGFzcz1cInBvcHVwX2xpbmtzXCI+XHJcbiAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwicG9wdXBfbGlua1wiPlxyXG4gICAgICAgICAgPHN2ZyB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgICAgICAgIDxnIGNsaXBQYXRoPVwidXJsKCNjbGlwMF85MjRfMTI0NylcIj5cclxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTguMTk4MzUgMjkuMTk0NkM3LjU3ODUxIDI4Ljk5MzMgNi45NTg2OCAyOC41OTA2IDYuNTQ1NDUgMjcuNzg1MkM2LjEzMjIzIDI3LjM4MjUgNS43MTkwMSAyNi43Nzg1IDUuMDk5MTcgMjUuOTczMkM0LjI3MjczIDI0Ljc2NTEgMy40NDYyOCAyMy4xNTQ0IDIuODI2NDUgMjEuNTQzNkMyLjIwNjYxIDE5LjczMTUgMiAxNy45MTk1IDIgMTYuMTA3NEMyIDE0LjA5NCAyLjQxMzIyIDEyLjQ4MzIgMy4yMzk2NyAxMS4wNzM4QzMuODU5NSA5Ljg2NTc3IDQuODkyNTYgOS4wNjA0IDUuOTI1NjIgOC4yNTUwM0M2Ljk1ODY4IDcuNjUxMDEgOC4xOTgzNSA3LjI0ODMyIDkuNDM4MDEgNy4yNDgzMkM5Ljg1MTI0IDcuMjQ4MzIgMTAuMjY0NSA3LjI0ODMyIDEwLjg4NDMgNy40NDk2NkMxMS4yOTc1IDcuNDQ5NjYgMTEuNzEwNyA3LjY1MTAxIDEyLjMzMDYgNy44NTIzNUMxMi45NTA0IDguMDUzNjkgMTMuMzYzNiA4LjI1NTAzIDEzLjU3MDIgOC4yNTUwM0MxMy45ODM1IDguNDU2MzggMTQuMzk2NyA4LjQ1NjM4IDE0LjYwMzMgOC40NTYzOEMxNC44MDk5IDguNDU2MzggMTUuMDE2NSA4LjQ1NjM4IDE1LjQyOTggOC4yNTUwM0MxNS42MzY0IDguMjU1MDMgMTYuMDQ5NiA4LjA1MzY5IDE2LjQ2MjggNy44NTIzNUMxNi44NzYgNy42NTEwMSAxNy4yODkzIDcuNDQ5NjYgMTcuNzAyNSA3LjQ0OTY2QzE4LjExNTcgNy40NDk2NiAxOC41Mjg5IDcuMjQ4MzIgMTguOTQyMSA3LjI0ODMyQzE5LjM1NTQgNy4yNDgzMiAxOS45NzUyIDcuMDQ2OTggMjAuMzg4NCA3LjI0ODMyQzIxLjIxNDkgNy4yNDgzMiAyMi4wNDEzIDcuNDQ5NjYgMjIuODY3OCA3Ljg1MjM1QzI0LjEwNzQgOC4yNTUwMyAyNS4xNDA1IDkuMjYxNzUgMjUuOTY2OSAxMC4yNjg1QzI1Ljc2MDMgMTAuMjY4NSAyNS4zNDcxIDEwLjQ2OTggMjUuMTQwNSAxMC44NzI1QzI0LjUyMDcgMTEuNDc2NSAyMy45MDA4IDEyLjA4MDUgMjMuNDg3NiAxMi42ODQ2QzIzLjA3NDQgMTMuNjkxMyAyMi42NjEyIDE0LjY5OCAyMi42NjEyIDE1LjkwNkMyMi42NjEyIDE3LjMxNTQgMjMuMDc0NCAxOC41MjM1IDIzLjY5NDIgMTkuNTMwMkMyNC4xMDc0IDIwLjMzNTYgMjQuOTMzOSAyMC45Mzk2IDI1LjU1MzcgMjEuMzQyM0MyNi4xNzM1IDIxLjU0MzYgMjYuNTg2OCAyMS43NDUgMjYuNzkzNCAyMS45NDYzQzI2Ljc5MzQgMjIuMzQ5IDI2LjU4NjggMjIuOTUzIDI2LjM4MDIgMjMuMTU0NEMyNS45NjY5IDI0LjM2MjQgMjUuMzQ3MSAyNS4xNjc4IDI0LjcyNzMgMjYuMTc0NUMyNC4xMDc0IDI2Ljk3OTkgMjMuNjk0MiAyNy41ODM5IDIzLjQ4NzYgMjcuNzg1MkMyMi44Njc4IDI4LjM4OTMgMjIuNDU0NSAyOC45OTMzIDIxLjgzNDcgMjkuMTk0NkMyMS40MjE1IDI5LjU5NzMgMjAuODAxNiAyOS43OTg3IDE5Ljk3NTIgMjkuNzk4N0MxOS41NjIgMjkuNzk4NyAxOS4xNDg4IDI5Ljc5ODcgMTguNzM1NSAyOS41OTczQzE4LjUyODkgMjkuNTk3MyAxOC4xMTU3IDI5LjM5NiAxNy43MDI1IDI5LjE5NDZDMTcuMDgyNiAyOC45OTMzIDE2Ljg3NiAyOC43OTE5IDE2LjQ2MjggMjguNzkxOUMxNi4wNDk2IDI4LjU5MDYgMTUuNDI5OCAyOC41OTA2IDE1LjAxNjUgMjguNTkwNkMxNC42MDMzIDI4LjU5MDYgMTMuOTgzNSAyOC41OTA2IDEzLjU3MDIgMjguNzkxOUMxMy4xNTcgMjguNzkxOSAxMi43NDM4IDI4Ljk5MzMgMTIuMzMwNiAyOS4xOTQ2QzExLjcxMDcgMjkuMzk2IDExLjUwNDEgMjkuNTk3MyAxMS4yOTc1IDI5LjU5NzNDMTAuODg0MyAyOS43OTg3IDEwLjQ3MTEgMjkuNzk4NyAxMC4wNTc4IDI5Ljc5ODdDOS40MzgwMiAyOS43OTg3IDguODE4MTggMjkuNTk3MyA4LjE5ODM1IDI5LjE5NDZaTTE2Ljg3NiA2LjI0MTYxQzE2LjA0OTYgNi42NDQyOSAxNS4yMjMxIDYuODQ1NjQgMTQuMzk2NyA2Ljg0NTY0QzE0LjE5MDEgNi4wNDAyNyAxNC4zOTY3IDUuMjM0OSAxNC44MDk5IDQuMjI4MTlDMTUuMjIzMSAzLjQyMjgyIDE1LjQyOTggMi44MTg3OSAxNi4wNDk2IDIuMjE0NzZDMTYuNjY5NCAxLjYxMDc0IDE3LjI4OTMgMS4wMDY3MSAxOC4xMTU3IDAuNjA0MDI3QzE4Ljk0MjEgMC4yMDEzNDMgMTkuNzY4NiAwIDIwLjU5NSAwQzIwLjU5NSAwLjgwNTM2OSAyMC4zODg0IDEuNjEwNzQgMjAuMTgxOCAyLjYxNzQ1QzE5Ljk3NTIgMy40MjI4MiAxOS4zNTU0IDQuMDI2ODUgMTguOTQyMSA0LjYzMDg3QzE4LjMyMjMgNS40MzYyNCAxNy43MDI1IDUuODM4OTMgMTYuODc2IDYuMjQxNjFaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG4gICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgIDxkZWZzPlxyXG4gICAgICAgICAgICAgIDxjbGlwUGF0aCBpZD1cImNsaXAwXzkyNF8xMjQ3XCI+XHJcbiAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjI1XCIgaGVpZ2h0PVwiMzBcIiBmaWxsPVwid2hpdGVcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMilcIi8+XHJcbiAgICAgICAgICAgICAgPC9jbGlwUGF0aD5cclxuICAgICAgICAgICAgPC9kZWZzPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cInBvcHVwX2xpbmtcIj5cclxuICAgICAgICAgIDxzdmcgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICAgICAgICA8ZyBjbGlwUGF0aD1cInVybCgjY2xpcDBfOTI0XzEyNDEpXCI+XHJcbiAgICAgICAgICAgICAgPHBhdGggZD1cIk0zMCAxNUMzMCA2LjcxNTcgMjMuMjg0MyAtMi42NzAyOWUtMDUgMTUgLTIuNjcwMjllLTA1QzYuNzE1NzIgLTIuNjcwMjllLTA1IDAgNi43MTU3IDAgMTVDMCAyMi40ODY5IDUuNDg1MjggMjguNjkyNSAxMi42NTYyIDI5LjgxNzdWMTkuMzM1OUg4Ljg0NzY2VjE1SDEyLjY1NjJWMTEuNjk1M0MxMi42NTYyIDcuOTM1OTEgMTQuODk1NiA1Ljg1OTM1IDE4LjMyMiA1Ljg1OTM1QzE5Ljk2MzEgNS44NTkzNSAyMS42Nzk3IDYuMTUyMzIgMjEuNjc5NyA2LjE1MjMyVjkuODQzNzJIMTkuNzg4MkMxNy45MjQ5IDkuODQzNzIgMTcuMzQzOCAxMSAxNy4zNDM4IDEyLjE4NjJWMTVIMjEuNTAzOUwyMC44Mzg5IDE5LjMzNTlIMTcuMzQzOFYyOS44MTc3QzI0LjUxNDcgMjguNjkyNSAzMCAyMi40ODY5IDMwIDE1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cclxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIwLjgzODkgMTkuMzM1OUwyMS41MDM5IDE1SDE3LjM0MzhWMTIuMTg2MkMxNy4zNDM4IDExIDE3LjkyNDkgOS44NDM3NSAxOS43ODgyIDkuODQzNzVIMjEuNjc5N1Y2LjE1MjM0QzIxLjY3OTcgNi4xNTIzNCAxOS45NjMxIDUuODU5MzggMTguMzIyIDUuODU5MzhDMTQuODk1NiA1Ljg1OTM4IDEyLjY1NjMgNy45MzU5NCAxMi42NTYzIDExLjY5NTNWMTVIOC44NDc2NlYxOS4zMzU5SDEyLjY1NjNWMjkuODE3OEMxMy40MTk5IDI5LjkzNzYgMTQuMjAyNyAzMCAxNSAzMEMxNS43OTczIDMwIDE2LjU4MDEgMjkuOTM3NiAxNy4zNDM4IDI5LjgxNzhWMTkuMzM1OUgyMC44Mzg5WlwiIGZpbGw9XCJibGFja1wiLz5cclxuICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICA8ZGVmcz5cclxuICAgICAgICAgICAgICA8Y2xpcFBhdGggaWQ9XCJjbGlwMF85MjRfMTI0MVwiPlxyXG4gICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgZmlsbD1cIndoaXRlXCIvPlxyXG4gICAgICAgICAgICAgIDwvY2xpcFBhdGg+XHJcbiAgICAgICAgICAgIDwvZGVmcz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJwb3B1cF9saW5rXCI+XHJcbiAgICAgICAgICA8c3ZnIHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCIzMFwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk0yOC4yIDE1LjMxMjVDMjguMiAxNC4zMzc1IDI4LjExMjUgMTMuNCAyNy45NSAxMi41SDE1VjE3LjgxODhIMjIuNEMyMi4wODEzIDE5LjUzNzUgMjEuMTEyNSAyMC45OTM4IDE5LjY1NjMgMjEuOTY4OFYyNS40MTg3SDI0LjFDMjYuNyAyMy4wMjUgMjguMiAxOS41IDI4LjIgMTUuMzEyNVpcIiBmaWxsPVwiYmxhY2tcIi8+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTUuMDAwNCAyOC43NUMxOC43MTI5IDI4Ljc1IDIxLjgyNTQgMjcuNTE4OCAyNC4xMDA0IDI1LjQxODhMMTkuNjU2NiAyMS45Njg4QzE4LjQyNTQgMjIuNzkzOCAxNi44NTA0IDIzLjI4MTMgMTUuMDAwNCAyMy4yODEzQzExLjQxOTEgMjMuMjgxMyA4LjM4Nzg5IDIwLjg2MjUgNy4zMDY2NCAxNy42MTI1SDIuNzEyODlWMjEuMTc1QzQuOTc1MzkgMjUuNjY4OCA5LjYyNTM5IDI4Ljc1IDE1LjAwMDQgMjguNzVaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTcuMzA2MjUgMTcuNjEyNUM3LjAzMTI1IDE2Ljc4NzUgNi44NzUgMTUuOTA2MiA2Ljg3NSAxNUM2Ljg3NSAxNC4wOTM3IDcuMDMxMjUgMTMuMjEyNSA3LjMwNjI1IDEyLjM4NzVWOC44MjQ5NUgyLjcxMjVDMS43NSAxMC43NDEgMS4yNDkxNSAxMi44NTU3IDEuMjUgMTVDMS4yNSAxNy4yMTg3IDEuNzgxMjUgMTkuMzE4NyAyLjcxMjUgMjEuMTc1TDcuMzA2MjUgMTcuNjEyNVpcIiBmaWxsPVwiYmxhY2tcIi8+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTUuMDAwNCA2LjcxODc1QzE3LjAxOTEgNi43MTg3NSAxOC44MzE2IDcuNDEyNSAyMC4yNTY2IDguNzc1TDI0LjIwMDQgNC44MzEyNUMyMS44MTkxIDIuNjEyNSAxOC43MDY2IDEuMjUgMTUuMDAwNCAxLjI1QzkuNjI1MzkgMS4yNSA0Ljk3NTM5IDQuMzMxMjUgMi43MTI4OSA4LjgyNUw3LjMwNjY0IDEyLjM4NzVDOC4zODc4OSA5LjEzNzUgMTEuNDE5MSA2LjcxODc1IDE1LjAwMDQgNi43MTg3NVpcIiBmaWxsPVwiYmxhY2tcIi8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8cCBjbGFzcz1cIm5vLWFjY291bnQteWV0XCI+0KPQttC1INC10YHRgtGMINCw0LrQutCw0YPQvdGCPzwvcD5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwb3B1cF9fYnV0dG9uIHBvcHVwX19idXR0b24tbG9naW5cIj7QktC+0LnRgtC4PC9idXR0b24+XHJcbiAgICA8L2Zvcm0+XHJcblxyXG4gICAgYFxyXG4gIClcclxufVxyXG5cclxuZnVuY3Rpb24gcmVjb3ZlcnlQb3B1cCgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgYFxyXG4gICAgPGZvcm0gY2xhc3M9XCJwb3B1cF9fcmVjb3ZlcnlcIiBuYW1lPVwicG9wdXBfX3JlY292ZXJ5XCI+XHJcbiAgICAgIDxsYWJlbCBjbGFzcz0nZm9ybS1sYWJlbCc+PGlucHV0IGNsYXNzPSdwb3B1cF9faW5wdXQnIHR5cGU9XCJlbWFpbFwiIG5hbWU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRS1tYWlsLCDRg9C60LDQt9Cw0L3QvdGL0Lkg0L/RgNC4INGA0LXQs9C40YHRgtGA0LDRhtC40LhcIiAvPjxkaXYgY2xhc3M9J2Zvcm0tZXJyb3InPjxkaXY+PHAgY2xhc3M9J2Zvcm0tZXJyb3JfbWVzc2FnZSc+PC9wPjwvZGl2PjwvZGl2PjwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCLQktC+0YHRgdGC0LDQvdC+0LLQuNGC0YxcIiBjbGFzcz1cInBvcHVwX19pbnB1dF9ncmVlbiBwb3B1cF9faW5wdXRfcmVzdG9yZVwiPjwvaW5wdXQ+XHJcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicG9wdXBfX2J1dHRvbiBwb3B1cF9fYnV0dG9uX2xvZ2luXCI+0JLQvtC50YLQuDwvYnV0dG9uPlxyXG4gICAgPC9mb3JtPlxyXG4gICAgXHJcbiAgICBgXHJcbiAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kUG9wdXAoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIGBcclxuICAgICAgPHAgY2xhc3M9J3BvcHVwX19zZW5kJz7QmNC00Lgg0L3QsCDQv9C+0YfRgtGDPC9wPlxyXG5cclxuICAgIGBcclxuICApXHJcbn1cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL2luZGV4LnNjc3MnXHJcbmltcG9ydCB7IEhlYWRlckJ1dHRvbiwgSGVhZGVyQWZ0ZXJSZW5kZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyQnV0dG9uJ1xyXG5pbXBvcnQgeyBQb3B1cCwgUG9wdXBBZnRlclJlbmRlciB9IGZyb20gJy4vY29tcG9uZW50cy9wb3B1cCdcclxuXHJcbmNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwJyksXHJcbiAgaGVhZGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hlYWRlci1idXR0b24nKSxcclxuICBoZWFkZXJCdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19idXJnZXInKSxcclxuICBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKVxyXG5cclxuXHJcbmhlYWRlckJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxyXG4gIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnc2lkZScpXHJcbiAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xyXG59KVxyXG5cclxubWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcclxuICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS5zaWRlLmFjdGl2ZScpKXtcclxuICAgIGlmKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUgc2lkZSBhY3RpdmUnKXtcclxuICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdzaWRlJylcclxuICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXHJcbiAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0bydcclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG5cclxuSGVhZGVyQnV0dG9uKCkudGhlbigoaHRtbCkgPT4gaGVhZGVyQnV0dG9uLmlubmVySFRNTCA9IGh0bWwpLnRoZW4oKCkgPT4gSGVhZGVyQWZ0ZXJSZW5kZXIoKSlcclxuUG9wdXAoKS50aGVuKChodG1sKSA9PiBwb3B1cC5pbm5lckhUTUwgPSBodG1sKS50aGVuKCgpID0+IFBvcHVwQWZ0ZXJSZW5kZXIoKSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
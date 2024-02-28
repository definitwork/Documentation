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

    setCloseButton()

  })
  
  logoutBtn.addEventListener('click', ()=>{
    fetch(`${location.origin}/api/v1/profile/logout/`)
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

function setCloseButton(){
  let y = 0
  const closes = document.querySelector('.close')
  
  if(document.querySelector('.popup__log-in.active')){
    y = document.querySelector('.popup__log-in.active').offsetTop
    if( window.innerWidth < 481){
      console.log(window.innerWidth)
      closes.style.top = `${y-50}px`
      closes.style.right = `18px`
    } else {
      closes.style.top = `${y-50}px`
      closes.style.right = `${y}px`
    }
  }
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
    send = document.querySelector('.popup__send'), 

    inputsRed = document.querySelectorAll('.popup__input_red')
    if(inputsRed){
      setTimeout(()=>{
        for (let i = 0; i < inputsRed.length; i++){
          inputsRed[i].classList.toggle('popup__input_red')
        }
      }, 150)
    }

    setRegisterBtn.addEventListener('click', ()=>{
      login.className = 'popup__log-in'
      register.className = 'popup__register active'
      setCloseButton()
    })

    close.addEventListener('click', ()=> {
      const regActive = document.querySelector('.popup__register.active'),
        logActive = document.querySelector('.popup__log-in.active'),
        recActive = document.querySelector('.popup__recovery.active'),
        body = document.querySelector('body')
        body.style.overflow = 'auto'
        popup.className = 'popup'

        if (!logActive){login.classList.toggle('active')}
        if (recActive){recovery.classList.toggle('active')}
        if (regActive){register.classList.toggle('active')}

    })

    setLoginBtn.addEventListener('click', ()=>{
      login.className = 'popup__log-in active'
      register.className = 'popup__register'
      setCloseButton()
    })

    returnLoginBtn.addEventListener('click', ()=>{
      login.className = 'popup__log-in active'
      recovery.className = 'popup__recovery'
      setCloseButton()
    })

    fogrotBtn.addEventListener('click', ()=>{
      login.className = 'popup__log-in'
      recovery.className = 'popup__recovery active'
      setCloseButton()
    })

    restorePassword.addEventListener('click', (e)=>{
      e.preventDefault()
      const form = document.forms.popup__recovery,
        email = form.elements.email.value

      const csrftoken = getCookie('csrftoken')
      const body = JSON.stringify({email: email})

      fetch(`${location.origin}/api/v1/profile/email-check/`, {
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
      }).then((data)=>{
        const recovery = document.querySelector('.popup__recovery')
        recovery.innerHTML =  recoveryPopup(data)
        PopupAfterRender()
      })
    })

    registerBtn.addEventListener('click', (e)=>{
            
      e.preventDefault()
      const form = document.forms.popup__register,
        username = form.elements.username.value,
        email = form.elements.email.value,
        password = form.elements.password.value,
        password2 = form.elements.password2.value,
        accept_terms = form.elements.accept_terms.checked,
        recaptcha = localStorage.getItem('captcha')


      const data = {
          'username': username,
          'email': email,
          'password': password,
          'password2': password2,
          'accept_terms': accept_terms,
          'recaptcha': recaptcha
      }

      let f = false

      auth(data, f)
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

      let f = true

      auth(data, f)
  })
}

function auth(data, f){
  let url = null
  !f ? url = `${location.origin}/api/v1/profile/register/`: url = `${location.origin}/api/v1/profile/login/`
  const csrftoken = getCookie('csrftoken')
  data['csrftoken'] = csrftoken
  async function postData(url, data, f) {
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
  
  postData(url, data, f).then((data) => {

    if ('success' in data) {
      const popup = document.querySelector('.popup')
      popup.classList.toggle('active')

      localStorage.setItem('username', 'Johan')

      const headerButton = document.querySelector('#header-button')
      ;(0,_components_headerButton__WEBPACK_IMPORTED_MODULE_0__.HeaderButton)().then((html) => headerButton.innerHTML = html).then(() => (0,_components_headerButton__WEBPACK_IMPORTED_MODULE_0__.HeaderAfterRender)())
      const head = document.querySelector('head')
      const script = document.createElement('script')
      script.src = 'http://www.google.com/recaptcha/api.js'
      head.append(script)

    } else {
      if (f){
        const login = document.querySelector('.popup__log-in')
        login.innerHTML = loginPopup(data)
        PopupAfterRender()
        const head = document.querySelector('head')
        const script = document.createElement('script')
        script.src = 'http://www.google.com/recaptcha/api.js'
        head.append(script)
        
      }else{
        const register = document.querySelector('.popup__register')
        register.innerHTML = registerPopup(data)
        PopupAfterRender()
        const head = document.querySelector('head')
        const script = document.createElement('script')
        script.src = 'http://www.google.com/recaptcha/api.js'
        head.append(script)
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

function setCloseButton(){
  let y = 0
  const closes = document.querySelector('.close')
  
  if(document.querySelector('.popup__log-in.active')){
    y = document.querySelector('.popup__log-in.active').offsetTop
    if( window.innerWidth < 481){
      
      closes.style.top = `${y-50}px`
      closes.style.right = `18px`
    } else {
      closes.style.top = `${y-50}px`
      closes.style.right = `${y}px`
    }
  }else if(document.querySelector('.popup__register.active')){
    y = document.querySelector('.popup__register.active').offsetTop
    if( window.innerWidth < 481){
      closes.style.top = `${y-50}px`
      closes.style.right = `18px`
    } else {
      closes.style.top = `${y-50}px`
      closes.style.right = `${y}px`
    }
  }else if(document.querySelector('.popup__recovery.active')){
    y = document.querySelector('.popup__recovery.active').offsetTop
    if( window.innerWidth < 481){
      closes.style.top = `${y-50}px`
      closes.style.right = `18px`
    } else {
      closes.style.top = `${y-50}px`
      closes.style.right = `${y}px`
    }
  }
}



function loginPopup(data=null) {
  let username = null,
    password = null
  if (data) {
    if ('username' in data){username = data.username}
    if ('password' in data){password = data.password}
  }
  
  if (username || password){data = null}
  return (
    `
    <form class="popup__log-in active" name="popup__login">
      <label class='form-label'><input class='popup__input ${username? 'popup__input_red' : ''}' name="username" id="username" type="text" placeholder="Имя пользователя" />
      ${username? `<div class='form-error active'><div><p class='form-error_message'>${username}</p></div></div>` : ''}</label>
      <label class='form-label'><input class='popup__input ${password? 'popup__input_red' : ''}' name="password" type="password" placeholder="Пароль" />
      ${password? `<div class='form-error active'><div><p class='form-error_message'>${password}</p></div></div>` : ''}</label>
      ${data ? `<div class="common-error">${data}</div>`: `<div class="common-error"></div>`}
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

function registerPopup(data=null) {

  let username = null,
    email = null,
    password = null,
    password2 = null,
    recaptcha = null,
    accept_terms = null

  if (data) {
    if ('username' in data){username = data.username}
    if ('email' in data){email = data.email}
    if ('password' in data){password = data.password}
    if ('password2' in data){password2 = data.password2}
    if ('accept_terms' in data){accept_terms = data.accept_terms}
    if ('recaptcha' in data){recaptcha = 'Необходима верификация'}
  }

  if (username || password || password2 || email || accept_terms){data = null}
  if(recaptcha){data = recaptcha}
  
  return (
    `
    <form class="popup__register" name="popup__register">
      <label class='form-label'><input class='popup__input ${username? 'popup__input_red' : ''}' name="username" type="text" placeholder="Имя пользователя" />
      ${username? `<div class='form-error active'><div><p class='form-error_message'>${username}</p></div></div>` : ''}</label>
      <label class='form-label'><input class='popup__input ${email? 'popup__input_red' : ''}' name="email" type="email" placeholder="Электронная почта" />
      ${email? `<div class='form-error active'><div><p class='form-error_message'>${email}</p></div></div>` : ''}</label>
      <label class='form-label'><input class='popup__input ${password? 'popup__input_red' : ''}' name="password" type="password" placeholder="Пароль" />
      ${password? `<div class='form-error active'><div><p class='form-error_message'>${password}</p></div></div>` : ''}</label>
      <label class='form-label'><input class='popup__input ${password2? 'popup__input_red' : ''}' name="password2" type="password" placeholder='Повторить пароль' />
      ${password2? `<div class='form-error active'><div><p class='form-error_message'>${password2}</p></div></div>` : ''}</label>
      ${data ? `<div class="common-error">${data}</div>`: `<div class="common-error"></div>`}
      <div class="popup__check ${accept_terms? 'popup__input_red' : ''}">
        <div class="form-input__check">
          <input type="checkbox" name="accept_terms" id="accept_terms" style="border: red"/>
        </div>
        <span class="popup__check_text">Я принимаю условия <a>пользовательского соглашения</a></span>
        ${accept_terms? `<div class='form-error active'><div><p class='form-error_message'>${accept_terms}</p></div></div>` : ''}
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

function recoveryPopup(data=null) {
  let email = null
      
  if (data) {
    if ('email' in data){email = data.email}
  }
  
  if (email){data = null}

  return (
    `
    <form class="popup__recovery" name="popup__recovery">
      <label class='form-label'><input class='popup__input ${email? 'popup__input_red' : ''}' type="email" name="email" placeholder="E-mail, указанный при регистрации"/>
      ${email? `<div class='form-error active'><div><p class='form-error_message'>${email}</p></div></div>` : ''}</label>
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
  menu = document.querySelector('.menu'),

  body = document.querySelector('body')

headerBurger.addEventListener('click', ()=>{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2Y7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSx1RUFBWSw0REFBNEQsMkVBQWlCO0FBQ3pGLHlEQUFLLHFEQUFxRCxtRUFBZ0IsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2hlYWRlcl9mb290ZXIvLi9zcmMvaW5kZXguc2Nzcz9hNWRlIiwid2VicGFjazovL2hlYWRlcl9mb290ZXIvLi9zcmMvY29tcG9uZW50cy9oZWFkZXJCdXR0b24uanMiLCJ3ZWJwYWNrOi8vaGVhZGVyX2Zvb3Rlci8uL3NyYy9jb21wb25lbnRzL3BvcHVwLmpzIiwid2VicGFjazovL2hlYWRlcl9mb290ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaGVhZGVyX2Zvb3Rlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaGVhZGVyX2Zvb3Rlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hlYWRlcl9mb290ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9oZWFkZXJfZm9vdGVyLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBIZWFkZXJCdXR0b24oKSB7XHJcbiAgbGV0IHVzZXIgPSAnJyxcclxuICAgIG5vdXNlciA9ICcnXHJcbiAgY29uc3QgZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpO1xyXG4gIGRhdGE/IHVzZXIgPSAnYWN0aXZlJyA6IG5vdXNlciA9ICdhY3RpdmUnXHJcbiAgICBcclxuICByZXR1cm4gKFxyXG4gICAgYFxyXG4gICAgICA8YnV0dG9uIGNsYXNzPSdidXR0b25fX2xvZy1pbiAke25vdXNlcn0nPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25fX2lubmVyXCI+XHJcbiAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvaW1nL3VzZXIuc3ZnXCIgYWx0PVwiXCIgY2xhc3M9XCJ1c2VyLXN2Z1wiPjwvaW1nPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWFkZXJfbG9nLWluXCI+0JLRhdC+0LQ8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPSdoZWFkZXJfX3VzZXIgJHt1c2VyfSc+VTwvYnV0dG9uPlxyXG4gICAgICA8ZGl2IGNsYXNzPSdoZWFkZXJfX2xvZ291dCc+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz0naGVhZGVyX19sb2dvdXRfX2J0bic+0JLRi9C50YLQuDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGBcclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBIZWFkZXJBZnRlclJlbmRlcigpe1xyXG4gIFxyXG4gIGNvbnN0IGxvZ2luQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbl9fbG9nLWluJyksXHJcbiAgICB1c2VyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fdXNlcicpLFxyXG4gICAgbG9nb3V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbG9nb3V0X19idG4nKVxyXG4gICAgXHJcbiAgXHJcbiAgbG9naW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcclxuICAgICAgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKVxyXG5cclxuICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcclxuXHJcbiAgICBzZXRDbG9zZUJ1dHRvbigpXHJcblxyXG4gIH0pXHJcbiAgXHJcbiAgbG9nb3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgIGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL3Byb2ZpbGUvbG9nb3V0LycpXHJcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIH0pXHJcbiAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICBpZiAoJ3N1Y2Nlc3MnIGluIGRhdGEpIHtcclxuICAgICAgICBsZXQgbG9nb3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbG9nb3V0JylcclxuICAgICAgICBsb2dvdXQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJuYW1lJylcclxuXHJcbiAgICAgICAgY29uc3Qgbm9uYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbl9fbG9nLWluJyksXHJcbiAgICAgICAgICAgIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX191c2VyJylcclxuICAgICAgICB1c2VyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgICAgbm9uYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSlcclxuICAgIFxyXG4gIHVzZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgY29uc3QgdXNlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19sb2dvdXQnKVxyXG4gICAgdXNlck1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDbG9zZUJ1dHRvbigpe1xyXG4gIGxldCB5ID0gMFxyXG4gIGNvbnN0IGNsb3NlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpXHJcbiAgXHJcbiAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19sb2ctaW4uYWN0aXZlJykpe1xyXG4gICAgeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fbG9nLWluLmFjdGl2ZScpLm9mZnNldFRvcFxyXG4gICAgaWYoIHdpbmRvdy5pbm5lcldpZHRoIDwgNDgxKXtcclxuICAgICAgY29uc29sZS5sb2cod2luZG93LmlubmVyV2lkdGgpXHJcbiAgICAgIGNsb3Nlcy5zdHlsZS50b3AgPSBgJHt5LTUwfXB4YFxyXG4gICAgICBjbG9zZXMuc3R5bGUucmlnaHQgPSBgMThweGBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsb3Nlcy5zdHlsZS50b3AgPSBgJHt5LTUwfXB4YFxyXG4gICAgICBjbG9zZXMuc3R5bGUucmlnaHQgPSBgJHt5fXB4YFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIZWFkZXJCdXR0b24sIEhlYWRlckFmdGVyUmVuZGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9oZWFkZXJCdXR0b24nXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUG9wdXAoKSB7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICBgXHJcbiAgICA8ZGl2IGNsYXNzPVwicG9wdXBfX2NvbnRhaW5lclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2xvc2VcIj5cclxuICAgICAgICA8c3ZnIHdpZHRoPVwiNTBcIiBoZWlnaHQ9XCI1MFwiIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTQuNTgzIDE0LjU4MzRMMzUuNDE2MyAzNS40MTY3TTE0LjU4MyAzNS40MTY3TDM1LjQxNjMgMTQuNTgzNFwiIHN0cm9rZT1cImJsYWNrXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxyXG4gICAgICAgICAgPHBhdGggZD1cIk0xNC41ODMgMTQuNTgzNEwzNS40MTYzIDM1LjQxNjdNMTQuNTgzIDM1LjQxNjdMMzUuNDE2MyAxNC41ODM0XCIgc3Ryb2tlPVwiYmxhY2tcIiBzdHJva2Utb3BhY2l0eT1cIjAuMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgICR7bG9naW5Qb3B1cCgpfVxyXG4gICAgICAke3JlZ2lzdGVyUG9wdXAoKX1cclxuICAgICAgJHtyZWNvdmVyeVBvcHVwKCl9XHJcbiAgICAgICR7c2VuZFBvcHVwKCl9XHJcbiAgICA8L2Rpdj5cclxuICAgIFxyXG4gICAgYFxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBvcHVwQWZ0ZXJSZW5kZXIoKXtcclxuICBjb25zdCBsb2dpbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9faW5wdXRfbG9naW4nKSxcclxuICAgIHJlZ2lzdGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbnB1dF9yZWdpc3RlcicpLFxyXG4gICAgcmVzdG9yZVBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbnB1dF9yZXN0b3JlJyksXHJcbiAgICBzZXRMb2dpbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYnV0dG9uLWxvZ2luJyksXHJcbiAgICBzZXRSZWdpc3RlckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYnV0dG9uLXJlZ2lzdGVyJyksXHJcbiAgICBmb2dyb3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9yZ290LXBhc3N3b3JkX2J0bicpLFxyXG4gICAgcmV0dXJuTG9naW5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2J1dHRvbl9sb2dpbicpLFxyXG4gICAgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKSxcclxuICAgIHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJyksXHJcblxyXG4gICAgbG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2xvZy1pbicpLFxyXG4gICAgcmVnaXN0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3JlZ2lzdGVyJyksXHJcbiAgICByZWNvdmVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fcmVjb3ZlcnknKSxcclxuICAgIHNlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3NlbmQnKVxyXG5cclxuICAgIHNldFJlZ2lzdGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgbG9naW4uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgcmVnaXN0ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgc2V0Q2xvc2VCdXR0b24oKVxyXG4gICAgfSlcclxuXHJcbiAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4ge1xyXG4gICAgICBjb25zdCByZWdBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3JlZ2lzdGVyLmFjdGl2ZScpLFxyXG4gICAgICAgIGxvZ0FjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fbG9nLWluLmFjdGl2ZScpLFxyXG4gICAgICAgIHJlY0FjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fcmVjb3ZlcnkuYWN0aXZlJyksXHJcbiAgICAgICAgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxyXG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0bydcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG5cclxuICAgICAgICBpZiAoIWxvZ0FjdGl2ZSl7bG9naW4uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyl9XHJcbiAgICAgICAgaWYgKHJlY0FjdGl2ZSl7cmVjb3ZlcnkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyl9XHJcbiAgICAgICAgaWYgKHJlZ0FjdGl2ZSl7cmVnaXN0ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyl9XHJcblxyXG4gICAgfSlcclxuXHJcbiAgICBzZXRMb2dpbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGxvZ2luLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIHJlZ2lzdGVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIHNldENsb3NlQnV0dG9uKClcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuTG9naW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICBsb2dpbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICByZWNvdmVyeS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICBzZXRDbG9zZUJ1dHRvbigpXHJcbiAgICB9KVxyXG5cclxuICAgIGZvZ3JvdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGxvZ2luLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIHJlY292ZXJ5LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIHNldENsb3NlQnV0dG9uKClcclxuICAgIH0pXHJcblxyXG4gICAgcmVzdG9yZVBhc3N3b3JkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZm9ybXMucG9wdXBfX3JlY292ZXJ5LFxyXG4gICAgICAgIGVtYWlsID0gZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZVxyXG5cclxuICAgICAgY29uc3QgY3NyZnRva2VuID0gZ2V0Q29va2llKCdjc3JmdG9rZW4nKVxyXG4gICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe2VtYWlsOiBlbWFpbH0pXHJcblxyXG4gICAgICBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS92MS9wcm9maWxlL2VtYWlsLWNoZWNrL2AsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1DU1JGVG9rZW4nOiBjc3JmdG9rZW4sfSxcclxuICAgICAgICBib2R5XHJcbiAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDEpe1xyXG4gICAgICAgICAgcmVjb3ZlcnkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgICAgIHNlbmQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIHJlZ2lzdGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XHJcbiAgICAgICAgICAgIFxyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmZvcm1zLnBvcHVwX19yZWdpc3RlcixcclxuICAgICAgICB1c2VybmFtZSA9IGZvcm0uZWxlbWVudHMudXNlcm5hbWUudmFsdWUsXHJcbiAgICAgICAgZW1haWwgPSBmb3JtLmVsZW1lbnRzLmVtYWlsLnZhbHVlLFxyXG4gICAgICAgIHBhc3N3b3JkID0gZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZSxcclxuICAgICAgICBwYXNzd29yZDIgPSBmb3JtLmVsZW1lbnRzLnBhc3N3b3JkMi52YWx1ZSxcclxuICAgICAgICBhY2NlcHRfdGVybXMgPSBmb3JtLmVsZW1lbnRzLmFjY2VwdF90ZXJtcy52YWx1ZSxcclxuICAgICAgICByZWNhcHRjaGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FwdGNoYScpXHJcblxyXG5cclxuICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgICd1c2VybmFtZSc6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgJ2VtYWlsJzogZW1haWwsXHJcbiAgICAgICAgICAncGFzc3dvcmQnOiBwYXNzd29yZCxcclxuICAgICAgICAgICdwYXNzd29yZDInOiBwYXNzd29yZDIsXHJcbiAgICAgICAgICAnYWNjZXB0X3Rlcm1zJzogYWNjZXB0X3Rlcm1zLFxyXG4gICAgICAgICAgJ3JlY2FwdGNoYSc6IHJlY2FwdGNoYVxyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgZiA9IGZhbHNlXHJcblxyXG4gICAgICBhdXRoKGRhdGEsIGYpXHJcbiAgICB9KVxyXG5cclxuICAgIGxvZ2luQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5mb3Jtcy5wb3B1cF9fbG9naW5cclxuICAgICAgY29uc3QgdXNlcm5hbWUgPSBmb3JtLmVsZW1lbnRzLnVzZXJuYW1lLnZhbHVlXHJcbiAgICAgIGNvbnN0IHBhc3N3b3JkID0gZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZVxyXG4gICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgJ3VzZXJuYW1lJzogdXNlcm5hbWUsXHJcbiAgICAgICAgICAncGFzc3dvcmQnOiBwYXNzd29yZCxcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IGYgPSB0cnVlXHJcblxyXG4gICAgICBhdXRoKGRhdGEsIGYpXHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gYXV0aChkYXRhLCBmKXtcclxuICBsZXQgdXJsID0gbnVsbFxyXG4gICFmID8gdXJsID0gYGh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdjEvcHJvZmlsZS9yZWdpc3Rlci9gOiB1cmwgPSBgaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS92MS9wcm9maWxlL2xvZ2luL2BcclxuICBjb25zdCBjc3JmdG9rZW4gPSBnZXRDb29raWUoJ2NzcmZ0b2tlbicpXHJcbiAgZGF0YVsnY3NyZnRva2VuJ10gPSBjc3JmdG9rZW5cclxuICBhc3luYyBmdW5jdGlvbiBwb3N0RGF0YSh1cmwsIGRhdGEsIGYpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgJ1gtQ1NSRlRva2VuJzogY3NyZnRva2VuLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgIH0pO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDEpIHtcclxuICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKSxcclxuICAgICAgICBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLFxyXG4gICAgICAgIGxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19sb2ctaW4nKSxcclxuICAgICAgICByZWdpc3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fcmVnaXN0ZXInKVxyXG4gICAgXHJcbiAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIGxvZ2luLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIHJlZ2lzdGVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcblxyXG4gICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nXHJcblxyXG4gICAgICByZXR1cm4gbG9jYXRpb24uaHJlZiA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL3Byb2ZpbGUvZW1haWwtY29uZmlybWF0aW9uLXNlbnQvJ1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICB9XHJcbiAgXHJcbiAgcG9zdERhdGEodXJsLCBkYXRhLCBmKS50aGVuKChkYXRhKSA9PiB7XHJcblxyXG4gICAgaWYgKCdzdWNjZXNzJyBpbiBkYXRhKSB7XHJcbiAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJylcclxuICAgICAgcG9wdXAuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuXHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VybmFtZScsICdKb2hhbicpXHJcblxyXG4gICAgICBjb25zdCBoZWFkZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVhZGVyLWJ1dHRvbicpXHJcbiAgICAgIEhlYWRlckJ1dHRvbigpLnRoZW4oKGh0bWwpID0+IGhlYWRlckJ1dHRvbi5pbm5lckhUTUwgPSBodG1sKS50aGVuKCgpID0+IEhlYWRlckFmdGVyUmVuZGVyKCkpXHJcbiAgICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJylcclxuICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcclxuICAgICAgc2NyaXB0LnNyYyA9ICdodHRwOi8vd3d3Lmdvb2dsZS5jb20vcmVjYXB0Y2hhL2FwaS5qcydcclxuICAgICAgaGVhZC5hcHBlbmQoc2NyaXB0KVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChmKXtcclxuICAgICAgICBjb25zdCBsb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fbG9nLWluJylcclxuICAgICAgICBsb2dpbi5pbm5lckhUTUwgPSBsb2dpblBvcHVwKGRhdGEpXHJcbiAgICAgICAgUG9wdXBBZnRlclJlbmRlcigpXHJcbiAgICAgICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKVxyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXHJcbiAgICAgICAgc2NyaXB0LnNyYyA9ICdodHRwOi8vd3d3Lmdvb2dsZS5jb20vcmVjYXB0Y2hhL2FwaS5qcydcclxuICAgICAgICBoZWFkLmFwcGVuZChzY3JpcHQpXHJcbiAgICAgICAgXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGNvbnN0IHJlZ2lzdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19yZWdpc3RlcicpXHJcbiAgICAgICAgcmVnaXN0ZXIuaW5uZXJIVE1MID0gcmVnaXN0ZXJQb3B1cChkYXRhKVxyXG4gICAgICAgIFBvcHVwQWZ0ZXJSZW5kZXIoKVxyXG4gICAgICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJylcclxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxyXG4gICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cDovL3d3dy5nb29nbGUuY29tL3JlY2FwdGNoYS9hcGkuanMnXHJcbiAgICAgICAgaGVhZC5hcHBlbmQoc2NyaXB0KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvb2tpZShuYW1lKSB7XHJcbiAgbGV0IG1hdGNoZXMgPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cChcclxuICAgIFwiKD86Xnw7IClcIiArIG5hbWUucmVwbGFjZSgvKFtcXC4kPyp8e31cXChcXClcXFtcXF1cXFxcXFwvXFwrXl0pL2csICdcXFxcJDEnKSArIFwiPShbXjtdKilcIlxyXG4gICkpO1xyXG4gIHJldHVybiBtYXRjaGVzID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoZXNbMV0pIDogdW5kZWZpbmVkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDbG9zZUJ1dHRvbigpe1xyXG4gIGxldCB5ID0gMFxyXG4gIGNvbnN0IGNsb3NlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpXHJcbiAgXHJcbiAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19sb2ctaW4uYWN0aXZlJykpe1xyXG4gICAgeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fbG9nLWluLmFjdGl2ZScpLm9mZnNldFRvcFxyXG4gICAgaWYoIHdpbmRvdy5pbm5lcldpZHRoIDwgNDgxKXtcclxuICAgICAgXHJcbiAgICAgIGNsb3Nlcy5zdHlsZS50b3AgPSBgJHt5LTUwfXB4YFxyXG4gICAgICBjbG9zZXMuc3R5bGUucmlnaHQgPSBgMThweGBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsb3Nlcy5zdHlsZS50b3AgPSBgJHt5LTUwfXB4YFxyXG4gICAgICBjbG9zZXMuc3R5bGUucmlnaHQgPSBgJHt5fXB4YFxyXG4gICAgfVxyXG4gIH1lbHNlIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fcmVnaXN0ZXIuYWN0aXZlJykpe1xyXG4gICAgeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fcmVnaXN0ZXIuYWN0aXZlJykub2Zmc2V0VG9wXHJcbiAgICBpZiggd2luZG93LmlubmVyV2lkdGggPCA0ODEpe1xyXG4gICAgICBjbG9zZXMuc3R5bGUudG9wID0gYCR7eS01MH1weGBcclxuICAgICAgY2xvc2VzLnN0eWxlLnJpZ2h0ID0gYDE4cHhgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbG9zZXMuc3R5bGUudG9wID0gYCR7eS01MH1weGBcclxuICAgICAgY2xvc2VzLnN0eWxlLnJpZ2h0ID0gYCR7eX1weGBcclxuICAgIH1cclxuICB9ZWxzZSBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3JlY292ZXJ5LmFjdGl2ZScpKXtcclxuICAgIHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3JlY292ZXJ5LmFjdGl2ZScpLm9mZnNldFRvcFxyXG4gICAgaWYoIHdpbmRvdy5pbm5lcldpZHRoIDwgNDgxKXtcclxuICAgICAgY2xvc2VzLnN0eWxlLnRvcCA9IGAke3ktNTB9cHhgXHJcbiAgICAgIGNsb3Nlcy5zdHlsZS5yaWdodCA9IGAxOHB4YFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xvc2VzLnN0eWxlLnRvcCA9IGAke3ktNTB9cHhgXHJcbiAgICAgIGNsb3Nlcy5zdHlsZS5yaWdodCA9IGAke3l9cHhgXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGxvZ2luUG9wdXAoZGF0YT1udWxsKSB7XHJcbiAgbGV0IHVzZXJuYW1lID0gbnVsbCxcclxuICAgIHBhc3N3b3JkID0gbnVsbFxyXG4gIGlmIChkYXRhKSB7XHJcbiAgICBpZiAoJ3VzZXJuYW1lJyBpbiBkYXRhKXt1c2VybmFtZSA9IGRhdGEudXNlcm5hbWV9XHJcbiAgICBpZiAoJ3Bhc3N3b3JkJyBpbiBkYXRhKXtwYXNzd29yZCA9IGRhdGEucGFzc3dvcmR9XHJcbiAgfVxyXG4gIFxyXG4gIGlmICh1c2VybmFtZSB8fCBwYXNzd29yZCl7ZGF0YSA9IG51bGx9XHJcbiAgcmV0dXJuIChcclxuICAgIGBcclxuICAgIDxmb3JtIGNsYXNzPVwicG9wdXBfX2xvZy1pbiBhY3RpdmVcIiBuYW1lPVwicG9wdXBfX2xvZ2luXCI+XHJcbiAgICAgIDxsYWJlbCBjbGFzcz0nZm9ybS1sYWJlbCc+PGlucHV0IGNsYXNzPSdwb3B1cF9faW5wdXQnIG5hbWU9XCJ1c2VybmFtZVwiIGlkPVwidXNlcm5hbWVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwi0JjQvNGPINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1wiIC8+XHJcbiAgICAgICR7dXNlcm5hbWU/IGA8ZGl2IGNsYXNzPSdmb3JtLWVycm9yIGFjdGl2ZSc+PGRpdj48cCBjbGFzcz0nZm9ybS1lcnJvcl9tZXNzYWdlJz4ke3VzZXJuYW1lfTwvcD48L2Rpdj48L2Rpdj5gIDogJyd9PC9sYWJlbD5cclxuICAgICAgPGxhYmVsIGNsYXNzPSdmb3JtLWxhYmVsJz48aW5wdXQgY2xhc3M9J3BvcHVwX19pbnB1dCcgbmFtZT1cInBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCLQn9Cw0YDQvtC70YxcIiAvPlxyXG4gICAgICAke3Bhc3N3b3JkPyBgPGRpdiBjbGFzcz0nZm9ybS1lcnJvciBhY3RpdmUnPjxkaXY+PHAgY2xhc3M9J2Zvcm0tZXJyb3JfbWVzc2FnZSc+JHtwYXNzd29yZH08L3A+PC9kaXY+PC9kaXY+YCA6ICcnfTwvbGFiZWw+XHJcbiAgICAgICR7ZGF0YSA/IGA8ZGl2IGNsYXNzPVwiY29tbW9uLWVycm9yXCI+JHtkYXRhfTwvZGl2PmA6IGA8ZGl2IGNsYXNzPVwiY29tbW9uLWVycm9yXCI+PC9kaXY+YH1cclxuICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cItCS0L7QudGC0LhcIiBjbGFzcz1cInBvcHVwX19pbnB1dF9ncmVlbiBwb3B1cF9faW5wdXRfbG9naW5cIi8+XHJcbiAgICAgIDxwIGNsYXNzPVwiZm9yZ290LXBhc3N3b3JkXCI+0JfQsNCx0YvQu9C4INC/0LDRgNC+0LvRjD8gPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPVwiZm9yZ290LXBhc3N3b3JkX2J0blwiPtCS0L7RgdGB0YLQsNC90L7QstC40YLRjCDQv9Cw0YDQvtC70Yw8L2J1dHRvbj48L3A+XHJcbiAgICAgIDxwIGNsYXNzPVwibG9naW4tdXNpbmdcIj7QktC+0LnRgtC4INGBINC/0L7QvNC+0YnRjNGOPC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicG9wdXBfbGlua3NcIj5cclxuICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJwb3B1cF9saW5rXCI+XHJcbiAgICAgICAgICA8c3ZnIHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCIzMFwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgICAgICAgPGcgY2xpcFBhdGg9XCJ1cmwoI2NsaXAwXzkyNF8xMjQ3KVwiPlxyXG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOC4xOTgzNSAyOS4xOTQ2QzcuNTc4NTEgMjguOTkzMyA2Ljk1ODY4IDI4LjU5MDYgNi41NDU0NSAyNy43ODUyQzYuMTMyMjMgMjcuMzgyNSA1LjcxOTAxIDI2Ljc3ODUgNS4wOTkxNyAyNS45NzMyQzQuMjcyNzMgMjQuNzY1MSAzLjQ0NjI4IDIzLjE1NDQgMi44MjY0NSAyMS41NDM2QzIuMjA2NjEgMTkuNzMxNSAyIDE3LjkxOTUgMiAxNi4xMDc0QzIgMTQuMDk0IDIuNDEzMjIgMTIuNDgzMiAzLjIzOTY3IDExLjA3MzhDMy44NTk1IDkuODY1NzcgNC44OTI1NiA5LjA2MDQgNS45MjU2MiA4LjI1NTAzQzYuOTU4NjggNy42NTEwMSA4LjE5ODM1IDcuMjQ4MzIgOS40MzgwMSA3LjI0ODMyQzkuODUxMjQgNy4yNDgzMiAxMC4yNjQ1IDcuMjQ4MzIgMTAuODg0MyA3LjQ0OTY2QzExLjI5NzUgNy40NDk2NiAxMS43MTA3IDcuNjUxMDEgMTIuMzMwNiA3Ljg1MjM1QzEyLjk1MDQgOC4wNTM2OSAxMy4zNjM2IDguMjU1MDMgMTMuNTcwMiA4LjI1NTAzQzEzLjk4MzUgOC40NTYzOCAxNC4zOTY3IDguNDU2MzggMTQuNjAzMyA4LjQ1NjM4QzE0LjgwOTkgOC40NTYzOCAxNS4wMTY1IDguNDU2MzggMTUuNDI5OCA4LjI1NTAzQzE1LjYzNjQgOC4yNTUwMyAxNi4wNDk2IDguMDUzNjkgMTYuNDYyOCA3Ljg1MjM1QzE2Ljg3NiA3LjY1MTAxIDE3LjI4OTMgNy40NDk2NiAxNy43MDI1IDcuNDQ5NjZDMTguMTE1NyA3LjQ0OTY2IDE4LjUyODkgNy4yNDgzMiAxOC45NDIxIDcuMjQ4MzJDMTkuMzU1NCA3LjI0ODMyIDE5Ljk3NTIgNy4wNDY5OCAyMC4zODg0IDcuMjQ4MzJDMjEuMjE0OSA3LjI0ODMyIDIyLjA0MTMgNy40NDk2NiAyMi44Njc4IDcuODUyMzVDMjQuMTA3NCA4LjI1NTAzIDI1LjE0MDUgOS4yNjE3NSAyNS45NjY5IDEwLjI2ODVDMjUuNzYwMyAxMC4yNjg1IDI1LjM0NzEgMTAuNDY5OCAyNS4xNDA1IDEwLjg3MjVDMjQuNTIwNyAxMS40NzY1IDIzLjkwMDggMTIuMDgwNSAyMy40ODc2IDEyLjY4NDZDMjMuMDc0NCAxMy42OTEzIDIyLjY2MTIgMTQuNjk4IDIyLjY2MTIgMTUuOTA2QzIyLjY2MTIgMTcuMzE1NCAyMy4wNzQ0IDE4LjUyMzUgMjMuNjk0MiAxOS41MzAyQzI0LjEwNzQgMjAuMzM1NiAyNC45MzM5IDIwLjkzOTYgMjUuNTUzNyAyMS4zNDIzQzI2LjE3MzUgMjEuNTQzNiAyNi41ODY4IDIxLjc0NSAyNi43OTM0IDIxLjk0NjNDMjYuNzkzNCAyMi4zNDkgMjYuNTg2OCAyMi45NTMgMjYuMzgwMiAyMy4xNTQ0QzI1Ljk2NjkgMjQuMzYyNCAyNS4zNDcxIDI1LjE2NzggMjQuNzI3MyAyNi4xNzQ1QzI0LjEwNzQgMjYuOTc5OSAyMy42OTQyIDI3LjU4MzkgMjMuNDg3NiAyNy43ODUyQzIyLjg2NzggMjguMzg5MyAyMi40NTQ1IDI4Ljk5MzMgMjEuODM0NyAyOS4xOTQ2QzIxLjQyMTUgMjkuNTk3MyAyMC44MDE2IDI5Ljc5ODcgMTkuOTc1MiAyOS43OTg3QzE5LjU2MiAyOS43OTg3IDE5LjE0ODggMjkuNzk4NyAxOC43MzU1IDI5LjU5NzNDMTguNTI4OSAyOS41OTczIDE4LjExNTcgMjkuMzk2IDE3LjcwMjUgMjkuMTk0NkMxNy4wODI2IDI4Ljk5MzMgMTYuODc2IDI4Ljc5MTkgMTYuNDYyOCAyOC43OTE5QzE2LjA0OTYgMjguNTkwNiAxNS40Mjk4IDI4LjU5MDYgMTUuMDE2NSAyOC41OTA2QzE0LjYwMzMgMjguNTkwNiAxMy45ODM1IDI4LjU5MDYgMTMuNTcwMiAyOC43OTE5QzEzLjE1NyAyOC43OTE5IDEyLjc0MzggMjguOTkzMyAxMi4zMzA2IDI5LjE5NDZDMTEuNzEwNyAyOS4zOTYgMTEuNTA0MSAyOS41OTczIDExLjI5NzUgMjkuNTk3M0MxMC44ODQzIDI5Ljc5ODcgMTAuNDcxMSAyOS43OTg3IDEwLjA1NzggMjkuNzk4N0M5LjQzODAyIDI5Ljc5ODcgOC44MTgxOCAyOS41OTczIDguMTk4MzUgMjkuMTk0NlpNMTYuODc2IDYuMjQxNjFDMTYuMDQ5NiA2LjY0NDI5IDE1LjIyMzEgNi44NDU2NCAxNC4zOTY3IDYuODQ1NjRDMTQuMTkwMSA2LjA0MDI3IDE0LjM5NjcgNS4yMzQ5IDE0LjgwOTkgNC4yMjgxOUMxNS4yMjMxIDMuNDIyODIgMTUuNDI5OCAyLjgxODc5IDE2LjA0OTYgMi4yMTQ3NkMxNi42Njk0IDEuNjEwNzQgMTcuMjg5MyAxLjAwNjcxIDE4LjExNTcgMC42MDQwMjdDMTguOTQyMSAwLjIwMTM0MyAxOS43Njg2IDAgMjAuNTk1IDBDMjAuNTk1IDAuODA1MzY5IDIwLjM4ODQgMS42MTA3NCAyMC4xODE4IDIuNjE3NDVDMTkuOTc1MiAzLjQyMjgyIDE5LjM1NTQgNC4wMjY4NSAxOC45NDIxIDQuNjMwODdDMTguMzIyMyA1LjQzNjI0IDE3LjcwMjUgNS44Mzg5MyAxNi44NzYgNi4yNDE2MVpcIiBmaWxsPVwiYmxhY2tcIi8+XHJcbiAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgPGRlZnM+XHJcbiAgICAgICAgICAgICAgPGNsaXBQYXRoIGlkPVwiY2xpcDBfOTI0XzEyNDdcIj5cclxuICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiMjVcIiBoZWlnaHQ9XCIzMFwiIGZpbGw9XCJ3aGl0ZVwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgyKVwiLz5cclxuICAgICAgICAgICAgICA8L2NsaXBQYXRoPlxyXG4gICAgICAgICAgICA8L2RlZnM+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwicG9wdXBfbGlua1wiPlxyXG4gICAgICAgICAgPHN2ZyB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgICAgICAgIDxnIGNsaXBQYXRoPVwidXJsKCNjbGlwMF85MjRfMTI0MSlcIj5cclxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTMwIDE1QzMwIDYuNzE1NyAyMy4yODQzIC0yLjY3MDI5ZS0wNSAxNSAtMi42NzAyOWUtMDVDNi43MTU3MiAtMi42NzAyOWUtMDUgMCA2LjcxNTcgMCAxNUMwIDIyLjQ4NjkgNS40ODUyOCAyOC42OTI1IDEyLjY1NjIgMjkuODE3N1YxOS4zMzU5SDguODQ3NjZWMTVIMTIuNjU2MlYxMS42OTUzQzEyLjY1NjIgNy45MzU5MSAxNC44OTU2IDUuODU5MzUgMTguMzIyIDUuODU5MzVDMTkuOTYzMSA1Ljg1OTM1IDIxLjY3OTcgNi4xNTIzMiAyMS42Nzk3IDYuMTUyMzJWOS44NDM3MkgxOS43ODgyQzE3LjkyNDkgOS44NDM3MiAxNy4zNDM4IDExIDE3LjM0MzggMTIuMTg2MlYxNUgyMS41MDM5TDIwLjgzODkgMTkuMzM1OUgxNy4zNDM4VjI5LjgxNzdDMjQuNTE0NyAyOC42OTI1IDMwIDIyLjQ4NjkgMzAgMTVaXCIgZmlsbD1cIndoaXRlXCIvPlxyXG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjAuODM4OSAxOS4zMzU5TDIxLjUwMzkgMTVIMTcuMzQzOFYxMi4xODYyQzE3LjM0MzggMTEgMTcuOTI0OSA5Ljg0Mzc1IDE5Ljc4ODIgOS44NDM3NUgyMS42Nzk3VjYuMTUyMzRDMjEuNjc5NyA2LjE1MjM0IDE5Ljk2MzEgNS44NTkzOCAxOC4zMjIgNS44NTkzOEMxNC44OTU2IDUuODU5MzggMTIuNjU2MyA3LjkzNTk0IDEyLjY1NjMgMTEuNjk1M1YxNUg4Ljg0NzY2VjE5LjMzNTlIMTIuNjU2M1YyOS44MTc4QzEzLjQxOTkgMjkuOTM3NiAxNC4yMDI3IDMwIDE1IDMwQzE1Ljc5NzMgMzAgMTYuNTgwMSAyOS45Mzc2IDE3LjM0MzggMjkuODE3OFYxOS4zMzU5SDIwLjgzODlaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG4gICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgIDxkZWZzPlxyXG4gICAgICAgICAgICAgIDxjbGlwUGF0aCBpZD1cImNsaXAwXzkyNF8xMjQxXCI+XHJcbiAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiBmaWxsPVwid2hpdGVcIi8+XHJcbiAgICAgICAgICAgICAgPC9jbGlwUGF0aD5cclxuICAgICAgICAgICAgPC9kZWZzPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cInBvcHVwX2xpbmtcIj5cclxuICAgICAgICAgIDxzdmcgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTI4LjIgMTUuMzEyNUMyOC4yIDE0LjMzNzUgMjguMTEyNSAxMy40IDI3Ljk1IDEyLjVIMTVWMTcuODE4OEgyMi40QzIyLjA4MTMgMTkuNTM3NSAyMS4xMTI1IDIwLjk5MzggMTkuNjU2MyAyMS45Njg4VjI1LjQxODdIMjQuMUMyNi43IDIzLjAyNSAyOC4yIDE5LjUgMjguMiAxNS4zMTI1WlwiIGZpbGw9XCJibGFja1wiLz5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk0xNS4wMDA0IDI4Ljc1QzE4LjcxMjkgMjguNzUgMjEuODI1NCAyNy41MTg4IDI0LjEwMDQgMjUuNDE4OEwxOS42NTY2IDIxLjk2ODhDMTguNDI1NCAyMi43OTM4IDE2Ljg1MDQgMjMuMjgxMyAxNS4wMDA0IDIzLjI4MTNDMTEuNDE5MSAyMy4yODEzIDguMzg3ODkgMjAuODYyNSA3LjMwNjY0IDE3LjYxMjVIMi43MTI4OVYyMS4xNzVDNC45NzUzOSAyNS42Njg4IDkuNjI1MzkgMjguNzUgMTUuMDAwNCAyOC43NVpcIiBmaWxsPVwiYmxhY2tcIi8+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNNy4zMDYyNSAxNy42MTI1QzcuMDMxMjUgMTYuNzg3NSA2Ljg3NSAxNS45MDYyIDYuODc1IDE1QzYuODc1IDE0LjA5MzcgNy4wMzEyNSAxMy4yMTI1IDcuMzA2MjUgMTIuMzg3NVY4LjgyNDk1SDIuNzEyNUMxLjc1IDEwLjc0MSAxLjI0OTE1IDEyLjg1NTcgMS4yNSAxNUMxLjI1IDE3LjIxODcgMS43ODEyNSAxOS4zMTg3IDIuNzEyNSAyMS4xNzVMNy4zMDYyNSAxNy42MTI1WlwiIGZpbGw9XCJibGFja1wiLz5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk0xNS4wMDA0IDYuNzE4NzVDMTcuMDE5MSA2LjcxODc1IDE4LjgzMTYgNy40MTI1IDIwLjI1NjYgOC43NzVMMjQuMjAwNCA0LjgzMTI1QzIxLjgxOTEgMi42MTI1IDE4LjcwNjYgMS4yNSAxNS4wMDA0IDEuMjVDOS42MjUzOSAxLjI1IDQuOTc1MzkgNC4zMzEyNSAyLjcxMjg5IDguODI1TDcuMzA2NjQgMTIuMzg3NUM4LjM4Nzg5IDkuMTM3NSAxMS40MTkxIDYuNzE4NzUgMTUuMDAwNCA2LjcxODc1WlwiIGZpbGw9XCJibGFja1wiLz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxwIGNsYXNzPVwibm8tYWNjb3VudC15ZXRcIj7QndC10YIg0LDQutC60LDRg9C90YLQsD88L3A+XHJcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicG9wdXBfX2J1dHRvbiBwb3B1cF9fYnV0dG9uLXJlZ2lzdGVyXCI+0JfQsNGA0LXQs9C40YHRgtGA0LjRgNC+0LLQsNGC0YzRgdGPPC9idXR0b24+XHJcbiAgICA8L2Zvcm0+XHJcblxyXG4gICAgYFxyXG4gIClcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJQb3B1cChkYXRhPW51bGwpIHtcclxuXHJcbiAgbGV0IHVzZXJuYW1lID0gbnVsbCxcclxuICAgIGVtYWlsID0gbnVsbCxcclxuICAgIHBhc3N3b3JkID0gbnVsbCxcclxuICAgIHBhc3N3b3JkMiA9IG51bGwsXHJcbiAgICByZWNhcHRjaGEgPSBudWxsXHJcblxyXG4gIGlmIChkYXRhKSB7XHJcbiAgICBpZiAoJ3VzZXJuYW1lJyBpbiBkYXRhKXt1c2VybmFtZSA9IGRhdGEudXNlcm5hbWV9XHJcbiAgICBpZiAoJ2VtYWlsJyBpbiBkYXRhKXtlbWFpbCA9IGRhdGEuZW1haWx9XHJcbiAgICBpZiAoJ3Bhc3N3b3JkJyBpbiBkYXRhKXtwYXNzd29yZCA9IGRhdGEucGFzc3dvcmR9XHJcbiAgICBpZiAoJ3Bhc3N3b3JkMicgaW4gZGF0YSl7cGFzc3dvcmQyID0gZGF0YS5wYXNzd29yZDJ9XHJcbiAgICBpZiAoJ3JlY2FwdGNoYScgaW4gZGF0YSl7cmVjYXB0Y2hhID0gJ9Cd0LXQvtCx0YXQsNC00LjQvNCwINCy0LXRgNC40YTQuNC60LDRhtC40Y8nfVxyXG4gIH1cclxuXHJcbiAgaWYgKHVzZXJuYW1lIHx8IHBhc3N3b3JkIHx8IHBhc3N3b3JkMiB8fCBlbWFpbCl7ZGF0YSA9IG51bGx9XHJcbiAgaWYocmVjYXB0Y2hhKXtkYXRhID0gcmVjYXB0Y2hhfVxyXG4gIFxyXG4gIHJldHVybiAoXHJcbiAgICBgXHJcbiAgICA8Zm9ybSBjbGFzcz1cInBvcHVwX19yZWdpc3RlclwiIG5hbWU9XCJwb3B1cF9fcmVnaXN0ZXJcIj5cclxuICAgICAgPGxhYmVsIGNsYXNzPSdmb3JtLWxhYmVsJz48aW5wdXQgY2xhc3M9J3BvcHVwX19pbnB1dCcgbmFtZT1cInVzZXJuYW1lXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cItCY0LzRjyDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cIiAvPlxyXG4gICAgICAke3VzZXJuYW1lPyBgPGRpdiBjbGFzcz0nZm9ybS1lcnJvciBhY3RpdmUnPjxkaXY+PHAgY2xhc3M9J2Zvcm0tZXJyb3JfbWVzc2FnZSc+JHt1c2VybmFtZX08L3A+PC9kaXY+PC9kaXY+YCA6ICcnfTwvbGFiZWw+XHJcbiAgICAgIDxsYWJlbCBjbGFzcz0nZm9ybS1sYWJlbCc+PGlucHV0IGNsYXNzPSdwb3B1cF9faW5wdXQnIG5hbWU9XCJlbWFpbFwiIHR5cGU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwi0K3Qu9C10LrRgtGA0L7QvdC90LDRjyDQv9C+0YfRgtCwXCIgLz5cclxuICAgICAgJHtlbWFpbD8gYDxkaXYgY2xhc3M9J2Zvcm0tZXJyb3IgYWN0aXZlJz48ZGl2PjxwIGNsYXNzPSdmb3JtLWVycm9yX21lc3NhZ2UnPiR7ZW1haWx9PC9wPjwvZGl2PjwvZGl2PmAgOiAnJ308L2xhYmVsPlxyXG4gICAgICA8bGFiZWwgY2xhc3M9J2Zvcm0tbGFiZWwnPjxpbnB1dCBjbGFzcz0ncG9wdXBfX2lucHV0JyBuYW1lPVwicGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cItCf0LDRgNC+0LvRjFwiIC8+XHJcbiAgICAgICR7cGFzc3dvcmQ/IGA8ZGl2IGNsYXNzPSdmb3JtLWVycm9yIGFjdGl2ZSc+PGRpdj48cCBjbGFzcz0nZm9ybS1lcnJvcl9tZXNzYWdlJz4ke3Bhc3N3b3JkfTwvcD48L2Rpdj48L2Rpdj5gIDogJyd9PC9sYWJlbD5cclxuICAgICAgPGxhYmVsIGNsYXNzPSdmb3JtLWxhYmVsJz48aW5wdXQgY2xhc3M9J3BvcHVwX19pbnB1dCcgbmFtZT1cInBhc3N3b3JkMlwiIHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPSfQn9C+0LLRgtC+0YDQuNGC0Ywg0L/QsNGA0L7Qu9GMJyAvPlxyXG4gICAgICAke3Bhc3N3b3JkMj8gYDxkaXYgY2xhc3M9J2Zvcm0tZXJyb3IgYWN0aXZlJz48ZGl2PjxwIGNsYXNzPSdmb3JtLWVycm9yX21lc3NhZ2UnPiR7cGFzc3dvcmQyfTwvcD48L2Rpdj48L2Rpdj5gIDogJyd9PC9sYWJlbD5cclxuICAgICAgJHtkYXRhID8gYDxkaXYgY2xhc3M9XCJjb21tb24tZXJyb3JcIj4ke2RhdGF9PC9kaXY+YDogYDxkaXYgY2xhc3M9XCJjb21tb24tZXJyb3JcIj48L2Rpdj5gfVxyXG4gICAgICA8ZGl2IGNsYXNzPVwicG9wdXBfX2NoZWNrXCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJhY2NlcHRfdGVybXNcIiBpZD1cImFjY2VwdF90ZXJtc1wiID48L2lucHV0PlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwicG9wdXBfX2NoZWNrX3RleHRcIj7QryDQv9GA0LjQvdC40LzQsNGOINGD0YHQu9C+0LLQuNGPIDxhPtC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQvtCz0L4g0YHQvtCz0LvQsNGI0LXQvdC40Y88L2E+PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBvcHVwLXJlY2FwdGNoYVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnLXJlY2FwdGNoYVwiIGRhdGEtc2l0ZWtleT1cIjZMY1E0VmdwQUFBQUFJQjRfdnFQR2llenpCTWVrOW4zMGdVcVhGM1FcIiBkYXRhLWNhbGxiYWNrPSdnZXRSZWNhcHRjaGEnPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cItCX0LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDRgtGM0YHRj1wiIGNsYXNzPVwicG9wdXBfX2lucHV0X2dyZWVuIHBvcHVwX19pbnB1dF9yZWdpc3RlclwiPjwvaW5wdXQ+XHJcbiAgICAgIDxwIGNsYXNzPVwibG9naW4tdXNpbmdcIj7Ql9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y8g0YEg0L/QvtC80L7RidGM0Y48L3A+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwb3B1cF9saW5rc1wiPlxyXG4gICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cInBvcHVwX2xpbmtcIj5cclxuICAgICAgICAgIDxzdmcgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICAgICAgICA8ZyBjbGlwUGF0aD1cInVybCgjY2xpcDBfOTI0XzEyNDcpXCI+XHJcbiAgICAgICAgICAgICAgPHBhdGggZD1cIk04LjE5ODM1IDI5LjE5NDZDNy41Nzg1MSAyOC45OTMzIDYuOTU4NjggMjguNTkwNiA2LjU0NTQ1IDI3Ljc4NTJDNi4xMzIyMyAyNy4zODI1IDUuNzE5MDEgMjYuNzc4NSA1LjA5OTE3IDI1Ljk3MzJDNC4yNzI3MyAyNC43NjUxIDMuNDQ2MjggMjMuMTU0NCAyLjgyNjQ1IDIxLjU0MzZDMi4yMDY2MSAxOS43MzE1IDIgMTcuOTE5NSAyIDE2LjEwNzRDMiAxNC4wOTQgMi40MTMyMiAxMi40ODMyIDMuMjM5NjcgMTEuMDczOEMzLjg1OTUgOS44NjU3NyA0Ljg5MjU2IDkuMDYwNCA1LjkyNTYyIDguMjU1MDNDNi45NTg2OCA3LjY1MTAxIDguMTk4MzUgNy4yNDgzMiA5LjQzODAxIDcuMjQ4MzJDOS44NTEyNCA3LjI0ODMyIDEwLjI2NDUgNy4yNDgzMiAxMC44ODQzIDcuNDQ5NjZDMTEuMjk3NSA3LjQ0OTY2IDExLjcxMDcgNy42NTEwMSAxMi4zMzA2IDcuODUyMzVDMTIuOTUwNCA4LjA1MzY5IDEzLjM2MzYgOC4yNTUwMyAxMy41NzAyIDguMjU1MDNDMTMuOTgzNSA4LjQ1NjM4IDE0LjM5NjcgOC40NTYzOCAxNC42MDMzIDguNDU2MzhDMTQuODA5OSA4LjQ1NjM4IDE1LjAxNjUgOC40NTYzOCAxNS40Mjk4IDguMjU1MDNDMTUuNjM2NCA4LjI1NTAzIDE2LjA0OTYgOC4wNTM2OSAxNi40NjI4IDcuODUyMzVDMTYuODc2IDcuNjUxMDEgMTcuMjg5MyA3LjQ0OTY2IDE3LjcwMjUgNy40NDk2NkMxOC4xMTU3IDcuNDQ5NjYgMTguNTI4OSA3LjI0ODMyIDE4Ljk0MjEgNy4yNDgzMkMxOS4zNTU0IDcuMjQ4MzIgMTkuOTc1MiA3LjA0Njk4IDIwLjM4ODQgNy4yNDgzMkMyMS4yMTQ5IDcuMjQ4MzIgMjIuMDQxMyA3LjQ0OTY2IDIyLjg2NzggNy44NTIzNUMyNC4xMDc0IDguMjU1MDMgMjUuMTQwNSA5LjI2MTc1IDI1Ljk2NjkgMTAuMjY4NUMyNS43NjAzIDEwLjI2ODUgMjUuMzQ3MSAxMC40Njk4IDI1LjE0MDUgMTAuODcyNUMyNC41MjA3IDExLjQ3NjUgMjMuOTAwOCAxMi4wODA1IDIzLjQ4NzYgMTIuNjg0NkMyMy4wNzQ0IDEzLjY5MTMgMjIuNjYxMiAxNC42OTggMjIuNjYxMiAxNS45MDZDMjIuNjYxMiAxNy4zMTU0IDIzLjA3NDQgMTguNTIzNSAyMy42OTQyIDE5LjUzMDJDMjQuMTA3NCAyMC4zMzU2IDI0LjkzMzkgMjAuOTM5NiAyNS41NTM3IDIxLjM0MjNDMjYuMTczNSAyMS41NDM2IDI2LjU4NjggMjEuNzQ1IDI2Ljc5MzQgMjEuOTQ2M0MyNi43OTM0IDIyLjM0OSAyNi41ODY4IDIyLjk1MyAyNi4zODAyIDIzLjE1NDRDMjUuOTY2OSAyNC4zNjI0IDI1LjM0NzEgMjUuMTY3OCAyNC43MjczIDI2LjE3NDVDMjQuMTA3NCAyNi45Nzk5IDIzLjY5NDIgMjcuNTgzOSAyMy40ODc2IDI3Ljc4NTJDMjIuODY3OCAyOC4zODkzIDIyLjQ1NDUgMjguOTkzMyAyMS44MzQ3IDI5LjE5NDZDMjEuNDIxNSAyOS41OTczIDIwLjgwMTYgMjkuNzk4NyAxOS45NzUyIDI5Ljc5ODdDMTkuNTYyIDI5Ljc5ODcgMTkuMTQ4OCAyOS43OTg3IDE4LjczNTUgMjkuNTk3M0MxOC41Mjg5IDI5LjU5NzMgMTguMTE1NyAyOS4zOTYgMTcuNzAyNSAyOS4xOTQ2QzE3LjA4MjYgMjguOTkzMyAxNi44NzYgMjguNzkxOSAxNi40NjI4IDI4Ljc5MTlDMTYuMDQ5NiAyOC41OTA2IDE1LjQyOTggMjguNTkwNiAxNS4wMTY1IDI4LjU5MDZDMTQuNjAzMyAyOC41OTA2IDEzLjk4MzUgMjguNTkwNiAxMy41NzAyIDI4Ljc5MTlDMTMuMTU3IDI4Ljc5MTkgMTIuNzQzOCAyOC45OTMzIDEyLjMzMDYgMjkuMTk0NkMxMS43MTA3IDI5LjM5NiAxMS41MDQxIDI5LjU5NzMgMTEuMjk3NSAyOS41OTczQzEwLjg4NDMgMjkuNzk4NyAxMC40NzExIDI5Ljc5ODcgMTAuMDU3OCAyOS43OTg3QzkuNDM4MDIgMjkuNzk4NyA4LjgxODE4IDI5LjU5NzMgOC4xOTgzNSAyOS4xOTQ2Wk0xNi44NzYgNi4yNDE2MUMxNi4wNDk2IDYuNjQ0MjkgMTUuMjIzMSA2Ljg0NTY0IDE0LjM5NjcgNi44NDU2NEMxNC4xOTAxIDYuMDQwMjcgMTQuMzk2NyA1LjIzNDkgMTQuODA5OSA0LjIyODE5QzE1LjIyMzEgMy40MjI4MiAxNS40Mjk4IDIuODE4NzkgMTYuMDQ5NiAyLjIxNDc2QzE2LjY2OTQgMS42MTA3NCAxNy4yODkzIDEuMDA2NzEgMTguMTE1NyAwLjYwNDAyN0MxOC45NDIxIDAuMjAxMzQzIDE5Ljc2ODYgMCAyMC41OTUgMEMyMC41OTUgMC44MDUzNjkgMjAuMzg4NCAxLjYxMDc0IDIwLjE4MTggMi42MTc0NUMxOS45NzUyIDMuNDIyODIgMTkuMzU1NCA0LjAyNjg1IDE4Ljk0MjEgNC42MzA4N0MxOC4zMjIzIDUuNDM2MjQgMTcuNzAyNSA1LjgzODkzIDE2Ljg3NiA2LjI0MTYxWlwiIGZpbGw9XCJibGFja1wiLz5cclxuICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICA8ZGVmcz5cclxuICAgICAgICAgICAgICA8Y2xpcFBhdGggaWQ9XCJjbGlwMF85MjRfMTI0N1wiPlxyXG4gICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIyNVwiIGhlaWdodD1cIjMwXCIgZmlsbD1cIndoaXRlXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDIpXCIvPlxyXG4gICAgICAgICAgICAgIDwvY2xpcFBhdGg+XHJcbiAgICAgICAgICAgIDwvZGVmcz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJwb3B1cF9saW5rXCI+XHJcbiAgICAgICAgICA8c3ZnIHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCIzMFwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgICAgICAgPGcgY2xpcFBhdGg9XCJ1cmwoI2NsaXAwXzkyNF8xMjQxKVwiPlxyXG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMzAgMTVDMzAgNi43MTU3IDIzLjI4NDMgLTIuNjcwMjllLTA1IDE1IC0yLjY3MDI5ZS0wNUM2LjcxNTcyIC0yLjY3MDI5ZS0wNSAwIDYuNzE1NyAwIDE1QzAgMjIuNDg2OSA1LjQ4NTI4IDI4LjY5MjUgMTIuNjU2MiAyOS44MTc3VjE5LjMzNTlIOC44NDc2NlYxNUgxMi42NTYyVjExLjY5NTNDMTIuNjU2MiA3LjkzNTkxIDE0Ljg5NTYgNS44NTkzNSAxOC4zMjIgNS44NTkzNUMxOS45NjMxIDUuODU5MzUgMjEuNjc5NyA2LjE1MjMyIDIxLjY3OTcgNi4xNTIzMlY5Ljg0MzcySDE5Ljc4ODJDMTcuOTI0OSA5Ljg0MzcyIDE3LjM0MzggMTEgMTcuMzQzOCAxMi4xODYyVjE1SDIxLjUwMzlMMjAuODM4OSAxOS4zMzU5SDE3LjM0MzhWMjkuODE3N0MyNC41MTQ3IDI4LjY5MjUgMzAgMjIuNDg2OSAzMCAxNVpcIiBmaWxsPVwid2hpdGVcIi8+XHJcbiAgICAgICAgICAgICAgPHBhdGggZD1cIk0yMC44Mzg5IDE5LjMzNTlMMjEuNTAzOSAxNUgxNy4zNDM4VjEyLjE4NjJDMTcuMzQzOCAxMSAxNy45MjQ5IDkuODQzNzUgMTkuNzg4MiA5Ljg0Mzc1SDIxLjY3OTdWNi4xNTIzNEMyMS42Nzk3IDYuMTUyMzQgMTkuOTYzMSA1Ljg1OTM4IDE4LjMyMiA1Ljg1OTM4QzE0Ljg5NTYgNS44NTkzOCAxMi42NTYzIDcuOTM1OTQgMTIuNjU2MyAxMS42OTUzVjE1SDguODQ3NjZWMTkuMzM1OUgxMi42NTYzVjI5LjgxNzhDMTMuNDE5OSAyOS45Mzc2IDE0LjIwMjcgMzAgMTUgMzBDMTUuNzk3MyAzMCAxNi41ODAxIDI5LjkzNzYgMTcuMzQzOCAyOS44MTc4VjE5LjMzNTlIMjAuODM4OVpcIiBmaWxsPVwiYmxhY2tcIi8+XHJcbiAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgPGRlZnM+XHJcbiAgICAgICAgICAgICAgPGNsaXBQYXRoIGlkPVwiY2xpcDBfOTI0XzEyNDFcIj5cclxuICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCIzMFwiIGZpbGw9XCJ3aGl0ZVwiLz5cclxuICAgICAgICAgICAgICA8L2NsaXBQYXRoPlxyXG4gICAgICAgICAgICA8L2RlZnM+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwicG9wdXBfbGlua1wiPlxyXG4gICAgICAgICAgPHN2ZyB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjguMiAxNS4zMTI1QzI4LjIgMTQuMzM3NSAyOC4xMTI1IDEzLjQgMjcuOTUgMTIuNUgxNVYxNy44MTg4SDIyLjRDMjIuMDgxMyAxOS41Mzc1IDIxLjExMjUgMjAuOTkzOCAxOS42NTYzIDIxLjk2ODhWMjUuNDE4N0gyNC4xQzI2LjcgMjMuMDI1IDI4LjIgMTkuNSAyOC4yIDE1LjMxMjVaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTE1LjAwMDQgMjguNzVDMTguNzEyOSAyOC43NSAyMS44MjU0IDI3LjUxODggMjQuMTAwNCAyNS40MTg4TDE5LjY1NjYgMjEuOTY4OEMxOC40MjU0IDIyLjc5MzggMTYuODUwNCAyMy4yODEzIDE1LjAwMDQgMjMuMjgxM0MxMS40MTkxIDIzLjI4MTMgOC4zODc4OSAyMC44NjI1IDcuMzA2NjQgMTcuNjEyNUgyLjcxMjg5VjIxLjE3NUM0Ljk3NTM5IDI1LjY2ODggOS42MjUzOSAyOC43NSAxNS4wMDA0IDI4Ljc1WlwiIGZpbGw9XCJibGFja1wiLz5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk03LjMwNjI1IDE3LjYxMjVDNy4wMzEyNSAxNi43ODc1IDYuODc1IDE1LjkwNjIgNi44NzUgMTVDNi44NzUgMTQuMDkzNyA3LjAzMTI1IDEzLjIxMjUgNy4zMDYyNSAxMi4zODc1VjguODI0OTVIMi43MTI1QzEuNzUgMTAuNzQxIDEuMjQ5MTUgMTIuODU1NyAxLjI1IDE1QzEuMjUgMTcuMjE4NyAxLjc4MTI1IDE5LjMxODcgMi43MTI1IDIxLjE3NUw3LjMwNjI1IDE3LjYxMjVaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTE1LjAwMDQgNi43MTg3NUMxNy4wMTkxIDYuNzE4NzUgMTguODMxNiA3LjQxMjUgMjAuMjU2NiA4Ljc3NUwyNC4yMDA0IDQuODMxMjVDMjEuODE5MSAyLjYxMjUgMTguNzA2NiAxLjI1IDE1LjAwMDQgMS4yNUM5LjYyNTM5IDEuMjUgNC45NzUzOSA0LjMzMTI1IDIuNzEyODkgOC44MjVMNy4zMDY2NCAxMi4zODc1QzguMzg3ODkgOS4xMzc1IDExLjQxOTEgNi43MTg3NSAxNS4wMDA0IDYuNzE4NzVaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPHAgY2xhc3M9XCJuby1hY2NvdW50LXlldFwiPtCj0LbQtSDQtdGB0YLRjCDQsNC60LrQsNGD0L3Rgj88L3A+XHJcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicG9wdXBfX2J1dHRvbiBwb3B1cF9fYnV0dG9uLWxvZ2luXCI+0JLQvtC50YLQuDwvYnV0dG9uPlxyXG4gICAgPC9mb3JtPlxyXG5cclxuICAgIGBcclxuICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlY292ZXJ5UG9wdXAoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIGBcclxuICAgIDxmb3JtIGNsYXNzPVwicG9wdXBfX3JlY292ZXJ5XCIgbmFtZT1cInBvcHVwX19yZWNvdmVyeVwiPlxyXG4gICAgICA8bGFiZWwgY2xhc3M9J2Zvcm0tbGFiZWwnPjxpbnB1dCBjbGFzcz0ncG9wdXBfX2lucHV0JyB0eXBlPVwiZW1haWxcIiBuYW1lPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIkUtbWFpbCwg0YPQutCw0LfQsNC90L3Ri9C5INC/0YDQuCDRgNC10LPQuNGB0YLRgNCw0YbQuNC4XCIgLz48ZGl2IGNsYXNzPSdmb3JtLWVycm9yJz48ZGl2PjxwIGNsYXNzPSdmb3JtLWVycm9yX21lc3NhZ2UnPjwvcD48L2Rpdj48L2Rpdj48L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwi0JLQvtGB0YHRgtCw0L3QvtCy0LjRgtGMXCIgY2xhc3M9XCJwb3B1cF9faW5wdXRfZ3JlZW4gcG9wdXBfX2lucHV0X3Jlc3RvcmVcIj48L2lucHV0PlxyXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInBvcHVwX19idXR0b24gcG9wdXBfX2J1dHRvbl9sb2dpblwiPtCS0L7QudGC0Lg8L2J1dHRvbj5cclxuICAgIDwvZm9ybT5cclxuICAgIFxyXG4gICAgYFxyXG4gIClcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZFBvcHVwKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICBgXHJcbiAgICAgIDxwIGNsYXNzPSdwb3B1cF9fc2VuZCc+0JjQtNC4INC90LAg0L/QvtGH0YLRgzwvcD5cclxuXHJcbiAgICBgXHJcbiAgKVxyXG59XHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9pbmRleC5zY3NzJ1xyXG5pbXBvcnQgeyBIZWFkZXJCdXR0b24sIEhlYWRlckFmdGVyUmVuZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlckJ1dHRvbidcclxuaW1wb3J0IHsgUG9wdXAsIFBvcHVwQWZ0ZXJSZW5kZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvcG9wdXAnXHJcblxyXG5jb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cCcpLFxyXG4gIGhlYWRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoZWFkZXItYnV0dG9uJyksXHJcbiAgaGVhZGVyQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYnVyZ2VyJyksXHJcbiAgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JyksXHJcblxyXG4gIGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcclxuXHJcbmhlYWRlckJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdzaWRlJylcclxuICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXHJcbn0pXHJcblxyXG5tZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT4ge1xyXG4gIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LnNpZGUuYWN0aXZlJykpe1xyXG4gICAgaWYoZS50YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudSBzaWRlIGFjdGl2ZScpe1xyXG4gICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ3NpZGUnKVxyXG4gICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcclxuICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJ1xyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcblxyXG5IZWFkZXJCdXR0b24oKS50aGVuKChodG1sKSA9PiBoZWFkZXJCdXR0b24uaW5uZXJIVE1MID0gaHRtbCkudGhlbigoKSA9PiBIZWFkZXJBZnRlclJlbmRlcigpKVxyXG5Qb3B1cCgpLnRoZW4oKGh0bWwpID0+IHBvcHVwLmlubmVySFRNTCA9IGh0bWwpLnRoZW4oKCkgPT4gUG9wdXBBZnRlclJlbmRlcigpKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
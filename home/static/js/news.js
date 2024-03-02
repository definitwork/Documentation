document.addEventListener("DOMContentLoaded", ready);

function ready(){
    getNewsTitles()
    const buttons = document.getElementsByClassName('category__slider__btn')
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', scrollSlider)
    }
    const sliders = document.getElementsByClassName('slider__content');
    for(let j = 0; j < sliders.length; j++){
        sliders[j].addEventListener('mousedown', startMoveSlider)
    }
    const smallNav = document.querySelector('.articles__small__list')
    smallNav.addEventListener('wheel', scrollNav)
}

function scrollSlider(e){
    e.stopPropagation()
    let slider = null
    if (e.target.className == 'category__slider__btn slider__btn-right' || e.target.closest('.category__slider__btn.slider__btn-right')){
        if (e.target.className == 'category__slider__btn slider__btn-right'){
            slider = e.target.previousElementSibling
        }else if(e.target.closest('.category__slider__btn.slider__btn-right')){
            slider = e.target.closest('.category__slider__btn.slider__btn-right').previousElementSibling
        }
        const pl = slider.children[0].style.marginLeft
        if(pl){
            let plNum = parseInt(pl)
            let width = slider.children[0].clientWidth
            if(Number(plNum) + width - slider.clientWidth > 0){
                slider.children[0].style.marginLeft = `${Number(plNum) - 310}px`
            }
        }else{
            slider.children[0].style.marginLeft = '-268px'
        }
    }
    if (e.target.className == 'category__slider__btn slider__btn-left' || e.target.closest('.category__slider__btn.slider__btn-left')){
        if (e.target.className == 'category__slider__btn slider__btn-left'){
            slider = e.target.nextElementSibling
        }else if(e.target.closest('.category__slider__btn.slider__btn-left')){
            slider = e.target.closest('.category__slider__btn.slider__btn-left').nextElementSibling
        }
        const pl = slider.children[0].style.marginLeft
        if(pl){
            let plNum = parseInt(pl)
            if(Number(plNum) < 10){
                slider.children[0].style.marginLeft = `${Number(plNum) + 268}px`
            }
        }
    }
}

function startMoveSlider(e){
    e.stopPropagation()
    e.preventDefault()
    let clientXstart = null
    let slider = null
    if (e.target.className == 'slider__content' || e.target.closest('.slider__content')){

        if (e.target.className == 'slider__content'){
            slider = e.target

        } else if(e.target.closest('.slider__content')){
            slider = e.target.closest('.slider__content')
        }

        clientXstart = e.clientX
        window.addEventListener('mousemove', moveSlider)

        window.addEventListener('click', ()=>{
            window.removeEventListener('mousemove', moveSlider)
        })

        let ml = getComputedStyle(slider).marginLeft
        let mlNum = parseInt(ml)
        function moveSlider(e){
            e.stopPropagation()
            e.preventDefault()
            let clientXmove = e.clientX
            const width = slider.clientWidth
            let futureML = Number(mlNum) - (clientXstart - clientXmove)
            console.log( (width - 800) * -1)
            if (futureML < 10 && futureML > (width - slider.parentNode.clientWidth) * -1){
                slider.style.marginLeft = `${futureML}px`
            } 
            window.addEventListener('mouseup', ()=>{
                window.removeEventListener('mousemove', moveSlider)
            })
        }
    }
}

function scrollNav(e){
    e.stopPropagation()
    e.preventDefault()
    const container = document.querySelector('.articles__small__list')
    const screenY = window.outerHeight
    const h = parseInt(container.clientHeight)
    const p = window.getComputedStyle(container).marginTop
    const d = e.deltaY
    if((parseInt(p)-d) <= 0 && (parseInt(p)-d) >= ((h*-1) + screenY - 165)){
        container.style.marginTop = `${parseInt(p)-d}px`
    }
}

function getNewsTitles(){
    const list = document.querySelector('.articles__small__list')

    fetch(`${location.origin}/api/v1/news/all_news_title/`)
    .then((response) => {
        if (response.status == 200){
          return response.json()
        } else {
          list.innerHTML = 'Что-то пошло не так'
        }
    }).then((data)=>{
        const newsSections = data.results
        if(newsSections){
            let html = newsSections.map((item)=>`<li class="articles__small__list__item">${item["news_title"]}</li>`)
            console.log(html)
            list.innerHTML = newsSections.map((item)=>`<li class="articles__small__list__item">${item["news_title"]}</li>`).join('')
        }
    })
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

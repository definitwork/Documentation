document.addEventListener("DOMContentLoaded", ready);

function ready(){
    getNewsTitles()
    getNewsSections()
    setListenersOnListArticles()
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
            list.innerHTML = newsSections.map((item)=>`<li class="articles__small__list__item">${item["news_title"]}</li>`).join('')
        }
    })
}

function getNewsSections(){
    const articlesSliders = document.getElementsByClassName('category__filter__list')
    let count = 0

    fetch(`${location.origin}/api/v1/news/news_section/`)
    .then((response) => {
        if (response.status == 200){
          return response.json()
        } else {
            for (let i = 0; i < articlesSliders.length; i++){
                articlesSliders[i].innerHTML =  `<div class="category__filter__list__item active">Категории скоро появятся</div>`
            }
        }
    }).then((data)=>{
        const newsSections = data.results
        if(newsSections){
            for (let i = 0; i < articlesSliders.length; i++){
                for (let j = 0; j < 2; j++){
                    if (j == 0) {articlesSliders[i].innerHTML += `<div class="category__filter__list__item active" id="${newsSections[count]["id"]}">${newsSections[count]["title"]}</div>`; getNewsSection(articlesSliders[i], newsSections[count]["id"]);count++} else {
                        articlesSliders[i].innerHTML += `<div class="category__filter__list__item" id="${newsSections[count]["id"]}">${newsSections[count]["title"]}</div>`; count++
                    }
                }
            }
            setListenerOnFilters()
        }
    })
}

function getNewsSection(filter, sectionId){
    const slider = filter.parentNode.nextElementSibling.children[1].children[0]

    fetch(`${location.origin}/api/v1/news/this_section_news/${sectionId}/`)
    .then((response) => {
        if (response.status == 200){
          return response.json()
        } else {
            for (let i = 0; i < articlesSliders.length; i++){
                articlesSliders[i].innerHTML =  `<div class="category__filter__list__item active">Новости скоро появятся</div>`
            }
        }
    }).then((data)=>{
        const newsSections = data.results
        if(newsSections){
            slider.innerHTML = newsSections.map((item)=>
                `<div class="slider__card">
                    <div class="slider__card__media">
                        <img class="slider__card__media__img" src="${item["news_img"]}" alt="photo">
                    </div>
                  <div class="slider__card__title">${item["news_title"]}</div>
                </div>`).join('')
            }
        }
    )
}

function setListenerOnFilters(){
    const filters = document.querySelectorAll('.category__filter__list__item')
    if(filters){
        for (let i = 0; i < filters.length; i++){
            if (filters[i].className !== 'category__filter__list__item active'){
                
                filters[i].addEventListener('click', getNewListNews)
            } 
        }
    }
}

function getNewListNews(e){
    e.stopPropagation()
    let id = null
    const filtersList = e.target.parentNode.children
    for (let i = 0; i < filtersList.length; i++){
        if(filtersList[i].innerText == e.target.innerText){
            filtersList[i].className = 'category__filter__list__item active'
            getNewsSection(e.target.parentNode, e.target.getAttribute('id'))
        } else if(filtersList[i].className == 'category__filter__list__item active'){
            filtersList[i].className = 'category__filter__list__item'
            setListenerOnFilters()
        }
    }
}

function setListenersOnListArticles(){
    const list = document.querySelector('.articles__list').children
    for (let i = 0; i < list.length; i++){
        if (list[i].className !== 'articles__list__item active'){
            list[i].addEventListener('click', getNews)
        }
    }
}

function getNews(e){
    e.target.className = 'articles__list__item active'
    const list = document.querySelector('.articles__list').children
    for (let i = 0; i < list.length; i++){
        if (list[i].className === 'articles__list__item active' && e.target.innerText !== list[i].innerText){
            list[i].className = 'articles__list__item'
        }
    }
    setListenersOnListArticles()
    if (list[0].innerText === e.target.innerText){
        return location.reload()
    }

    fetch(`${location.origin}/api/v1/news/this_section_news/${e.target.dataset.id}/`)
    .then((response) => {
        if (response.status == 200){
          return response.json()
        } else {
            for (let i = 0; i < articlesSliders.length; i++){
                articlesSliders[i].innerHTML =  `<div class="category__filter__list__item active">Новости скоро появятся</div>`
            }
        }
    }).then((data)=>{
        const newsSections = data.results
        console.log(newsSections)
    })
}
    


function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

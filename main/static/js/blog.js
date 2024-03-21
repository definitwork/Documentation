document.addEventListener("DOMContentLoaded", ready);

function ready(){
    getBlogTitles()
    getBlogSections()
    setListenersOnListArticles()
    


    const smallNav = document.querySelector('.articles__small__list')
    smallNav.addEventListener('wheel', scrollNav)
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

function getBlogTitles(){
    const list = document.querySelector('.articles__small__list')

    fetch(`${location.origin}/api/v1/blog/all_blog_title/`)
    .then((response) => {
        if (response.status == 200){
          return response.json()
        } else {
          list.innerHTML = 'Что-то пошло не так'
        }
    }).then((data)=>{
        const newsSections = data.results
        if(newsSections.length){
            list.innerHTML = newsSections.map((item)=>`<li class="articles__small__list__item">${item["blog_title"]}</li>`).join('')
        } else {
            list.innerHTML = `<li class="articles__small__list__item">Статьи в пути!</li>`
        }
    })
}

function getBlogSections(){
    const articlesSliders = document.getElementsByClassName('category__filter__list')
    let count = 0

    fetch(`${location.origin}/api/v1/news/news_section/`)
    .then((response) => {
        if (response.status == 200){
          return response.json()
        } else {
            return
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
        }
    })
}

function setListenersOnListArticles(){
    const list = document.querySelector('.articles__list').children
    for (let i = 0; i < list.length; i++){
        if (list[i].className !== 'articles__list__item active'){
            list[i].addEventListener('click', getBlogs)
        }
    }
}

function getBlogs(e){
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

    fetch(`${location.origin}/api/v1/news/this_section_blog/${e.target.dataset.id}/`)
    .then((response) => {
        if (response.status == 200){
          return response.json()
        } else {
           document.querySelector('.articles-big__list').innerHTML =  `<li class="articles__list__item active">Статьи скоро появятся!</li>`
        }
    }).then((data)=>{
        const newsSections = data.results
        console.log(newsSections)
    })
}
document.addEventListener("DOMContentLoaded", ready);

function ready(){
    getNewsTitles()
    //getNewsSections()
    //setListenersOnListArticles()
    
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
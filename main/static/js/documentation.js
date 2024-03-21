document.addEventListener("DOMContentLoaded", ready);

function ready(){
    const body = document.querySelector('body')
    if (body.clientWidth < 768){
        const catRevers = document.querySelectorAll('.about-category__content')

        for ( let y = 0; y < catRevers.length; y++ ){
            catRevers[y].className = 'about-category__content'
        }
    }

    const links = document.querySelectorAll('.about-category__info')
    
    for ( let x = 0; x < links.length; x++ ){
        links[x].addEventListener('mouseover', (e) => {
            const button = e.target.offsetParent.children[3].children[0].style.borderBottom = '1px solid black'

        })
        links[x].addEventListener('mouseout', (e) => {
            const button = e.target.offsetParent.children[3].children[0].style.borderBottom = '1px solid rgba(255, 255, 255, 0)'
            
        })
    }
}
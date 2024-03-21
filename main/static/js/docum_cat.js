document.addEventListener("DOMContentLoaded", ready);

function ready(){
    
    const links = document.querySelectorAll('.documentation-cat__link')
    
    for ( let x = 0; x < links.length; x++ ){
        links[x].addEventListener('mouseover', (e) => {
            const button = e.target.offsetParent.children[1].children[2].children[0].style.borderBottom = '1px solid black'
            
        })
        links[x].addEventListener('mouseout', (e) => {
            const button = e.target.offsetParent.children[1].children[2].children[0].style.borderBottom = '1px solid rgb(255, 255, 255)'
            
        })
    }
}
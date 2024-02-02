const navbar = document.querySelector('.navbar')
const hamburger = document.querySelector('.hamburger')
const navlinks = document.querySelector('.nav-links')
const navlinksLi = document.querySelectorAll('.nav-links LI')

window.addEventListener('scroll', () => {
    if (this,scrollY >= 100) {
        navbar.classList.add('scrolled')
    } else{
        navbar.classList.remove('scrolled') 
    }
}) 

hamburger.addEventListener('click', () => {
    navlinks.classList.toggle('active')
    hamburger.classList.toggle('active')
})

navlinksLi.forEach(li => li.addEventListener('click', ()=> {
    navlinksLi.forEach(li => li.classList.remove('active'))
    li.classList.add('active')

    hamburger.classList.remove('active')
    navlinks.classList.remove('active')



}))

// Typed js

var options = {
    strings: [
        'Creative Agency',
         'Philip Is Awesome CAN YOU DO IT'
        ],
    typeSpeed: 40,
    loop: true,
    loopcount: Infinity,
    typeSpeed: 40,
    startDelay: 1000,
    backDelay: 2000,
   };

var typed = new Typed('#hero-titles', options);


// AOS
AOS.init();

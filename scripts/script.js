const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav');
const burgerIcon = document.querySelector('.nav-list__item__link');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-list__item__link').forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
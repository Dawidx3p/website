document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navMobile = document.querySelector(".nav-mobile");
    const navClose = document.querySelector(".nav-close");
  
    // Otwieranie/zamykanie przyciskiem hamburger
    navToggle.addEventListener("click", () => {
      navMobile.classList.toggle("active");
    });
  
    // Zamknięcie menu przyciskiem "X"
    navClose.addEventListener("click", () => {
      navMobile.classList.remove("active");
    });
  });
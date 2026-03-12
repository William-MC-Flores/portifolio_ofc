document.addEventListener("DOMContentLoaded", () => {

  const menuHamburguer = document.getElementById("menu-hamburguer");
  const nav = document.getElementById("nav");
  const header = document.querySelector("header");
  const links = document.querySelectorAll("#nav a");

  // Abrir / fechar menu
  menuHamburguer.addEventListener("click", () => {

    nav.classList.toggle("aberto");
    header.classList.toggle("expandido");

  });

  // Fechar menu ao clicar em um link
  links.forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("aberto");
      header.classList.remove("expandido");

    });

  });

});

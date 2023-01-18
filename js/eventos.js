const d = document,
  w = window;

/*animacion con scrollreveal para el menu que baja, banner, box-foto, cuadro-textos, y para los box textos del footer*/

w.sr = ScrollReveal();

sr.reveal(".menu", {
  duration: 3000,
  origin: "bottom",
  distance: "-100px",
});

sr.reveal(".basilico", {
  duration: 4000,
});

sr.reveal(".foto1", {
  duration: 4000,
  origin: "left",
  distance: "200px",
});

sr.reveal(".cuadro_texto", {
  duration: 4000,
});

sr.reveal(".box_foto_invisible", {
  duration: 4000,
});

sr.reveal(".cuadro_texto_invisible", {
  duration: 4000,
});

sr.reveal(".boxes", {
  interval: 300,
});

/*--menu desplegable--*/

const hamburger = d.querySelector(".bx-menu");
const menu = d.querySelector(".menu-desplegable");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("spread");
});

w.addEventListener("click", (e) => {
  if (
    menu.classList.contains("spread") &&
    e.target != menu &&
    e.target != hamburger
  ) {
    menu.classList.toggle("spread");
  }
});

/*animacion boton-scroll-top */

d.getElementById("button-scroll-top").addEventListener("click", scrollUp);

function scrollUp() {
  var currentScroll = d.documentElement.scrollTop;

  if (currentScroll > 0) {
    w.requestAnimationFrame(scrollUp);
    w.scrollTo(0, currentScroll - currentScroll / 50);
    buttonUp.style.transform = "scale(0)";
  }
}

buttonUp = d.getElementById("button-scroll-top");

w.onscroll = function () {
  var scroll = d.documentElement.scrollTop;
  if (scroll > 200) {
    buttonUp.style.transform = "scale(1)";
  } else if (scroll < 200) {
    buttonUp.style.transform = "scale(0)";
  }
};

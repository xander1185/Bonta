const d = document,
  w = window;

/*animacion con scrollreveal para el menu que baja y para los box textos del footer*/

w.sr = ScrollReveal();

sr.reveal(".menu", {
  duration: 3000,
  origin: "bottom",
  distance: "-100px",
});

sr.reveal(".boxes", {
  interval: 300,
});

/*animacion logo nav*/

$(d).ready(function () {
  $("#fondo1").css({ height: $(w).height() + "px" });

  var flag = false;
  var scroll;

  $(w).scroll(function () {
    scroll = $(w).scrollTop();

    if (scroll > 200) {
      if (!flag) {
        $("#logo").css({
          "margin-top": "0px",
          width: "200px",
          height: "40px",
        });
        $("header").css({ "background-color": "#D7D3C5" });
        $("li").css({ color: "#000000" });
        flag = true;
      }
    } else {
      if (flag) {
        $("#logo").css({
          "margin-top": "150px",
          width: "400px",
          height: "90px",
        });
        $("header").css({ "background-color": "transparent" });
        $("li").css({ color: "#FFF" });
        flag = false;
      }
    }
  });
});

/*para quitar la barra blanca del nav/menu cuando se hacia scroll bajo los 1280px*/

d.addEventListener("scroll", init);

function init() {
  let query = w.matchMedia("(max-width: 1280px)");
  if (query.matches) {
    d.querySelector("header").style.backgroundColor = "transparent";
  }
}

/*animacion cajas texto*/

let animado = d.querySelectorAll(".animado");

function mostrarScroll() {
  let scrollTop = d.documentElement.scrollTop;
  for (var i = 0; i < animado.length; i++) {
    let alturaAnimado = animado[i].offsetTop;
    if (alturaAnimado - 500 < scrollTop) {
      animado[i].style.opacity = 1;
    }
  }
}

w.addEventListener("scroll", mostrarScroll);

/*animacion escritas*/

let trasladar = d.querySelectorAll(".trasladar");

function mostrarTraslado() {
  let scrollTop = d.documentElement.scrollTop;
  for (var i = 0; i < trasladar.length; i++) {
    let alturaTrasladar = trasladar[i].offsetTop;
    if (alturaTrasladar - 500 < scrollTop) {
      trasladar[i].style.opacity = 1;
      trasladar[i].classList.add("mostrarIzquierda");
    }
  }
}

w.addEventListener("scroll", mostrarTraslado);

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

/* banner cookies */

/*const botonAceptarCookies = d.getElementById("btn-aceptar-cookies");
const avisoCookies = d.getElementById("aviso-cookies");
const fondoAvisoCookies = d.getElementById("fondo-aviso-cookies");

dataLayer = [];

if (!localStorage.getItem("cookies-aceptadas")) {
  avisoCookies.classList.add("activo");
  fondoAvisoCookies.classList.add("activo");
} else {
  dataLayer.push({ event: "cookies-aceptadas" });
}

botonAceptarCookies.addEventListener("click", () => {
  avisoCookies.classList.remove("activo");
  fondoAvisoCookies.classList.remove("activo");

  localStorage.setItem("cookies-aceptadas", true);

  dataLayer.push({ event: "cookies-aceptadas" });
});*/

const botonAceptarCookies = d.getElementById("btn-aceptar-cookies");
const avisoCookies = d.getElementById("aviso-cookies");
const fondoAvisoCookies = d.getElementById("fondo-aviso-cookies");

dataLayer = [];

const cookieConsentValue = localStorage.getItem("cookies-aceptadas");
const cookieConsentDate = new Date(cookieConsentValue);
const now = new Date();
const differenceInDays = (now - cookieConsentDate) / (1000 * 60 * 60 * 24);

//aqui hay que poner en cuantos dias queremos que caduque el cookie para que luego se re-accione
if (differenceInDays > 30) {
  avisoCookies.classList.add("activo");
  fondoAvisoCookies.classList.add("activo");
} else {
  dataLayer.push({ event: "cookies-aceptadas" });
}

botonAceptarCookies.addEventListener("click", () => {
  avisoCookies.classList.remove("activo");
  fondoAvisoCookies.classList.remove("activo");

  const now = new Date();
  localStorage.setItem("cookies-aceptadas", now.toISOString());

  dataLayer.push({ event: "cookies-aceptadas" });
});

/*para detectar el scroll*/

/*window.onscroll = function () {
  console.log("Vertical: " + window.scrollY);
  console.log("Horizontal: " + window.scrollX);
};*/

const d = document,
  w = window;

w.addEventListener("DOMContentLoaded", () => {
  // const params = w.location.search?.replace("?", "")
  // if (params) {
  // const contactForm = d.querySelector(".templatemo_contactform")
  // contactForm.style.display = "none"
  const reservaForm = d.querySelector(".reserva-form");
  reservaForm.style.display = "block";
  const selectTime = d.querySelector("#reserve_time_select");
  const selectPeople = d.querySelector("#reserve_select");
  const timeList = generateTimeList();
  fillSelectElm(
    selectPeople,
    [...Array(5).keys()].map((people) => people + 2)
  );
  fillSelectElm(selectTime, timeList);
  // }
});

/*animacion con scrollreveal para el menu que baja, banner, y para los box textos del footer*/

////////////////////////////////

function generateTimeList() {
  // solucion  #1 for loop
  // const hours = [];
  // for (const i = 0; i < 12; i++) {
  //   hours.push((i+12) + ":00");
  // }
  //return hours

  // solucion #2 Array.from
  // return Array.from(Array(12)).map((_, i) => (i+12) + ":00")

  // solucion #3 spread operator
  return [...Array(13)].map((_, i) => i + 12 + ":00");
}

function fillSelectElm(selectElm, data) {
  data.forEach((item) => {
    const opt = d.createElement("option");
    opt.value = item;
    opt.innerHTML = item;
    selectElm.appendChild(opt);
  });
}

// function validateForm() {
//   let form = d.forms["reserve_form"]
//   debugger
// }

////////////////////////////////

w.sr = ScrollReveal();

sr.reveal(".menu", {
  duration: 3000,
  origin: "bottom",
  distance: "-100px",
});

sr.reveal(".mozzarella", {
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

d.addEventListener("submit", (e) => {
  alert(
    "Formulario enviado correctamente. En breve te responderemos a tu correo electronico."
  );
});

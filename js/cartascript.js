// variables
const d = document;
const w = window;

const menuFood = [
  {
    id: 1,
    title: "CARBONARA",
    desc: "Descripcion del plato",
    ingredients: [],
    price: 10,
  },
  {
    id: 2,
    title: "AMATRICIANA",
    desc: "Descripcion del plato",
    ingredients: [],
    price: 10,
  },
  {
    id: 3,
    title: "ALLE VONGOLE",
    desc: "Descripcion del plato",
    ingredients: [],
    price: 10,
  },
  {
    id: 4,
    title: "ALLO SCOGLIO",
    desc: "Descripcion del plato",
    ingredients: [],
    price: 10,
  },
  {
    id: 5,
    title: "ARRABBIATA",
    desc: "Descripcion del plato",
    ingredients: [],
    price: 10,
  },
  {
    id: 6,
    title: "AGLIO E OLIO",
    desc: "Descripcion del plato",
    ingredients: [],
    price: 10,
  },
  {
    id: 7,
    title: "PESTO",
    desc: "Descripcion del plato",
    ingredients: [],
    price: 10,
  },
  {
    id: 8,
    title: "CACIO E PEPE",
    desc: "Descripcion del plato",
    ingredients: [],
    price: 10,
  },
  {
    id: 9,
    title: "PESTO ROSSO",
    desc: "Descripcion del plato",
    ingredients: [],
    price: 10,
  },
  {
    id: 10,
    title: "RAGU",
    desc: "Descripcion del plato",
    ingredients: [],
    price: 10,
  },
  {
    id: 11,
    title: "ALLE COZZE",
    desc: "Descripcion del plato",
    ingredients: [],
    price: 10,
  },
  {
    id: 12,
    title: "ALLA PUTTANESCA",
    desc: "Descripcion del plato",
    ingredients: [],
    price: 10,
  },
];

const ingredients = [
  "NoKetchup",
  "NoSpicy",
  "NoTomate",
  "Cheese",
  "Olive",
  "Meat",
  "Gluten Free",
];

// stored dish by client
let selectedDishByClient = [];
const sectionMenu = document.querySelector(".menu-items");
const sectionExtraItems = document.querySelector(".ingredients-list");
const dishList = document.querySelector(".dish-list");

//Mostrar el menu despues de cargar el contenido de html
// Init
w.addEventListener("DOMContentLoaded", () => {
  // build
  const storageClient = localStorage.getItem("storageClient");
  if (storageClient) {
    selectedDishByClient = JSON.parse(storageClient);
    selectedDishByClient.forEach((dish) => fillSelectedDishByClient(dish));
  }
  showMenuItems(menuFood);
});

// Mostrar el menu de platos
function showMenuItems(menuItems) {
  let displayMenu = menuItems.map((item) => {
    return `
    <div class="menu-item">
      <div class="menu-item-title" onclick="openNav(${item.id})">
        ${item.title}<span class="menu-item-price">${item.price}€</span>
      </div>
      <div class="menu-item-description">${item.desc}</div>
    </div>`;
  });

  displayMenu = displayMenu.join("");
  sectionMenu.innerHTML = displayMenu;
}

function showIngredients(menuIngredients, elm) {
  const dishId = elm.getAttribute("data-id");
  let displayIngredients = menuIngredients
    .map((item, i) => {
      return `
      <div class="menu-item-title">
        <input class="extra-ingredient-check" type="checkbox" data-value=${item}>${item}</>
    </div>`;
    })
    .join("");

  sectionExtraItems.innerHTML = displayIngredients;
  const checkIngredients = sectionExtraItems.querySelectorAll(
    ".extra-ingredient-check"
  );
  const currentDish = selectedDishByClient.find(
    (selected) => selected.id == dishId
  );
  ///
  currentDish?.ingredients?.map((ingredient) => {
    const chkElm = Array.from(checkIngredients).find(
      (checkElm) => checkElm.getAttribute("data-value") == ingredient
    );
    if (chkElm) {
      chkElm.checked = true;
    }
  });
  ///
  checkIngredients.forEach((checkElm) =>
    checkElm.addEventListener("click", (e) => addExtraIngredient(e, elm))
  );
}

// Orden "personalizada"
const menuNav = document.querySelector("#mySidenav");

function showExtraIngredient(item) {
  return `
    <div>
      <input class="ingredient-check" data-value=${item} type="checkbox">${item}</input>
    </div>
  `;
}

function fillSelectedDishByClient(dishData) {
  const dishElm = document.createElement("div");
  dishElm.setAttribute("class", "dish-item");
  dishElm.setAttribute("data-id", dishData.id);

  const firstIngredient = ingredients.slice(0, 3);
  const contentDish = `
  <div class="dish-detail">
    <div>${dishData.title} ${dishData.price}€</div>
    <div style="margin-left:auto;">
      <button type="button" class="edit-btn">
        <i class="fa-solid fa-trash">Edit</i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fa-solid fa-trash">Delete</i>
      </button>
    </div>
  </div>
  <div class="extra-ingredient-summary"  style="margin-left: 10%;"></div>
  <div class="dish-ingredient">
    ${firstIngredient
      .map((ingredient) => showExtraIngredient(ingredient))
      .join("")}
  <i class="more-ingredient-link">more extra</i>
  </div >
  `;

  // Add content to the elem.
  dishElm.innerHTML = contentDish;

  // Add item to the list.
  dishList.appendChild(dishElm);

  // add event listeners to both buttons;
  const checkIngredients = dishElm.querySelectorAll(".ingredient-check");
  const deleteBtn = dishElm.querySelector(".delete-btn");
  const editBtn = dishElm.querySelector(".edit-btn");
  const openIngredientBtn = dishElm.querySelector(".more-ingredient-link");

  checkIngredients.forEach((checkElm) =>
    checkElm.addEventListener("click", (e) => addExtraIngredient(e, dishElm))
  );
  deleteBtn.addEventListener("click", (e) => deleteDish(e, dishData));
  editBtn.addEventListener("click", (e) => editDish(e, dishData));

  // Open Modal more extra ingredients
  openIngredientBtn.addEventListener("click", (e) =>
    openIngredient(e, dishElm)
  );
}

//Agregar lo que voy a quitar del orden
function addDish(dish) {
  const dishData = { ...dish, id: customId(dish) };
  const dishElm = document.createElement("div");

  dishElm.setAttribute("class", "dish-item");
  dishElm.setAttribute("data-id", dishData.id);

  const firstIngredient = ingredients.slice(0, 3);

  const contentDish = `
  <div class="dish-detail">
    <div>${dish.title} ${dish.price}€</div>
    <div style="margin-left:auto;">
      <button type="button" class="edit-btn">
        <i class="fa-solid fa-trash">Edit</i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fa-solid fa-trash">Delete</i>
      </button>
    </div>
    
  </div>
  <div class="extra-ingredient-summary"  style="margin-left: 10%;"></div>
  <div class="dish-ingredient">
    ${firstIngredient
      .map((ingredient) => showExtraIngredient(ingredient))
      .join("")}
  <i class="more-ingredient-link">more extra</i>
  </div >
  `;

  // Add content to the elem.
  dishElm.innerHTML = contentDish;

  // Add item to the list.
  dishList.appendChild(dishElm);

  // plato guardado en el storage
  selectedDishByClient.push(dishData);
  saveLocalStorage("storageClient", JSON.stringify(selectedDishByClient));

  // add event listeners to both buttons;
  const checkIngredients = dishElm.querySelectorAll(".ingredient-check");
  const deleteBtn = dishElm.querySelector(".delete-btn");
  const editBtn = dishElm.querySelector(".edit-btn");
  const openIngredientBtn = dishElm.querySelector(".more-ingredient-link");

  checkIngredients.forEach((checkElm) =>
    checkElm.addEventListener("click", (e) => addExtraIngredient(e, dishElm))
  );
  deleteBtn.addEventListener("click", (e) => deleteDish(e, dishData));
  editBtn.addEventListener("click", (e) => editDish(e, dishData));

  // Open Modal more extra ingredients
  openIngredientBtn.addEventListener("click", (e) =>
    openIngredient(e, dishElm)
  );
}

// agregar los extra ingredients al orden
function addExtraIngredient(e, dishElm) {
  const chkElm = e.currentTarget;
  const extraListElm = dishElm.querySelector(".extra-ingredient-summary");
  const currentIngredient = chkElm.getAttribute("data-value");
  const dishId = dishElm.getAttribute("data-id");
  const dishIndex = selectedDishByClient.findIndex((dish) => dish.id == dishId);
  let selectedDish = selectedDishByClient.find((dish) => dish.id == dishId);

  if (chkElm.checked) {
    // agrega ingrendiente
    const selectedIngredients = [
      ...selectedDish?.ingredients,
      currentIngredient,
    ];
    selectedDish = { ...selectedDish, ingredients: selectedIngredients };
  } else {
    // remueve ingrediente
    selectedDish.ingredients = selectedDish.ingredients.filter(
      (ingredient) => ingredient !== currentIngredient
    );
  }
  // update selected Dish
  updateDish(dishIndex, selectedDish);
  // Add to html list
  extraListElm.innerHTML = selectedDish.ingredients?.join();
}

// update Ingredients to dish
function updateDish(index, updatedDish) {
  selectedDishByClient[index] = updatedDish;
  saveLocalStorage("storageClient", JSON.stringify(selectedDishByClient));
}

function deleteDish(e, dishData) {
  // Remove Element from the list
  // const removeElm = e.currentTarget.parentElement.parentElement;
  const removeElm = e.currentTarget.closest(".dish-item");
  dishList.removeChild(removeElm);
  selectedDishByClient = selectedDishByClient.filter(
    (item) => item.id !== dishData.id
  );
  //Remove from local storage
  saveLocalStorage("storageClient", JSON.stringify(selectedDishByClient));
}

function editDish(e, dish) {
  // const itemElm = e.currentTarget.parentElement.parentElement.parentElement;
  const itemElm = e.currentTarget.closest(".dish-item");
  const dishIngredientElm = itemElm.querySelector(".dish-ingredient");
  dishIngredientElm.classList.toggle("active");
}

function saveLocalStorage(itemName, value) {
  localStorage.setItem(itemName, value);
}

function customId(dish) {
  const name = dish.title.replaceAll(" ", "");
  return `${Date.now()}@${name}`;
}

// Modal Extra Ingredients
function openIngredient(e, elm) {
  // Build Modal
  showIngredients(ingredients.slice(3, ingredients.length), elm);
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function closeModalIngredient() {
  console.log("Close modal");
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

/* Set the width of the side navigation to 250px */
/* Esto abre el nav
Agregar plato en la lista */
function openNav(id) {
  menuNav.style.width = "250px";
  if (id) {
    const dish = menuFood.find((item) => item.id === id);
    addDish(dish);
  }
}

/* Set the width of the side navigation to 0 
Cierra el Nav*/
function closeNav() {
  menuNav.style.width = "0";
  // menuApp.style.display = "none";
}

/////////////////////////////////////////

/*animacion con scrollreveal para el menu que baja, banner, y para los box textos del footer*/
w.sr = ScrollReveal();
sr.reveal(".menu", {
  duration: 3000,
  origin: "bottom",
  distance: "-100px",
});

sr.reveal(".verduras", {
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

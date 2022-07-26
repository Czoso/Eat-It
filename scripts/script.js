const previousPage = document.querySelector(".fa-angles-left");
const nextPage = document.querySelector(".fa-angles-right");
const navi = Array.from(document.querySelectorAll("li"));
const nameSubmitButton = document.querySelector("div.submit");
const nameInput = document.querySelector("div.nameContent input");
const menuContent = [
  "Name",
  "Ingredients",
  "Description",
  "Time",
  "Tags",
  "Photo",
];
let dishName;
const dishes = [];
const dish = function (name) {
  name: name;
  ingredients: [];
  description: missing;
  time: missing;
  tags: [];
  photo: missing;
};
const changingNextMenu = [
  { transform: "scale(0.1)" },
  { transform: "scale(1)" },
];
const changingMenuTiming = {
  duration: 200,
  iterations: 1,
};
let activeMenuIndex = 0;
const indexCheck = function (element, index) {
  if (element.classList.contains("active")) {
    activeMenuIndex = index;
    console.log(index);
  }
};

previousPage.addEventListener("click", () => {
  navi.forEach(indexCheck);
  if (activeMenuIndex > 0) {
    navi[activeMenuIndex].textContent = " ";
    navi[activeMenuIndex - 1].textContent = menuContent[activeMenuIndex - 1];
    navi[activeMenuIndex].classList.toggle("active");
    navi[activeMenuIndex - 1].classList.toggle("active");
    navi[activeMenuIndex - 1].animate(changingNextMenu, changingMenuTiming);
  }
});
nextPage.addEventListener("click", () => {
  navi.forEach(indexCheck);
  if (activeMenuIndex < 5) {
    navi[activeMenuIndex].textContent = " ";
    navi[activeMenuIndex + 1].textContent = menuContent[activeMenuIndex + 1];
    navi[activeMenuIndex].classList.toggle("active");
    navi[activeMenuIndex + 1].classList.toggle("active");
    navi[activeMenuIndex + 1].animate(changingNextMenu, changingMenuTiming);
  }
});
nameSubmitButton.addEventListener("click", () => {
  navi.forEach(indexCheck);
  navi[activeMenuIndex].textContent = " ";
  navi[activeMenuIndex + 1].textContent = menuContent[activeMenuIndex + 1];
  navi[activeMenuIndex].classList.toggle("active");
  navi[activeMenuIndex + 1].classList.toggle("active");
  navi[activeMenuIndex + 1].animate(changingNextMenu, changingMenuTiming);
  dishName = nameInput.value;
  nameInput.value = "";
});

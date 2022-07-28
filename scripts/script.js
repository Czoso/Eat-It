const previousPage = document.querySelector(".fa-angles-left");
const nextPage = document.querySelector(".fa-angles-right");
const navi = Array.from(document.querySelectorAll("li"));
const nameSubmitButton = document.querySelector("div.nameSubmit");
const nameInput = document.querySelector("div.nameContent input");
const nameContent = document.querySelector("div.nameContent");
const newDishContent = document.querySelector("div.newDishContent");
const ingredientContent = document.querySelector("div.ingredientsContent");
const descriptionContent = document.querySelector("div.descriptionContent");
const timeContent = document.querySelector("div.timeContent");
const tagsContent = document.querySelector("div.tagsContent");
const photoContent = document.querySelector("div.photoContent");
const addIngredient = document.querySelector("div.addIngredient");
const ingredientBracket = document.querySelector("div.ingredientBracket");
const ingredientNameInput = document.querySelector("input.ingredientName");
const ingredientQuantityInput = document.querySelector(
  "input.ingredientQuantity"
);
const ingredientSubmit = document.querySelector("div.ingredientSubmit");
const ingredientTypeInput = Array.from(
  document.querySelectorAll("input.ingredientType")
);
const ingredientsSubmitButton = document.querySelector("div.ingredientsSubmit");
let deleteButtons;
let deletedIngredient;
let dishName;
let dishIngredients;
let ingredientName;
let ingredientQuantity;
let ingredientType;
const animationDuration = 200;
// Menu
const menuContent = [
  "Name",
  "Ingredients",
  "Description",
  "Time",
  "Tags",
  "Photo",
];
const newRecipeContent = [
  nameContent,
  ingredientContent,
  descriptionContent,
  timeContent,
  tagsContent,
  photoContent,
];
const ingredients = [];
function ingredient(name, quantity, type) {
  this.name = name;
  this.quantity = quantity;
  this.type = type;
}
const dishes = [];
const dish = function (name, ingredients, description, time, tags, photo) {
  dishName: name;
  ingredients: ingredients;
  description: description;
  time: time;
  tags: tags;
  photoSrc: photo;
};
const changingNextMenu = [
  { transform: "scale(0.1)" },
  { transform: "scale(1)" },
];
const changingNextPage = [
  { transform: "translateX(0)" },
  { transform: "translateX(-50%)" },
];
const changingPreviousPage = [
  { transform: "translateX(-50%)" },
  { transform: "translateX(0)" },
];
const changingMenuTiming = {
  duration: animationDuration,
  iterations: 1,
};
let activeMenuIndex = 0;
const indexCheck = function (element, index) {
  if (element.classList.contains("active")) {
    activeMenuIndex = index;
  }
};
const changingNewDishContent = function (index) {
  newRecipeContent[index].style.display = "none";
};
const changingMenu = function (direction) {
  navi.forEach(indexCheck);
  if (direction == "next") {
    if (activeMenuIndex < 5) {
      navi[activeMenuIndex].textContent = " ";
      navi[activeMenuIndex + 1].textContent = menuContent[activeMenuIndex + 1];
      navi[activeMenuIndex].classList.toggle("active");
      navi[activeMenuIndex + 1].classList.toggle("active");
      navi[activeMenuIndex + 1].animate(changingNextMenu, changingMenuTiming);
      newDishContent.style.animationFillMode = "forwards";
      setTimeout(() => {
        changingNewDishContent(activeMenuIndex);
        setTimeout(() => {
          newDishContent.style.animationFillMode = "none";
        }, 200);
      }, 200);
      newDishContent.animate(changingNextPage, changingMenuTiming);
      newRecipeContent[activeMenuIndex + 1].style.display = "flex";
    }
  }
  if (direction == "previous") {
    if (activeMenuIndex > 0) {
      navi[activeMenuIndex].textContent = " ";
      navi[activeMenuIndex - 1].textContent = menuContent[activeMenuIndex - 1];
      navi[activeMenuIndex].classList.toggle("active");
      navi[activeMenuIndex - 1].classList.toggle("active");
      navi[activeMenuIndex - 1].animate(changingNextMenu, changingMenuTiming);
      newDishContent.style.animationFillMode = "forwards";
      setTimeout(() => {
        changingNewDishContent(activeMenuIndex);
        newDishContent.style.animationFillMode = "none";
      }, 200);
      newDishContent.animate(changingPreviousPage, changingMenuTiming);
      newRecipeContent[activeMenuIndex - 1].style.display = "flex";
    }
  }
};

previousPage.addEventListener("click", () => {
  changingMenu("previous");
});
nextPage.addEventListener("click", () => {
  changingMenu("next");
});
// Name
nameSubmitButton.addEventListener("click", () => {
  changingMenu("next");
  dishName = nameInput.value;
  nameInput.value = "";
});
// Ingredients
const inputTypeCheck = function (element) {
  if (element.checked) {
    ingredientType = element.value;
  }
};
const ingredientBracketAnimation = [
  { transform: "translateY(100%)", display: "flex" },
  { transform: "translateY(0)" },
];
const ingredientBracketAnimationReversed = [
  { transform: "translateY(0)" },
  { transform: "translateY(100%)", display: "none" },
];
const deleteIngredients = function (element) {
  element.remove();
};
const ingredientsDisplay = function (element, index) {
  const addedIngredient = document.createElement("div");
  ingredientContent.appendChild(addedIngredient);
  addedIngredient.classList.add(`addedIngredient`, `ingredient${index}`);
  const addedIngredientName = document.createElement("p");
  addedIngredient.appendChild(addedIngredientName);
  addedIngredientName.classList.add("addedIngredientName");
  addedIngredientName.textContent = element.name;
  const deleteButton = document.createElement("i");
  addedIngredient.appendChild(deleteButton);
  deleteButton.classList.add(
    "fa-solid",
    "fa-circle-minus",
    `ingredient${index}`
  );

  deleteButtons = [];
  deleteButtons = Array.from(document.querySelectorAll("i.fa-circle-minus"));
  // deleteButtons.forEach(removeEventListener("click", deleteIngredient));
  deleteButtons.forEach(deleteButtonFunction);
};
const deleteIngredient = function () {
  // console.log(deleteButtons.indexOf(this));
  const deleteIndex = deleteButtons.indexOf(this);
  ingredients.splice(deleteIndex, 1);
  ingredientsUpdate();
};
const deleteButtonFunction = function (element) {
  element.addEventListener("click", deleteIngredient);
};
const ingredientsUpdate = function () {
  const addedIngredients = document.querySelectorAll("div.addedIngredient");
  addedIngredients.forEach(deleteIngredients);
  ingredients.forEach(ingredientsDisplay);
  ingredientContent.appendChild(addIngredient);
  ingredientContent.appendChild(ingredientsSubmitButton);
};
const ingredientBracketAppear = function (ingredientsQuantity) {
  ingredientsSubmitButton.style.display = "none";
  ingredientContent.appendChild(ingredientBracket);
  ingredientBracket.style.display = "flex";
  ingredientBracket.animate(ingredientBracketAnimation, changingMenuTiming);
  const addedIngredients = document.querySelectorAll("div.addedIngredient");
  ingredientNameInput.value = "";
  ingredientQuantityInput.value = "";
  addIngredient.scrollIntoView();
};
addIngredient.addEventListener("click", () => {
  ingredientBracketAppear();
});
ingredientSubmit.addEventListener("click", () => {
  ingredientTypeInput.forEach(inputTypeCheck);
  ingredientName = ingredientNameInput.value;
  ingredientQuantity = ingredientQuantityInput.value;
  const newIngredient = new ingredient(
    ingredientName,
    ingredientQuantity,
    ingredientType
  );
  ingredients.push(newIngredient);
  setTimeout(() => {
    ingredientsUpdate();
  }, animationDuration);
  ingredientBracket.animate(
    ingredientBracketAnimationReversed,
    changingMenuTiming
  );

  setTimeout(() => {
    ingredientBracket.style.display = "none";
  }, animationDuration);
  ingredientsSubmitButton.style.display = "block";
});
ingredientsSubmitButton.addEventListener("click", () => {
  changingMenu("next");
  dishIngredients = ingredients;
});

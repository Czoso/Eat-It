const newDishLogo = document.querySelector("div.newDishLogo");
const previousPage = document.querySelector(".fa-angles-left");
const nextPage = document.querySelector(".fa-angles-right");
const navi = Array.from(document.querySelectorAll("li"));
const nameSubmitButton = document.querySelector("div.nameSubmit");
const nameInput = document.querySelector("div.nameContent textArea");
const nameContent = document.querySelector("div.nameContent");
const newDishContent = document.querySelector("div.newDishContent");
const ingredientContent = document.querySelector("div.ingredientsContent");
const descriptionContent = document.querySelector("div.descriptionContent");
const overviewContent = document.querySelector("div.overviewContent");
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
const ingredientTypeName = document.querySelectorAll("div.ingredientInput p");
const ingredientsSubmitButton = document.querySelector("div.ingredientsSubmit");
const descriptionSubmitButton = document.querySelector("div.descriptionSubmit");
const descriptionInput = document.querySelector("textarea.dishDescription");
const tagsSubmitButton = document.querySelector("div.tagsSubmit");
const tagsImage = document.querySelectorAll("img.tagImage");
const photoInput = document.querySelector("input.photoInput");
const displayedImageBracket = document.querySelector("div.photoDisplay");
const photoSubmitButton = document.querySelector("div.photoSubmit");
const overviewDishName = document.querySelector("div.overviewDishName h1");
const overviewPhotoDisplay = document.querySelector("div.overviewPhotoDisplay");
const overviewIngredientsList = document.querySelector(
  "div.overviewIngredients"
);
const overviewDescription = document.querySelector("div.overviewDescription");

let deleteButtons;
let deletedIngredient;
let dishName = "missing dish name";
let dishIngredients = "missing dish ingredients";
let dishDescription = "missing dish description";
let ingredientName;
let ingredientQuantity;
let ingredientType;
let uploadedImage;
let tags = [];
const activatedTags = [];
const animationDuration = 200;
// Menu
const menuContent = [
  "Name",
  "Ingredients",
  "Description",
  "Tags",
  "Photo",
  "Overview",
];
const newRecipeContent = [
  nameContent,
  ingredientContent,
  descriptionContent,
  tagsContent,
  photoContent,
  overviewContent,
];
const ingredients = [];
function ingredient(name, quantity, type) {
  this.name = name;
  this.quantity = quantity;
  this.type = type;
}
const dishes = [];
const dish = function (name, ingredients, description, tags, photo) {
  dishName: name;
  ingredients: ingredients;
  description: description;
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
  // navi.forEach(indexCheck);
  if (direction == "next") {
    if (activeMenuIndex < 5) {
      navi[activeMenuIndex].textContent = " ";
      navi[activeMenuIndex + 1].textContent = menuContent[activeMenuIndex + 1];
      navi[activeMenuIndex].classList.toggle("active");
      navi[activeMenuIndex + 1].classList.toggle("active");
      navi[activeMenuIndex + 1].animate(changingNextMenu, changingMenuTiming);
      newDishContent.style.animationFillMode = "forwards";
      setTimeout(() => {
        changingNewDishContent(activeMenuIndex - 1);
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
      console.log(activeMenuIndex);
      setTimeout(() => {
        changingNewDishContent(activeMenuIndex + 1);
        newDishContent.style.animationFillMode = "none";
      }, 200);
      newDishContent.animate(changingPreviousPage, changingMenuTiming);
      newRecipeContent[activeMenuIndex - 1].style.display = "flex";
    }
  }
  navi.forEach(indexCheck);
  console.log(activeMenuIndex);
  if (activeMenuIndex == 5) {
    newDishLogo.style.display = "none";
  } else {
    newDishLogo.style.display = "block";
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
  if (nameInput.value == "") {
    nameInput.style.boxShadow = "red 0 0 5px";
    nameInput.placeholder = "Enter dish name before next step please";
  } else {
    changingMenu("next");
    dishName = nameInput.value;
    overviewDishName.textContent = dishName;
    nameInput.style.boxShadow = "none";
  }
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
  const ingredientTypeName = element.type;
  const ingredientTypeMarker = function (element) {
    if (element.value == ingredientTypeName) {
      element.checked = true;
    }
  };
  addedIngredientName.addEventListener("click", () => {
    ingredientBracketAppear;
    ingredientNameInput.value = ingredients[index].name;
    ingredientQuantityInput.value = ingredients[index].quantity;
    ingredientTypeInput.forEach(ingredientTypeMarker);
    ingredients.splice(index, 1);
  });
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
const ingredientBracketAppear = function () {
  ingredientsSubmitButton.style.display = "none";
  ingredientContent.appendChild(ingredientBracket);
  ingredientBracket.style.display = "flex";
  ingredientBracket.animate(ingredientBracketAnimation, changingMenuTiming);
  const addedIngredients = document.querySelectorAll("div.addedIngredient");
  ingredientNameInput.value = "";
  ingredientQuantityInput.value = "";
  addIngredient.scrollIntoView();
};
const ingredientTypeMarkNotChecked = function (element) {
  element.style.textShadow = "red 1px 1px 5px";
};
const ingredientTypeMarkChecked = function (element) {
  element.style.textShadow = "#cfc 1px 1px 5px";
};
const setToNotChecked = function (element) {
  element.checked = false;
};
addIngredient.addEventListener("click", () => {
  ingredientBracketAppear();
});
ingredientSubmit.addEventListener("click", () => {
  let ingredientTypeCheck = false;
  const ingredientTypeMarkCheck = function (element) {
    if (element.checked) {
      ingredientTypeCheck = true;
    }
  };
  ingredientTypeInput.forEach(ingredientTypeMarkCheck);
  if (ingredientNameInput.value == "") {
    ingredientNameInput.style.boxShadow = "red 1px 1px 5px";
  } else if (ingredientQuantityInput.value == "") {
    ingredientNameInput.style.boxShadow = "none";
    ingredientQuantityInput.style.boxShadow = "red 1px 1px 5px";
  } else if (!ingredientTypeCheck) {
    console.log(ingredientTypeCheck);

    ingredientQuantityInput.style.boxShadow = "none";
    ingredientNameInput.style.boxShadow = "none";
    ingredientTypeName.forEach(ingredientTypeMarkNotChecked);
  } else {
    console.log(ingredientTypeCheck);
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
    ingredientNameInput.style.boxShadow = "none";
    ingredientQuantityInput.style.boxShadow = "none";
    ingredientTypeName.forEach(ingredientTypeMarkChecked);
    ingredientTypeInput.forEach(setToNotChecked);
  }
});
ingredientsSubmitButton.addEventListener("click", () => {
  changingMenu("next");
  dishIngredients = ingredients;
  dishIngredients.forEach(ingredientsOverviewDisplay);
});
//Description
descriptionSubmitButton.addEventListener("click", () => {
  changingMenu("next");
  dishDescription = descriptionInput.value;
  overviewDescription.textContent = dishDescription;
});
//Tags
const activeTag = [
  { boxShadow: "black 1px 1px 5px" },
  { boxShadow: "#cfc 2px 2px 10px" },
];
const inactiveTag = [
  { boxShadow: "#cfc 2px 2px 10px" },
  { boxShadow: "black 1px 1px 5px" },
];
const clickedTag = function () {
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    this.animate(activeTag, animationDuration);
    setTimeout(() => {
      this.style.boxShadow = "#cfc 2px 2px 10px";
    }, animationDuration);
  } else {
    this.animate(inactiveTag, animationDuration);
    console.log("nie ma active");
    console.log(this);

    setTimeout(() => {
      this.style.boxShadow = "black 1px 1px 5px";
    }, animationDuration);
  }
};
const tagEvent = function (element) {
  element.addEventListener("click", clickedTag);
};
tagsImage.forEach(tagEvent);
const tagActiveCheck = function (element) {
  if (element.classList.contains("active")) {
    activatedTags.push(element);
  }
};
const tagClearFunction = function (element, index, array) {
  array.remove(element);
};
tagsSubmitButton.addEventListener("click", () => {
  activatedTags.forEach(tagClearFunction);
  tagsImage.forEach(tagActiveCheck);
  tags = activatedTags;
  changingMenu("next");
});
//photo
photoInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    displayedImageBracket.style.backgroundImage = `url(${uploadedImage})`;
  });
  reader.readAsDataURL(this.files[0]);
});
photoSubmitButton.addEventListener("click", () => {
  overviewPhotoDisplay.style.backgroundImage = `url(${uploadedImage})`;
  changingMenu("next");
});
//overview
const ingredientsOverviewDisplay = function (element, index) {
  const overviewIngredient = document.createElement("div");
  overviewIngredient.classList.add("overviewIngredient");
  overviewIngredient.textContent = `${element.name} - ${element.quantity} ${element.type}`;
  overviewIngredientsList.appendChild(overviewIngredient);
};

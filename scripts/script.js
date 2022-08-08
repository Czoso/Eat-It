// MAIN MENU
// MAIN MENU
// MAIN MENU
const mainMenu = document.querySelector("div.mainMenu");
const newDishButton = document.querySelector("div.newDishButton");
const newDish = document.querySelector("div.newDish");
const mainMenuDisappear = [
  { transform: "translateY(0)", opacity: "100%" },
  { transform: "translateY(20px)", opacity: "0" },
];
const mainMenuAppear = [
  { transform: "translateY(20px)", opacity: "0" },
  { transform: "translateY(0)", opacity: "100%" },
];
const disappearing = (content) => {
  content.animate(mainMenuDisappear, animationDuration);
  setTimeout(() => {
    content.style.display = "none";
  }, animationDuration);
};
const appearing = (content) => {
  setTimeout(() => {
    content.style.display = "flex";
    content.animate(mainMenuAppear, animationDuration);
  }, animationDuration);
};
newDishButton.addEventListener("click", () => {
  disappearing(mainMenu);
  appearing(newDish);
});
// NEW DISH
// NEW DISH
// NEW DISH
const newDishExitButton = document.querySelector("div.newDishExitButton");
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
const tagsImage = Array.from(document.querySelectorAll("img.tagImage"));
const photoInput = document.querySelector("input.photoInput");
const displayedImageBracket = document.querySelector("div.photoDisplay");
const dishPhotos = document.querySelectorAll("img.photo");
const photoSubmitButton = document.querySelector("div.photoSubmit");
const overviewDishName = document.querySelector("div.overviewDishName h1");
const overviewTagImage = document.querySelectorAll("img.overviewTagImage");
const overviewPhotoDisplay = document.querySelector("div.overviewPhotoDisplay");
const overviewIngredientsList = document.querySelector(
  "div.overviewIngredients"
);
const overviewDescription = document.querySelector("div.overviewDescription");
const dishSubmitButton = document.querySelector("div.dishSubmit");

let deleteButtons;
let deletedIngredient;
let dishName = "";
let dishIngredients = "";
let dishDescription = "";
let ingredientName;
let ingredientQuantity;
let ingredientType;
let uploadedImage = "";
let tags = [];
const activatedTags = [];
const animationDuration = 200;
const capitalizeFirstLetter = (string) => {
  const firstLetter = string[0].toUpperCase();
  return firstLetter + string.slice(1);
};

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
      setTimeout(() => {
        changingNewDishContent(activeMenuIndex + 1);
        newDishContent.style.animationFillMode = "none";
      }, 200);
      newDishContent.animate(changingPreviousPage, changingMenuTiming);
      newRecipeContent[activeMenuIndex - 1].style.display = "flex";
    }
  }
  navi.forEach(indexCheck);
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
    overviewDishName.textContent = capitalizeFirstLetter(dishName);
    nameInput.style.boxShadow = "none";
  }
  overviewSubmitDisplay();
});
newDishExitButton.addEventListener("click", () => {
  const disactivateTags = (element, index) => {
    if (element.classList.contains("active")) {
      element.classList.toggle("active");
      element.style.boxShadow = "black 1px 1px 5px";
      overviewTagImage[index].style.display = "none";
    }
  };
  disappearing(newDish);
  appearing(mainMenu);
  dishName = "";
  dishIngredients = "";
  nameInput.value = "";
  ingredients.splice(0, ingredients.length);
  ingredientsUpdate();
  ingredientsOverviewDelete();
  descriptionInput.value = "";
  dishDescription = "";
  tagsImage.forEach(disactivateTags);
  overviewIngredientsList.style.display = "none";
  overviewDishName.textContent = "";
  overviewDescription.textContent = "";
  overviewDescription.style.display = "none";
  dishSubmitButton.style.display = "none";
  displayedImageBracket.style.display = "none";
  overviewPhotoDisplay.style.display = "none";
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
  addedIngredientName.textContent = capitalizeFirstLetter(element.name);
  const ingredientTypeName = element.type;
  const ingredientTypeMarker = function (element) {
    if (element.value == ingredientTypeName) {
      element.checked = true;
    }
  };
  addedIngredientName.addEventListener("click", () => {
    ingredientBracketAppear();
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
  deleteButtons.forEach(deleteButtonFunction);
};
const deleteIngredient = function () {
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
addIngredient.addEventListener("click", ingredientBracketAppear);
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
    ingredientTypeInput.forEach(inputTypeCheck);
    ingredientName = ingredientNameInput.value;
    ingredientQuantity = ingredientQuantityInput.value;
    const newIngredient = new ingredient(
      capitalizeFirstLetter(ingredientName),
      ingredientQuantity,
      capitalizeFirstLetter(ingredientType)
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
  ingredientsOverviewDelete();
  overviewSubmitDisplay();
  dishIngredients = ingredients;
  dishIngredients.forEach(ingredientsOverviewDisplay);

  if (ingredients.length > 0) {
    overviewIngredientsList.style.display = "flex";
  } else {
    overviewIngredientsList.style.display = "none";
  }
});
//Description
descriptionSubmitButton.addEventListener("click", () => {
  if (descriptionInput.value == "") {
    descriptionInput.style.boxShadow = "red 0 0 5px";
    descriptionInput.placeholder =
      "Enter dish description before next step please";
    overviewDescription.style.display = "none";
  } else {
    changingMenu("next");
    dishDescription = descriptionInput.value;
    overviewDescription.textContent = capitalizeFirstLetter(dishDescription);
    descriptionInput.style.boxShadow = "none";
    overviewDescription.style.display = "flex";
  }
  overviewSubmitDisplay();
});
//Tags
const activeTag = [
  { boxShadow: "black 1px 1px 5px" },
  { boxShadow: "#bb2 2px 2px 10px" },
];
const inactiveTag = [
  { boxShadow: "#bb2 2px 2px 10px" },
  { boxShadow: "black 1px 1px 5px" },
];

tagsImage.forEach((element) => {
  const setDisplayed = (tag, index) => {
    if (index === tagsImage.indexOf(element)) {
      tag.style.display = "block";
    }
  };
  const setNotDisplayed = (tag, index) => {
    if (index === tagsImage.indexOf(element)) {
      tag.style.display = "none";
    }
  };
  const clickedTag = function () {
    this.classList.toggle("active");
    if (this.classList.contains("active")) {
      overviewTagImage.forEach(setDisplayed);
      this.animate(activeTag, animationDuration);
      setTimeout(() => {
        this.style.boxShadow = "#bb2 2px 2px 10px";
      }, animationDuration);
    } else {
      overviewTagImage.forEach(setNotDisplayed);
      this.animate(inactiveTag, animationDuration);

      setTimeout(() => {
        this.style.boxShadow = "black 1px 1px 5px";
      }, animationDuration);
    }
  };
  element.addEventListener("click", clickedTag);
});
const tagActiveCheck = function (element) {
  if (element.classList.contains("active")) {
    activatedTags.push(element);
  }
};
const tagClearFunction = function (element, index, array) {
  array.splice(index, 1);
};
tagsSubmitButton.addEventListener("click", () => {
  activatedTags.splice(0, activatedTags.length);
  tagsImage.forEach(tagActiveCheck);
  tags = activatedTags;
  changingMenu("next");
  overviewSubmitDisplay();
});
//photo
photoInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    displayedPhoto = new Image();

    dishPhotos.forEach((element) => {
      element.setAttribute("src", reader.result);
    });
    displayedImageBracket.style.display = "inline-flex";
    overviewPhotoDisplay.style.display = "inline-flex";
  });
  reader.readAsDataURL(this.files[0]);
});

photoSubmitButton.addEventListener("click", () => {
  if (uploadedImage) {
    overviewPhotoDisplay.style.backgroundImage = `url(${uploadedImage})`;
    changingMenu("next");
  }
  changingMenu("next");
  overviewSubmitDisplay();
});
//overview
const overviewSubmitDisplay = () => {
  if (!dishName) {
    dishSubmitButton.style.display = "none";
  } else if (!dishDescription) {
    dishSubmitButton.style.display = "none";
  } else if (ingredients.length < 1) {
    dishSubmitButton.style.display = "none";
  } else {
    dishSubmitButton.style.display = "block";
  }
};
const ingredientsOverviewDelete = () => {
  const ingredientsToDelete = Array.from(
    document.querySelectorAll("div.overviewIngredient")
  );
  let deleteCounter = 0;
  ingredientsToDelete.forEach((element) => {
    if (element.classList.contains("overviewIngredient")) {
      element.remove();
    } else {
      deleteCounter++;
    }
  });
};
const ingredientsOverviewDisplay = function (element, index) {
  const overviewIngredient = document.createElement("div");
  overviewIngredient.classList.add("overviewIngredient");
  overviewIngredient.textContent = `${element.name} - ${element.quantity} ${element.type}`;
  overviewIngredientsList.appendChild(overviewIngredient);
};

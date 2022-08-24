// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {
  getDatabase,
  set,
  get,
  ref,
  remove as dbRemove,
  update,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAO7JMLqcEo3Jrcg3p9t1-Lmg_lxXVA1I",
  authDomain: "eat-it-a4c55.firebaseapp.com",
  databaseURL:
    "https://eat-it-a4c55-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eat-it-a4c55",
  storageBucket: "eat-it-a4c55.appspot.com",
  messagingSenderId: "314439023911",
  appId: "1:314439023911:web:d15c9605db621e5ec1bd02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const user = auth.currentUser;
let loggedUserPhoto = "";
let userID;
let currentUsername;
let uploadedDishes;
const userPhoto = document.querySelector("img.userPhoto");
const userPhotoLabel = document.querySelector("label.userPhotoInput");
const userPhotoInput = document.querySelector("input.userPhotoInput");
const signinSubmitButton = document.querySelector("div.signinSubmitButton");
const loginSubmitButton = document.querySelector("div.loginSubmitButton");
const userNameDisplayer = document.querySelector("div.userNameDisplayer");
signinSubmitButton.addEventListener("click", (e) => {
  let email = document.querySelector("input.eMailSignin").value;
  let password = document.querySelector("input.passwordSignin").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid, user.uid), {
        email: email,
        username: "Chilled Carrot",
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/eat-it-a4c55.appspot.com/o/images%2FdefaultPhoto.png?alt=media&token=91fbb604-6d71-4b27-bc83-d3b244731f10",
      });
      set(ref(database, "users/" + user.uid + "/dishes"), {
        dishes: [],
      });
      alert("User created! Please log in");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});
loginSubmitButton.addEventListener("click", (e) => {
  let email = document.querySelector("input.eMailLogin").value;
  let password = document.querySelector("input.passwordLogin").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      userID = user.uid;
      const dt = new Date();
      update(ref(database, "users/" + user.uid, user.uid), {
        last_login: dt,
      });
      const photoURLRef = ref(database, "users/" + user.uid + "/photoURL");
      onValue(photoURLRef, (snapshot) => {
        loggedUserPhoto = snapshot.val();
        userPhotoLabel.style.backgroundImage = `url(${loggedUserPhoto})`;
      });
      const dishesURLRef = ref(database, "users/" + userID + "/dishes");
      onValue(dishesURLRef, (snapshot) => {
        if (snapshot.exists()) {
          dishes = snapshot.val();
        }
      });
      const usernameURLRef = ref(database, "users/" + userID + "/username");
      onValue(usernameURLRef, (snapshot) => {
        currentUsername = snapshot.val();
        userNameDisplayer.textContent = snapshot.val();
      });
      const uploadedDishesRef = ref(database, "dishes/uploadedDishes");
      onValue(uploadedDishesRef, (snapshot) => {
        if (snapshot.exists()) {
          uploadedDishes = snapshot.val();
        }
      });
      createdRecipesDisplay();
      uploadedRecipesDisplay();
      loginDisappear();
      alert("Logged in!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
onAuthStateChanged(auth, (user) => {
  if (user) {
    userPhotoInput.addEventListener("change", imageUpload);

    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
// LOGIN
const signinContent = document.querySelector("div.signinContent");
const loginContent = document.querySelector("div.loginContent");
const signinChangeButton = document.querySelector("div.signinChangeButton");
const loginChangeButton = document.querySelector("div.loginChangeButton");
const windowContent = document.querySelector("div.windowContent");
const continueButtons = Array.from(
  document.querySelectorAll("div.continueButton")
);
const loginBlur = document.querySelector("div.loginBlur");
const changingLoginWindow = (direction) => {
  if (animationStatus) {
    animationStatus = false;
    if (direction == "sign") {
      loginContent.style.display = "flex";
      windowContent.animate(changingNextPage, 200);

      setTimeout(() => {
        signinContent.style.display = "none";
        animationStatus = true;
      }, 200);
    }
    if (direction == "log") {
      signinContent.style.display = "flex";
      windowContent.animate(changingPreviousPage, 200);

      setTimeout(() => {
        loginContent.style.display = "none";
        animationStatus = true;
      }, 200);
    }
  }
};
const loginDisappear = () => {
  animationStatus = false;
  loginBlur.animate(loginDisappearAnimation, 210);
  setTimeout(() => {
    loginBlur.style.display = "none";
    animationStatus = true;
  }, 200);
};
const loginDisappearAnimation = [{ opacity: "100%" }, { opacity: "0" }];
continueButtons.forEach((e) => {
  e.addEventListener("click", loginDisappear);
});
signinChangeButton.addEventListener("click", () => {
  changingLoginWindow("sign");
});
signinSubmitButton.addEventListener("click", () => {
  changingLoginWindow("sign");
});
loginChangeButton.addEventListener("click", () => {
  changingLoginWindow("log");
});
// loginSubmitButton.addEventListener("click", () => {
//   loginDisappear();
// });

// MAIN MENU
// MAIN MENU
// MAIN MENU
const mainMenu = document.querySelector("div.mainMenu");
const newDishButton = document.querySelector("div.newDishButton");
const yourRecipesButton = document.querySelector("div.yourDishesButton");
const newDish = document.querySelector("div.newDish");
const yourRecipesContent = document.querySelector("div.yourRecipes");
const browser = document.querySelector("div.browser");
const browserButton = document.querySelector("div.browserButton");
const settingsContent = document.querySelector("div.settingsContent");
const settingsButton = document.querySelector("div.settingsButton");
const menuDisappear = [
  { transform: "translateY(0)", opacity: "100%" },
  { transform: "translateY(20px)", opacity: "0" },
];
const menuAppear = [
  { transform: "translateY(20px)", opacity: "0" },
  { transform: "translateY(0)", opacity: "100%" },
];
const disappearing = (content) => {
  content.animate(menuDisappear, animationDuration);
  setTimeout(() => {
    content.style.display = "none";
  }, animationDuration);
};
const appearing = (content) => {
  setTimeout(() => {
    content.style.display = "flex";
    content.animate(menuAppear, animationDuration);
  }, animationDuration);
};
newDishButton.addEventListener("click", () => {
  newRecipeContent.forEach(changingNewDishContent);
  newRecipeContent[0].style.display = "flex";
  disappearing(mainMenu);
  appearing(newDish);
  animationStatus = true;
});
yourRecipesButton.addEventListener("click", () => {
  disappearing(mainMenu);
  appearing(yourRecipesContent);
});
browserButton.addEventListener("click", () => {
  disappearing(mainMenu);
  appearing(browser);
});
settingsButton.addEventListener("click", () => {
  disappearing(mainMenu);
  appearing(settingsContent);
});
// YOUR RECIPES
// YOUR RECIPES
// YOUR RECIPES
const yourRecipesExitButton = document.querySelector(
  "div.yourRecipesExitButton"
);
const yourRecipesBrowser = document.querySelector("div.yourRecipesBrowser");
const recipeList = document.querySelector("div.recipesList");
const yourRecipesOverview = document.querySelector("div.yourRecipeOverview");
const yourRecipeOverviewIngredientsList = document.querySelector(
  "div.yourRecipeOverviewIngredients"
);
const yourRecipeOverviewDescription = document.querySelector(
  "div.yourRecipeOverviewDescription"
);

const yourRecipesOverviewDishName = document.querySelector(
  "div.yourRecipeOverviewDishName h1"
);
const yourRecipesOverviewPhotoDisplay = document.querySelector(
  "div.yourRecipeOverviewPhotoDisplay img"
);
const yourRecipeOverviewTagImage = Array.from(
  document.querySelectorAll("img.yourRecipeOverviewTagImage")
);
const yourRecipeOverviewExitButton = document.querySelector(
  "div.yourRecipeOverviewExitButton"
);
const yourRecipeOverviewDeleteButton = document.querySelector(
  "div.yourRecipeOverviewDeleteButton"
);
const yourRecipeOverviewShareButton = document.querySelector(
  "div.yourRecipeOverviewShareButton"
);
let dishToDelete;
let dishGetCounter = 4;
let uploadGetCounter = 4;
let checkIfListener = false;
const dishToUpload = {
  dishRecipe: [],
  creatorUsername: "",
  creatorID: "",
  creatorPhoto: "",
};
yourRecipesExitButton.addEventListener("click", () => {
  disappearing(yourRecipesContent);
  appearing(mainMenu);
});
yourRecipeOverviewDeleteButton.addEventListener("click", () => {
  dishGetCounter = 0;
  dishToDelete.remove();
  if (dishes.dishes.length == 1) {
    dbRemove(ref(database, "users/" + userID + "/dishes/dishes"));
    disappearing(yourRecipesOverview);
    appearing(yourRecipesBrowser);
  } else {
    dbRemove(
      ref(
        database,
        "users/" +
          userID +
          "/dishes/dishes/" +
          createdRecipes.indexOf(dishToDelete)
      )
    ).then(() => {
      const newDishesList = [...dishes.dishes].filter((e) => {
        return e !== undefined;
      });
      update(ref(database, "users/" + userID + "/dishes"), {
        dishes: newDishesList,
      });
      disappearing(yourRecipesOverview);
      appearing(yourRecipesBrowser);
    });
  }
  createdRecipes.splice(createdRecipes.indexOf(dishToDelete), 1);
});
yourRecipeOverviewExitButton.addEventListener("click", () => {
  disappearing(yourRecipesOverview);
  appearing(yourRecipesBrowser);
});

const recipeOverviewAppearing = function () {
  const buttonToRemove = document.querySelector("img.yourRecipesShareImage");
  if (buttonToRemove !== null) {
    buttonToRemove.remove();
  }
  const yourRecipesShareImage = document.createElement("img");
  yourRecipesShareImage.classList.toggle("yourRecipesShareImage");
  yourRecipesShareImage.classList.toggle("yourRecipeButtonImage");
  yourRecipesShareImage.src = "images/share.png";
  yourRecipeOverviewShareButton.appendChild(yourRecipesShareImage);
  get(
    ref(
      database,
      "users/" + userID + "/dishes/dishes/" + createdRecipes.indexOf(this)
    )
  ).then((snapshot) => {
    if (snapshot.val().recipeShare == true) {
      yourRecipesShareImage.classList.add("active");
    } else {
      yourRecipesShareImage.classList.remove("active");
    }
  });
  const sharingRecipe = () => {
    uploadedRecipesDisplay();
    checkIfListener = true;
    yourRecipesShareImage.classList.toggle("active");
    if (yourRecipesShareImage.classList.contains("active")) {
      update(
        ref(
          database,
          "users/" + userID + "/dishes/dishes/" + createdRecipes.indexOf(this)
        ),
        {
          recipeShare: true,
        }
      );
      get(ref(database, "dishes")).then((snapshot) => {
        let newDishUpload = Object.create(dishToUpload);
        newDishUpload = [
          dishes.dishes[createdRecipes.indexOf(this)],
          currentUsername,
          userID,
          loggedUserPhoto,
        ];
        if (snapshot.exists()) {
          get(ref(database, "dishes/uploadedDishes")).then((snapshot) => {});
          update(ref(database, "dishes"), {
            uploadedDishes: [...uploadedDishes, newDishUpload],
          }).then(() => {
            uploadGetCounter = 4;
          });
        } else {
          set(ref(database, "dishes"), {
            uploadedDishes: new Array(newDishUpload),
          });
        }
      });
    } else {
      update(
        ref(
          database,
          "users/" + userID + "/dishes/dishes/" + createdRecipes.indexOf(this)
        ),
        {
          recipeShare: false,
        }
      ).then(() => {
        uploadGetCounter = 4;
      });
      uploadedDishes.forEach((e, index) => {
        if (
          e[0].recipeName ==
          dishes.dishes[createdRecipes.indexOf(this)].recipeName
        ) {
          if (e[2] == userID) {
            if (uploadedDishes.length == 1) {
              dbRemove(ref(database, "dishes"));
            } else {
              dbRemove(ref(database, "dishes/uploadedDishes/" + index)).then(
                () => {
                  const newUploadedDishesList = [...uploadedDishes].filter(
                    (e) => {
                      return e !== undefined;
                    }
                  );
                  update(ref(database, "dishes"), {
                    uploadedDishes: newUploadedDishesList,
                  }).then(() => {
                    uploadGetCounter = 4;
                  });
                }
              );
            }
          }
        }
      });
    }
  };
  yourRecipesShareImage.addEventListener("click", sharingRecipe);
  disappearing(yourRecipesBrowser);
  appearing(yourRecipesOverview);
  dishToDelete = this;
  yourRecipeOverviewTagImage.forEach((element) => {
    element.style.display = "none";
  });
  yourRecipesOverviewDishName.textContent = capitalizeFirstLetter(
    dishes.dishes[createdRecipes.indexOf(this)].recipeName
  );
  createdRecipes.indexOf(this);
  const yourRecipeIngredientsOverviewDelete = () => {
    const ingredientsToDelete = Array.from(
      document.querySelectorAll("div.yourRecipeOverviewIngredient")
    );
    ingredientsToDelete.forEach((element) => {
      if (element.classList.contains("yourRecipeOverviewIngredient")) {
        element.remove();
      }
    });
  };
  yourRecipeIngredientsOverviewDelete();
  const yourRecipesIngredientsOverviewDisplay = function (element) {
    const overviewIngredient = document.createElement("div");
    overviewIngredient.classList.add("yourRecipeOverviewIngredient");
    overviewIngredient.textContent = `${element.name} - ${element.quantity} ${element.type}`;
    yourRecipeOverviewIngredientsList.appendChild(overviewIngredient);
  };

  dishes.dishes[createdRecipes.indexOf(this)].recipeIngredients.forEach(
    yourRecipesIngredientsOverviewDisplay
  );
  yourRecipeOverviewDescription.textContent =
    dishes.dishes[createdRecipes.indexOf(this)].recipeDescription;
  const yourRecipeTagsDisplay = (element, index) => {
    if (element == true) {
      yourRecipeOverviewTagImage[index].style.display = "block";
    }
  };
  dishes.dishes[createdRecipes.indexOf(this)].recipeTags.forEach(
    yourRecipeTagsDisplay
  );
  // console.log(yourRecipesOverviewPhotoDisplay.src);
  yourRecipesOverviewPhotoDisplay.src =
    dishes.dishes[createdRecipes.indexOf(this)].recipePhotoSrc;
};
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
let dishIngredients = [];
let dishDescription = "";
let ingredientName;
let ingredientQuantity;
let ingredientType;
let uploadedImage = "";
let animationStatus = true;
let dishes = [];
let uploadedTags = [];
const createdRecipes = [];
const uploadedRecipes = [];
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
const dish = {
  recipeName: "",
  recipeIngredients: [],
  recipeDescription: "",
  recipeTags: [],
  recipePhotoSrc: "",
  recipeShare: false,
};
const createDish = function (name, ingredients, description, tags) {
  dishGetCounter = 0;
  let photo = "";
  async function dishImageUpload() {
    const file = photoInput.files.item(0);
    const reader = new FileReader();
    const storage = getStorage();
    reader.readAsDataURL(file);
    const storageRef = sRef(
      storage,
      "images/dishImages/" + userID + "/" + name
    );
    reader.addEventListener("load", () => {
      const metaData = {
        contentType: getFileExtension(file),
      };
      uploadBytesResumable(storageRef, file, metaData).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
      setTimeout(() => {
        getDownloadURL(storageRef)
          .then((downloadURL) => {
            photo = downloadURL;
          })
          .then(() => {
            const newDishObject = Object.create(dish);
            newDishObject.recipeName = name;
            newDishObject.recipeIngredients = ingredients;
            newDishObject.recipeDescription = description;
            newDishObject.recipeTags = tags;
            newDishObject.recipePhotoSrc = photo;
            newDishObject.recipeShare = false;
            get(ref(database, "users/" + userID + "/dishes")).then(
              (snapshot) => {
                if (snapshot.exists()) {
                  dishGetCounter = 4;
                  update(ref(database, "users/" + userID + "/dishes"), {
                    dishes: [...dishes.dishes, newDishObject],
                  });
                } else {
                  dishGetCounter = 4;
                  set(ref(database, "users/" + userID + "/dishes"), {
                    dishes: new Array(newDishObject),
                  });
                }
              }
            );
          });
      }, 1000);
    });
  }
  dishImageUpload();
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
const newDishContentComeBack = () => {
  const interval = setInterval(() => {
    if (activeMenuIndex > 0) {
      changingMenu("previous");
    } else {
      window.clearInterval(interval);
    }
  }, 200);
};
const changingNewDishContent = function (element, index) {
  newRecipeContent[index];
  newRecipeContent[index].style.display = "none";
};
const changingMenu = function (direction) {
  if (animationStatus) {
    animationStatus = false;
    if (direction == "next") {
      if (activeMenuIndex < 5) {
        navi[activeMenuIndex].textContent = " ";
        navi[activeMenuIndex + 1].textContent =
          menuContent[activeMenuIndex + 1];
        navi[activeMenuIndex].classList.toggle("active");
        navi[activeMenuIndex + 1].classList.toggle("active");
        navi[activeMenuIndex + 1].animate(changingNextMenu, changingMenuTiming);
        newDishContent.style.animationFillMode = "forwards";
        setTimeout(() => {
          changingNewDishContent("", activeMenuIndex - 1);
          animationStatus = true;
        }, 200);
        newDishContent.animate(changingNextPage, changingMenuTiming);
        newRecipeContent[activeMenuIndex + 1].style.display = "flex";
      } else {
        animationStatus = true;
      }
    }
    if (direction == "previous") {
      if (activeMenuIndex > 0) {
        navi[activeMenuIndex].textContent = " ";
        navi[activeMenuIndex - 1].textContent =
          menuContent[activeMenuIndex - 1];
        navi[activeMenuIndex].classList.toggle("active");
        navi[activeMenuIndex - 1].classList.toggle("active");
        navi[activeMenuIndex - 1].animate(changingNextMenu, changingMenuTiming);
        newDishContent.style.animationFillMode = "forwards";
        setTimeout(() => {
          changingNewDishContent("", activeMenuIndex + 1);
          animationStatus = true;
        }, 200);
        newDishContent.animate(changingPreviousPage, changingMenuTiming);
        newRecipeContent[activeMenuIndex - 1].style.display = "flex";
      } else {
        animationStatus = true;
      }
    }
    navi.forEach(indexCheck);
    if (activeMenuIndex == 5) {
      newDishLogo.style.display = "none";
    } else {
      newDishLogo.style.display = "block";
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
const clearNewDish = () => {
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
};
newDishExitButton.addEventListener("click", clearNewDish);
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
  console.log(this);
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
  dishIngredients = [...ingredients];
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
    uploadedTags.push(true);
  } else {
    uploadedTags.push(false);
  }
};
const tagClearFunction = function (element, index, array) {
  array.splice(index, 1);
};
tagsSubmitButton.addEventListener("click", () => {
  uploadedTags = [];
  activatedTags.splice(0, activatedTags.length);
  tagsImage.forEach(tagActiveCheck);
  changingMenu("next");
  overviewSubmitDisplay();
});
//photo
photoInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    // displayedPhoto = new Image();

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
  ingredientsToDelete.forEach((element) => {
    if (element.classList.contains("overviewIngredient")) {
      element.remove();
    }
  });
};
const ingredientsOverviewDisplay = function (element, index) {
  const overviewIngredient = document.createElement("div");
  overviewIngredient.classList.add("overviewIngredient");
  overviewIngredient.textContent = `${element.name} - ${element.quantity} ${element.type}`;
  overviewIngredientsList.appendChild(overviewIngredient);
};
const createdRecipesDisplay = () => {
  const interval = setInterval(() => {
    if (dishGetCounter < 6) {
      dishGetCounter++;
      createdRecipes.forEach((element) => {
        element.remove();
      });
      createdRecipes.splice(0, createdRecipes.length);
      if (typeof dishes.dishes !== "undefined") {
        dishes.dishes.forEach((element) => {
          const newSingleRecipe = document.createElement("div");
          newSingleRecipe.classList.toggle("singleRecipe");
          recipeList.appendChild(newSingleRecipe);
          newSingleRecipe.addEventListener("click", recipeOverviewAppearing);
          createdRecipes.push(newSingleRecipe);
          const singleRecipeImage = document.createElement("div");
          singleRecipeImage.classList.toggle("recipeImage");
          newSingleRecipe.appendChild(singleRecipeImage);
          const recipeImage = document.createElement("img");
          recipeImage.classList.toggle("recipeImage");
          singleRecipeImage.appendChild(recipeImage);
          const recipeName = document.createElement("div");
          recipeName.classList.toggle("recipeName");
          newSingleRecipe.appendChild(recipeName);
          const recipeNameText = document.createElement("p");
          recipeName.appendChild(recipeNameText);
          recipeNameText.textContent = element.recipeName;
          recipeImage.src = element.recipePhotoSrc;
        });
      }
    } else {
      window.clearInterval(interval);
      dishGetCounter--;
    }
  }, 1000);
};
dishSubmitButton.addEventListener("click", () => {
  createDish(dishName, [...ingredients], dishDescription, [...uploadedTags]);
  clearNewDish();
  createdRecipesDisplay();
  newDishContentComeBack();
});
// BROWSER
// BROWSER
// BROWSER
const browserExitButton = document.querySelector("div.browserExitButton");
const browserList = document.querySelector("div.browserList");
const browserContent = document.querySelector("div.browserContent");
const browserOverview = document.querySelector("div.browserOverview");
const creatorPhotoImage = document.querySelector("img.creatorPhotoImage");
const creatorUsername = document.querySelector("div.creatorUsername");
const browserOverviewTagImage = Array.from(
  document.querySelectorAll("img.browserOverviewTagImage")
);
const browserOverviewDishName = document.querySelector(
  "div.browserOverviewDishName h1"
);
const browserOverviewIngredients = document.querySelector(
  "div.browserOverviewIngredients"
);
const browserOverviewDescription = document.querySelector(
  "div.browserOverviewDescription"
);
const browserOverviewPhotoDisplay = document.querySelector(
  "div.browserOverviewPhotoDisplay img"
);
const browserOverviewExitButton = document.querySelector(
  "div.browserOverviewExitButton"
);
browserOverviewExitButton.addEventListener("click", () => {
  disappearing(browserOverview);
  appearing(browserContent);
});
browserExitButton.addEventListener("click", () => {
  disappearing(browser);
  appearing(mainMenu);
});
const browserOverviewAppearing = function () {
  disappearing(browserContent);
  appearing(browserOverview);
  creatorPhotoImage.src = uploadedDishes[uploadedRecipes.indexOf(this)][3];
  creatorUsername.textContent =
    uploadedDishes[uploadedRecipes.indexOf(this)][1] + "'s";
  browserOverviewTagImage.forEach((element) => {
    element.style.display = "none";
  });
  console.log(this);
  console.log(uploadedRecipes);
  console.log(uploadedRecipes.indexOf(this));
  console.log(uploadedDishes[uploadedRecipes.indexOf(this)][0]);
  console.log(uploadedDishes[uploadedRecipes.indexOf(this)][0].recipeName);
  browserOverviewDishName.textContent = capitalizeFirstLetter(
    uploadedDishes[uploadedRecipes.indexOf(this)][0].recipeName
  );
  const browserIngredientsOverviewDelete = () => {
    const ingredientsToDelete = Array.from(
      document.querySelectorAll("div.browserOverviewIngredient")
    );
    ingredientsToDelete.forEach((element) => {
      if (element.classList.contains("browserOverviewIngredient")) {
        element.remove();
      }
    });
  };
  browserIngredientsOverviewDelete();
  const browserIngredientsOverviewDisplay = function (element) {
    const browserIngredient = document.createElement("div");
    browserIngredient.classList.add("browserOverviewIngredient");
    browserIngredient.textContent = `${element.name} - ${element.quantity} ${element.type}`;
    browserOverviewIngredients.appendChild(browserIngredient);
  };

  uploadedDishes[uploadedRecipes.indexOf(this)][0].recipeIngredients.forEach(
    browserIngredientsOverviewDisplay
  );
  browserOverviewDescription.textContent =
    uploadedDishes[uploadedRecipes.indexOf(this)][0].recipeDescription;
  const browserTagsDisplay = (element, index) => {
    if (element == true) {
      browserOverviewTagImage[index].style.display = "block";
    }
  };
  uploadedDishes[uploadedRecipes.indexOf(this)][0].recipeTags.forEach(
    browserTagsDisplay
  );
  browserOverviewPhotoDisplay.src =
    uploadedDishes[uploadedRecipes.indexOf(this)][0].recipePhotoSrc;
};

const uploadedRecipesDisplay = () => {
  const interval = setInterval(() => {
    if (uploadGetCounter < 6) {
      uploadGetCounter++;
      uploadedRecipes.forEach((element) => {
        element.remove();
      });
      uploadedRecipes.splice(0, uploadedRecipes.length);
      if (typeof uploadedDishes !== "undefined") {
        console.log(uploadedDishes);
        uploadedDishes.forEach((element) => {
          const newUploadedRecipe = document.createElement("div");
          newUploadedRecipe.classList.toggle("browserRecipe");
          browserList.appendChild(newUploadedRecipe);
          newUploadedRecipe.addEventListener("click", browserOverviewAppearing);
          uploadedRecipes.push(newUploadedRecipe);
          const browserRecipeImage = document.createElement("div");
          browserRecipeImage.classList.toggle("browserImage");
          newUploadedRecipe.appendChild(browserRecipeImage);
          const recipeImage = document.createElement("img");
          recipeImage.classList.toggle("browserImage");
          browserRecipeImage.appendChild(recipeImage);
          const recipeName = document.createElement("div");
          recipeName.classList.toggle("browserName");
          newUploadedRecipe.appendChild(recipeName);
          const recipeNameText = document.createElement("p");
          recipeName.appendChild(recipeNameText);
          recipeNameText.textContent = element[0].recipeName;
          recipeImage.src = element[0].recipePhotoSrc;
        });
      }
    } else {
      window.clearInterval(interval);
      uploadGetCounter--;
    }
  }, 1000);
};

// SETTINGS
// SETTINGS
// SETTINGS
const settingsExitButton = document.querySelector("div.settingsExitButton");
const userNameDisplayed = document.querySelector(".userNameDisplayed");
const userNameDisplayedImage = document.querySelector("img.userNameDisplayed");
const userNameEditedImage = document.querySelector("img.userNameEdited");
const userNameEdited = document.querySelector(".userNameEdited");
const usernameInput = document.querySelector("input.usernameInput");
const getFileExtension = (file) => {
  const fileNameExtention = file.name.split(".");
  const extention = fileNameExtention.slice(
    fileNameExtention.length - 1,
    fileNameExtention.length
  );
  return "." + extention[0];
};
async function imageUpload() {
  const file = userPhotoInput.files.item(0);
  const reader = new FileReader();
  const storage = getStorage();
  reader.readAsDataURL(file);
  const storageRef = sRef(storage, "images/" + userID);
  reader.addEventListener("load", () => {
    const metaData = {
      contentType: getFileExtension(file),
    };
    uploadBytesResumable(storageRef, file, metaData).then(
      getDownloadURL(storageRef).then((downloadURL) => {
        setTimeout(() => {
          update(ref(database, "users/" + userID, userID), {
            photoURL: downloadURL,
          });
        }, 500);
      })
    );
  });
}
userNameDisplayedImage.addEventListener("click", () => {
  userNameEdited.classList.toggle("active");
  userNameDisplayed.classList.toggle("active");
  userNameDisplayedImage.classList.toggle("active");
  userNameEditedImage.classList.toggle("active");
  usernameInput.value = userNameDisplayer.textContent;
});
userNameEditedImage.addEventListener("click", () => {
  userNameEdited.classList.toggle("active");
  userNameDisplayed.classList.toggle("active");
  userNameDisplayedImage.classList.toggle("active");
  userNameEditedImage.classList.toggle("active");
  update(ref(database, "users/" + userID, userID), {
    username: usernameInput.value,
  });
});
settingsExitButton.addEventListener("click", () => {
  appearing(mainMenu);
  disappearing(settingsContent);
});

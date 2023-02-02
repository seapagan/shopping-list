import "./modules/vendor/DragDropTouch.js"; // polyfill drag/drop on iOS

import { checkButton, deleteButton, editButton } from "./modules/buttons.js";
import { addDragListeners, setupDragging } from "./modules/dragdrop";
import { getStoredList, updateStoredList } from "./modules/storage.js";
import { setupToaster, toastMessage } from "./modules/toaster.js";
import { testData } from "./test-data.js";

import "./styles/site.scss";

const unboughtList = document.getElementById("list-root");
const boughtList = document.getElementById("completed-root");
const textInput = document.getElementById("text-input");
const bodyEl = document.querySelector("body");

const colorToggle = document.getElementById("toggle");

const createListItem = (itemName, isBought = false) => {
  // create and insert a new Shopping List Item at top of list
  if (itemName == "") {
    toastMessage("Can't add an empty item!", "warning");
    return;
  }

  if (itemName.trim().toLowerCase() == "test") {
    // add test data to the list during development...
    testData.reverse();
    testData.forEach(item => createListItem(item));
    toastMessage("Added Test data!", "info");
    return;
  }

  const newItem = document.createElement("li");
  newItem.classList = "list-item";

  // create element for the check and text
  const checkAndTextElement = document.createElement("div");
  checkAndTextElement.className = "list-item-main";

  const textContent = document.createElement("span");
  textContent.classList = "item-text";
  textContent.append(document.createTextNode(itemName));

  checkAndTextElement.append(checkButton(), textContent);

  // create the button bar
  const buttonBar = document.createElement("div");
  buttonBar.className = "button-bar";
  buttonBar.append(editButton(), deleteButton());

  // add both to the new item element
  newItem.append(checkAndTextElement, buttonBar);
  // make whole thing draggable
  newItem.draggable = true;
  addDragListeners(newItem);

  // add the new item to the list
  if (isBought) {
    newItem.classList.add("item-completed");
    boughtList.prepend(newItem);
  } else {
    unboughtList.prepend(newItem);
  }

  // clear the input field
  textInput.value = "";
  updateStoredList();
};

const handleSubmit = e => {
  e.preventDefault();
  createListItem(textInput.value);
};

document.getElementById("new-item").addEventListener("click", handleSubmit);

/* -------------------------------------------------------------------------- */
/*        set up a MutationObserver to hide/show the individual lists.        */
/* -------------------------------------------------------------------------- */
const mutationCallback = mutationList => {
  // Hide the list <frameset> if it is empty. this is a bit overkill for the use
  // case, but I wanted to learn how to use MutationObserver!
  mutationList.forEach(mutation => {
    const listLength = mutation.target.querySelectorAll("li").length;
    if (listLength === 0) {
      mutation.target.parentElement.closest("fieldset").style.display = "none";
    } else {
      mutation.target.parentElement.closest("fieldset").style.display = "block";
    }
  });
};

const observer = new MutationObserver(mutationCallback);
observer.observe(boughtList, { childList: true });
observer.observe(unboughtList, { childList: true });

/* -------------------------------------------------------------------------- */
/*               Add click listeners to the list-delete buttons               */
/* -------------------------------------------------------------------------- */
const handleDeleteList = e => {
  e.target.parentElement
    .closest("fieldset")
    .querySelectorAll("li")
    .forEach(item => item.remove());

  toastMessage("List Cleared.", "error");
  updateStoredList();
};

document
  .querySelectorAll(".delete-list")
  .forEach(el => el.addEventListener("click", handleDeleteList));

/* -------------------------------------------------------------------------- */
/*             restore previous list from localstorage on refresh             */
/* -------------------------------------------------------------------------- */
const populateList = data => {
  if (data && data.length !== 0) {
    Object.keys(data)
      .reverse()
      .forEach(item => {
        createListItem(data[item].name, data[item].bought);
      });
  }
};

getStoredList().forEach(data => populateList(data));

/* -------------------------------------------------------------------------- */
/*                          Handle color mode toggle                          */
/* -------------------------------------------------------------------------- */

const toggleColorMode = dark => {
  bodyEl.classList = dark ? "dark-mode" : "light-mode";
};

const handleToggleColorMode = e => {
  toggleColorMode(e.target.checked);
};

colorToggle.addEventListener("click", handleToggleColorMode);
toggleColorMode(colorToggle.checked);

// enable Drag/Drop
setupDragging();
// enable the toaster dock.
setupToaster();

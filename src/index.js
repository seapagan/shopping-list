import { checkButton, deleteButton, editButton } from "./modules/buttons.js";
import { getStoredList, updateStoredList } from "./modules/storage.js";
import { testData } from "./test-data.js";

import "./styles/site.scss";

const unboughtList = document.getElementById("list-root");
const boughtList = document.getElementById("completed-root");
const textInput = document.getElementById("text-input");
const bodyEl = document.querySelector("body");

const colorToggle = document.getElementById("toggle");

const ITEM_COMPLETED = "item-completed";

const addDragListeners = el => {
  el.addEventListener("dragstart", () => {
    el.classList.add("dragging");
  });
  el.addEventListener("dragend", () => {
    el.classList.remove("dragging");
  });
};

const createListItem = (itemName, isBought = false) => {
  // create and insert a new Shopping List Item at top of list
  if (itemName == "") return;

  if (itemName.trim().toLowerCase() == "test") {
    // add test data to the list during development...
    testData.reverse().forEach(item => createListItem(item));
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
    newItem.classList.add(ITEM_COMPLETED);
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
  // bodyEl.classList = e.target.checked ? "dark-mode" : "light-mode";
  toggleColorMode(e.target.checked);
};

colorToggle.addEventListener("click", handleToggleColorMode);
toggleColorMode(colorToggle.checked);

/* -------------------------------------------------------------------------- */
/*             add drag/drop listeners to the existing list items             */
/* -------------------------------------------------------------------------- */
const getDragAfterElement = (target, clientY) => {
  const els = [...target.children].filter(el => el.draggable);
  return els.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = clientY - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

const draggables = document.querySelectorAll(".list-item");
const dropTargets = document.querySelectorAll("fieldset>ul");

draggables.forEach(draggable => {
  addDragListeners(draggable);
});

dropTargets.forEach(dropTarget => {
  dropTarget.addEventListener("dragover", e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(dropTarget, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      dropTarget.append(draggable);
    } else {
      dropTarget.insertBefore(draggable, afterElement);
    }
    if (dropTarget.id === "list-root") {
      draggable.classList.remove(ITEM_COMPLETED);
    } else {
      draggable.classList.add(ITEM_COMPLETED);
    }
    updateStoredList();
  });
});

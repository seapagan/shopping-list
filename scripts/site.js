import { testData } from "../test-data.js";

import { checkButton, deleteButton, editButton } from "./buttons.js";
import { getStoredList, updateStoredList } from "./storage.js";

const shoppingList = document.getElementById("list-root");
const textInput = document.getElementById("text-input");

const createListItem = itemName => {
  // create and insert a new Shopping List Item at top of list
  if (itemName == "") return;

  if (itemName.trim().toLowerCase() == "test") {
    // add test data to the list during development...
    testData.forEach(item => createListItem(item));
    return;
  }

  const newItem = document.createElement("li");
  newItem.classList = "list-item";

  // create element for the check and text
  const checkAndTextElement = document.createElement("div");
  checkAndTextElement.className = "list-item-main";

  const textContent = document.createElement("span");
  textContent.classList = "item-text";
  textContent.appendChild(document.createTextNode(itemName));

  checkAndTextElement.append(checkButton());
  checkAndTextElement.append(textContent);

  // create the button bar
  const buttonBar = document.createElement("div");
  buttonBar.className = "button-bar";
  buttonBar.append(editButton());
  buttonBar.appendChild(deleteButton());

  // add both to the new item element
  newItem.append(checkAndTextElement);
  newItem.append(buttonBar);

  // add the new item to the list
  shoppingList.prepend(newItem);

  // clear the input field
  textInput.value = "";
  updateStoredList();
};

const handleSubmit = e => {
  e.preventDefault();
  createListItem(textInput.value);
};

document.getElementById("add-item").addEventListener("click", handleSubmit);

// restore previous list from localstorage
const storedItems = getStoredList();
if (storedItems && storedItems.length !== 0) {
  Object.keys(storedItems)
    .reverse()
    .forEach(item => {
      createListItem(storedItems[item].name);
    });
}

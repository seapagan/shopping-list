import { testData } from "../data.js";
import { deleteButton, checkButton, editButton } from "./buttons.js";
const shoppingList = document.getElementById("list-root");
const textInput = document.getElementById("text-input");

const createListItem = (itemName) => {
  // create and insert a new Shopping List Item at top of list
  if (itemName == "") return;

  const newItem = document.createElement("li");
  newItem.classList = "list-item";

  // create container for the check and text
  const newElement = document.createElement("span");
  newElement.className = "list-item-main";

  // create span for text and add to the LI
  const textContent = document.createElement("span");
  textContent.classList = "item-text";
  textContent.appendChild(document.createTextNode(itemName));
  newItem.appendChild(textContent);

  // add the checked button at the start
  newElement.append(checkButton());
  newElement.append(textContent);

  newItem.append(newElement);

  const buttonBar = document.createElement("div");
  buttonBar.className = "button-bar";

  buttonBar.append(editButton());
  buttonBar.appendChild(deleteButton());

  newItem.append(buttonBar);

  // add the new item to the top of the list
  shoppingList.prepend(newItem);
  // clear the input field
  textInput.value = "";
};

const handleSubmit = (e) => {
  e.preventDefault();
  createListItem(textInput.value);
};

document.getElementById("add-item").addEventListener("click", handleSubmit);

// add test data to the list during development...
testData.forEach((item) => createListItem(item));

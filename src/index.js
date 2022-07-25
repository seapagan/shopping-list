import { checkButton, deleteButton, editButton } from "./modules/buttons.js";
import { getStoredList, updateStoredList } from "./modules/storage.js";
import { testData } from "./test-data.js";

import "./styles/site.css";

const unboughtList = document.getElementById("list-root");
const boughtList = document.getElementById("completed-root");
const textInput = document.getElementById("text-input");

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
  // checkAndTextElement.append(textContent);

  // create the button bar
  const buttonBar = document.createElement("div");
  buttonBar.className = "button-bar";
  buttonBar.append(editButton(), deleteButton());
  // buttonBar.appendChild(deleteButton());

  // add both to the new item element
  newItem.append(checkAndTextElement, buttonBar);
  // newItem.append(buttonBar);

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

document.getElementById("add-item").addEventListener("click", handleSubmit);

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

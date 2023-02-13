import { testData } from "../test-data.js";

import {
  getSession,
  getUser,
  loginDialog,
  signOut,
  signupDialog,
} from "./auth";
import { checkButton, deleteButton, editButton } from "./buttons";
import { addDragListeners, setupDragging } from "./dragdrop";
import {
  deleteItem,
  getAllItems,
  storeItem,
  updateStoredList,
} from "./storage";
import {
  fieldset_template,
  footer_template,
  form_Template,
  header_template,
  no_auth_template,
  signInUpButton,
  signOutButton,
} from "./templates.js";
import { setupToaster, toastMessage } from "./toaster";

import "../styles/site.scss";
import "../styles/hint.css";

/* -------------------------------------------------------------------------- */
/*         set up a MutationObserver to hide/show the individual lists        */
/* -------------------------------------------------------------------------- */
const addMutations = () => {
  const mutationCallback = mutationList => {
    // Hide the list <frameset> if it is empty. this is a bit overkill for the
    // use case, but I wanted to learn how to use MutationObserver!
    mutationList.forEach(mutation => {
      const listLength = mutation.target.querySelectorAll("li").length;
      if (listLength === 0) {
        mutation.target.parentElement.closest("fieldset").style.display =
          "none";
      } else {
        mutation.target.parentElement.closest("fieldset").style.display =
          "block";
      }
    });
  };
  const unboughtList = document.getElementById("list-root");
  const boughtList = document.getElementById("completed-root");

  const observer = new MutationObserver(mutationCallback);
  observer.observe(boughtList, { childList: true });
  observer.observe(unboughtList, { childList: true });
};

/* -------------------------------------------------------------------------- */
/*                        create and display a new item                       */
/* -------------------------------------------------------------------------- */
export const createListItem = async (itemName, itemId, isBought = false) => {
  // create and insert a new Shopping List Item at top of list
  const unboughtList = document.getElementById("list-root");
  const boughtList = document.getElementById("completed-root");
  const textInput = document.getElementById("text-input");

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

  // add the item id as a data attribute to allow us to match this item with the
  // database entry.
  newItem.dataset.itemid = itemId;

  // add the new item to the list
  if (isBought) {
    newItem.classList.add("item-completed");
    boughtList.prepend(newItem);
  } else {
    unboughtList.prepend(newItem);
  }

  // clear the input field
  textInput.value = "";
};

/* -------------------------------------------------------------------------- */
/*                      display the to-buy / bought lists                     */
/* -------------------------------------------------------------------------- */
export const displayLists = async () => {
  if (!(await getSession())) return;
  const items = await getAllItems();
  if (items && items.length !== 0) {
    items.forEach(item => {
      createListItem(item.item_name, item.id, item.item_bought);
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                          handle sign up a new user                         */
/* -------------------------------------------------------------------------- */
const handleSignUp = e => {
  e.preventDefault();
  const headerEl = document.querySelector("header");
  const findDialog = document.getElementsByClassName("dialog");
  if (findDialog.length === 0) {
    headerEl.insertAdjacentElement("afterend", signupDialog());
  } else if (findDialog.item(0).classList.contains("login-dialog")) {
    findDialog.item(0).remove();
    headerEl.insertAdjacentElement("afterend", signupDialog());
  } else {
    findDialog.item(0).remove();
  }
};

/* -------------------------------------------------------------------------- */
/*                              handle signing in                             */
/* -------------------------------------------------------------------------- */
const handleLogin = e => {
  e.preventDefault();
  const headerEl = document.querySelector("header");
  const findDialog = document.getElementsByClassName("dialog");
  if (findDialog.length === 0) {
    headerEl.insertAdjacentElement("afterend", loginDialog());
  } else if (findDialog.item(0).classList.contains("signup-dialog")) {
    findDialog.item(0).remove();
    headerEl.insertAdjacentElement("afterend", loginDialog());
  } else {
    findDialog.item(0).remove();
  }
};

/* -------------------------------------------------------------------------- */
/*                             handle signing out                             */
/* -------------------------------------------------------------------------- */
const handleSignOut = async e => {
  e.preventDefault();
  await signOut();
  renderHeader();
};

/* -------------------------------------------------------------------------- */
/*                       handle deleting an entire list                       */
/* -------------------------------------------------------------------------- */
const handleDeleteList = e => {
  e.target.parentElement
    .closest("fieldset")
    .querySelectorAll("li")
    .forEach(async item => {
      const itemId = item.dataset.itemid;
      const error = await deleteItem(itemId);
      if (error) {
        toastMessage(`Error: ${error.message}`, "error");
        return;
      }
      item.remove();
    });

  toastMessage("List Cleared.", "success");
  updateStoredList();
};

/* -------------------------------------------------------------------------- */
/*                     add handlers to delete entire lists                    */
/* -------------------------------------------------------------------------- */
const addDeleteHandlers = () => {
  document
    .querySelectorAll(".delete-list")
    .forEach(el => el.addEventListener("click", handleDeleteList));
  const newItemEl = document.getElementById("new-item");
  if (newItemEl) {
    newItemEl.addEventListener("click", addNewItem);
  }
};

/* -------------------------------------------------------------------------- */
/*            add handlers to take care of dark/light theme toggle            */
/* -------------------------------------------------------------------------- */
const setupTheme = () => {
  const bodyEl = document.querySelector("body");
  const colorToggle = document.getElementById("toggle");

  const toggleColorMode = dark => {
    bodyEl.classList = dark ? "dark-mode" : "light-mode";
  };

  const handleToggleColorMode = e => {
    toggleColorMode(e.target.checked);
  };

  colorToggle.addEventListener("click", handleToggleColorMode);
  toggleColorMode(colorToggle.checked);
};

/* -------------------------------------------------------------------------- */
/*                add a new item to the database and display it               */
/* -------------------------------------------------------------------------- */
const addNewItem = async e => {
  e.preventDefault();
  const textInput = document.getElementById("text-input");

  const itemName = textInput.value;

  // add test data to the list during development...
  if (itemName.trim().toLowerCase() == "test") {
    testData.reverse();
    testData.forEach(async itemName => {
      const [result] = await storeItem({
        user_id: await getUser(),
        item_name: itemName,
        item_bought: false,
      });
      createListItem(itemName, result.id, false);
    });

    toastMessage("Added Test data!", "info");
    return;
  }

  if (itemName.trim() === "") {
    toastMessage("Can't add an empty item!", "warning");
    return;
  }

  const [result] = await storeItem({
    user_id: await getUser(),
    item_name: itemName,
    item_bought: false,
  });
  createListItem(itemName, result.id, false);
};

/* -------------------------------------------------------------------------- */
/*                          re-render the header only                         */
/* -------------------------------------------------------------------------- */
export const renderHeader = async () => {
  const thisSession = await getSession();
  const authButtons = document.getElementById("auth-buttons");
  if (!thisSession) {
    authButtons.innerHTML = signInUpButton;

    document.getElementById("signup").addEventListener("click", handleSignUp);
    document.getElementById("login").addEventListener("click", handleLogin);
  } else {
    authButtons.innerHTML = signOutButton;
    document.getElementById("signout").addEventListener("click", handleSignOut);
  }
};

/* -------------------------------------------------------------------------- */
/*             show the form if logged in, otherwise default text             */
/* -------------------------------------------------------------------------- */
const showForm = async session => {
  if (session) {
    return form_Template;
  }

  return no_auth_template;
};

/* -------------------------------------------------------------------------- */
/*                         render or re-render the app                        */
/* -------------------------------------------------------------------------- */
export const RenderApp = async () => {
  const thisSession = await getSession();
  const app = document.getElementById("App");
  app.innerHTML =
    header_template +
    (await showForm(thisSession)) +
    fieldset_template +
    footer_template;

  // add click handlers to the text when not logged in
  if (!thisSession) {
    document.getElementById("LoginText").addEventListener("click", handleLogin);
    document
      .getElementById("SignupText")
      .addEventListener("click", handleSignUp);
  }

  setupToaster();
  renderHeader();
  setupTheme();
  addMutations();
  setupDragging();
  addDeleteHandlers();
  displayLists();
};

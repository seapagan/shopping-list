/* eslint-disable sonarjs/no-duplicate-string */
import {
  deleteItem,
  editItemName,
  toggleItemBought,
  updateStoredList,
} from "./storage.js";
import { toastMessage } from "./toaster.js";

/* -------------------------------------------------------------------------- */
/*                              The Delete button                             */
/* -------------------------------------------------------------------------- */
const handleDelete = async e => {
  // delete the current item
  const thisItem = e.target.parentElement.closest("li");

  const error = await deleteItem(thisItem.dataset.itemid);
  if (error) {
    toastMessage("Error : Can't delete this item", "error");
    return;
  }
  thisItem.remove();
  toastMessage("Item Deleted!", "success");
  updateStoredList();
};

export const deleteButton = () => {
  const button = document.createElement("span");
  button.innerHTML = "<i class='fa-regular fa-trash-can'></i>";
  button.classList = "delete-button hint--top hint--rounded";
  button.setAttribute("aria-label", "Delete item");
  button.addEventListener("click", handleDelete);

  return button;
};

/* -------------------------------------------------------------------------- */
/*                           The Check (done) button                          */
/* -------------------------------------------------------------------------- */
const handleChecked = async e => {
  const check = e.target.parentElement.closest("span");
  const listItem = check.parentElement.closest("li");

  // dont allow check if we are also editing this item
  if (document.querySelector(".edit-input")) return;

  const error = await toggleItemBought(listItem.dataset.itemid);
  if (error) {
    toastMessage(`Error : ${error.message}`);
    return;
  }

  listItem.classList.toggle("item-completed");
  if (listItem.classList.contains("item-completed")) {
    document.getElementById("completed-root").prepend(listItem);
  } else {
    document.getElementById("list-root").prepend(listItem);
  }
};

export const checkButton = () => {
  const button = document.createElement("span");
  button.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
  button.classList = "checked-button hint--top hint--rounded";
  button.setAttribute("aria-label", "Toggle Bought");
  button.addEventListener("click", handleChecked);

  return button;
};

/* -------------------------------------------------------------------------- */
/*                               The Edit button                              */
/* -------------------------------------------------------------------------- */
const handleEdit = e => {
  const itemText = e.target.parentElement
    .closest("div")
    .previousElementSibling.querySelector(".item-text");
  const editButton = e.target.parentElement.closest(".edit-button");

  const inputField = document.createElement("input");
  inputField.value = itemText.innerText;
  inputField.className = "edit-input";
  inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleEnterPressedOnEdit(e);
    }
  });
  editButton.replaceWith(applyEditButton());
  itemText.replaceWith(inputField);
  inputField.focus();
};

export const editButton = () => {
  const button = document.createElement("span");
  button.innerHTML = "<i class='fa-regular fa-pen-to-square'></i>";
  button.classList = "edit-button hint--top hint--rounded";
  button.setAttribute("aria-label", "Edit item");
  button.addEventListener("click", handleEdit);

  return button;
};

/* -------------------------------------------------------------------------- */
/*                             Edit submit button                             */
/* -------------------------------------------------------------------------- */
const handleSubmitEdit = async e => {
  const acceptButton = e.target.parentElement.closest(".edit-accept");
  const thisItemId = e.target.parentElement.closest("li").dataset.itemid;

  const editField = e.target.parentElement
    .closest("div")
    .previousElementSibling.querySelector(".edit-input");
  const newName = editField.value;

  if (newName === "") return;

  const textContent = document.createElement("span");
  textContent.classList = "item-text";
  textContent.append(document.createTextNode(newName));

  const error = await editItemName(thisItemId, newName);
  if (error) {
    toastMessage(`Error: ${error.message}`);
    return;
  }

  editField.replaceWith(textContent);
  toastMessage("Item Updated.", "success");

  // now replace the apply button with an edit button for next time
  acceptButton.replaceWith(editButton());
};

const handleEnterPressedOnEdit = async e => {
  if (e.target.value === "") return;

  const textContent = document.createElement("span");
  const thisItemId = e.target.parentElement.closest("li").dataset.itemid;

  textContent.classList = "item-text";
  textContent.append(document.createTextNode(e.target.value));

  const error = await editItemName(thisItemId, e.target.value);
  if (error) {
    toastMessage(`Error: ${error.message}`);
    return;
  }

  const acceptButton = e.target.parentElement
    .closest("div")
    .nextSibling.getElementsByClassName("edit-accept")[0];
  acceptButton.replaceWith(editButton());
  e.target.replaceWith(textContent);
  toastMessage("Item Updated.", "success");
};

const applyEditButton = () => {
  const button = document.createElement("span");
  button.innerHTML = "<i class='fa-regular fa-check'></i>";
  button.className = "edit-accept hint--top hint--rounded";
  button.setAttribute("aria-label", "Accept");
  button.addEventListener("click", handleSubmitEdit);

  return button;
};

import { updateStoredList } from "./storage.js";

/* -------------------------------------------------------------------------- */
/*                              The Delete button                             */
/* -------------------------------------------------------------------------- */
const handleDelete = e => {
  // delete the current item
  e.target.parentElement.closest("li").remove();
  updateStoredList();
};

export const deleteButton = () => {
  const button = document.createElement("span");
  button.innerHTML = "<i class='fa-regular fa-trash-can'></i>";
  button.classList = "delete-button";
  button.addEventListener("click", handleDelete);

  return button;
};

/* -------------------------------------------------------------------------- */
/*                           The Check (done) button                          */
/* -------------------------------------------------------------------------- */
const handleChecked = e => {
  const check = e.target.parentElement.closest("span");
  const listItem = check.parentElement.closest("li");

  // dont allow check if we are also editing this item
  if (document.querySelector(".edit-input")) return;

  listItem.classList.toggle("item-completed");
  if (listItem.classList.contains("item-completed")) {
    document.getElementById("completed-root").prepend(listItem);
  } else {
    document.getElementById("list-root").prepend(listItem);
  }
  updateStoredList();
};

export const checkButton = () => {
  const button = document.createElement("span");
  button.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
  button.classList = "checked-button";
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
  updateStoredList();
};

export const editButton = () => {
  const button = document.createElement("span");
  button.innerHTML = "<i class='fa-regular fa-pen-to-square'></i>";
  button.classList = "edit-button";
  button.addEventListener("click", handleEdit);

  return button;
};

/* -------------------------------------------------------------------------- */
/*                             Edit submit button                             */
/* -------------------------------------------------------------------------- */
const handleApplyEdit = e => {
  const acceptButton = e.target.parentElement.closest(".edit-accept");

  const editField = e.target.parentElement
    .closest("div")
    .previousElementSibling.querySelector(".edit-input");

  if (editField.value === "") return;

  const textContent = document.createElement("span");
  textContent.classList = "item-text";
  textContent.appendChild(document.createTextNode(editField.value));

  editField.replaceWith(textContent);

  // now replace the apply button with an edit button for next time
  acceptButton.replaceWith(editButton());
};

const handleEnterPressedOnEdit = e => {
  if (e.target.value === "") return;

  const textContent = document.createElement("span");
  textContent.classList = "item-text";
  textContent.appendChild(document.createTextNode(e.target.value));

  const acceptButton = e.target.parentElement
    .closest("div")
    .nextSibling.getElementsByClassName("edit-accept")[0];
  acceptButton.replaceWith(editButton());
  e.target.replaceWith(textContent);
  updateStoredList();
};

const applyEditButton = () => {
  const button = document.createElement("span");
  button.innerHTML = "<i class='fa-regular fa-check'></i>";
  button.className = "edit-accept";
  button.addEventListener("click", handleApplyEdit);

  return button;
};

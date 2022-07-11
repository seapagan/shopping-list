/* -------------------------------------------------------------------------- */
/*                              The Delete button                             */
/* -------------------------------------------------------------------------- */
const handleDelete = (e) => {
  // delete the current item
  e.target.parentElement.closest("li").remove();
};

export const deleteButton = () => {
  const button = document.createElement("span");
  button.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  button.classList = "delete-button";
  button.addEventListener("click", handleDelete);

  return button;
};

/* -------------------------------------------------------------------------- */
/*                           The Check (done) button                          */
/* -------------------------------------------------------------------------- */
const handleChecked = (e) => {
  const check = e.target.parentElement.closest("span");
  const listItem = check.parentElement.closest("li");

  listItem.classList.toggle("item-completed");
  if (listItem.classList.contains("item-completed")) {
    document.getElementById("completed-root").prepend(listItem);
  } else {
    document.getElementById("list-root").prepend(listItem);
  }
};

export const checkButton = () => {
  const button = document.createElement("span");
  button.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  button.classList = "checked-button";
  button.addEventListener("click", handleChecked);

  return button;
};

/* -------------------------------------------------------------------------- */
/*                               The Edit button                              */
/* -------------------------------------------------------------------------- */
const handleEdit = (e) => {
  const itemText = e.target.parentElement
    .closest("div")
    .previousElementSibling.querySelector(".item-text");
  const editButton = e.target.parentElement.closest(".edit-button");

  const originalNode = itemText.cloneNode(true);

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
  button.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  button.classList = "edit-button";
  button.addEventListener("click", handleEdit);

  return button;
};

/* -------------------------------------------------------------------------- */
/*                             Edit submit button                             */
/* -------------------------------------------------------------------------- */
const handleApplyEdit = (e) => {
  const acceptButton = e.target.parentElement.closest(".edit-accept");

  const editField = e.target.parentElement
    .closest("div")
    .previousElementSibling.querySelector(".edit-input");

  const textContent = document.createElement("span");
  textContent.classList = "item-text";
  textContent.appendChild(document.createTextNode(editField.value));

  editField.replaceWith(textContent);

  // now replace the apply button with an edit button for next time
  acceptButton.replaceWith(editButton());
};

const handleEnterPressedOnEdit = (e) => {
  console.log(e.target.value);

  const textContent = document.createElement("span");
  textContent.classList = "item-text";
  textContent.appendChild(document.createTextNode(e.target.value));

  e.target.replaceWith(textContent);
};

const applyEditButton = () => {
  const button = document.createElement("span");
  button.innerHTML = '<i class="fa-regular fa-check"></i>';
  button.className = "edit-accept";
  button.addEventListener("click", handleApplyEdit);

  return button;
};

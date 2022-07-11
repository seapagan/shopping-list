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

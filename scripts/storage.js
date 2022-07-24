// assorted functions to take care of localstorage.
const getAllItemsList = () => document.querySelectorAll("li.list-item");

const getListData = () => {
  const listItemsList = getAllItemsList();
  const listData = {};

  listItemsList.forEach((item, index) => {
    const itemName = item.querySelector(".item-text").innerText;
    listData[index] = { name: itemName };
  });
  return listData;
};

export const updateStoredList = () =>
  localStorage.setItem("SHOPPINGLIST_LIST", JSON.stringify(getListData()));

export const getStoredList = () =>
  JSON.parse(localStorage.getItem("SHOPPINGLIST_LIST"));

// assorted functions to take care of localstorage.
const getAllItemsList = () => {
  // return document.querySelectorAll(".list-item");
  const toBuy = document
    .getElementById("list-root")
    .querySelectorAll(".list-item");
  const bought = document
    .getElementById("completed-root")
    .querySelectorAll(".list-item");
  return [toBuy, bought];
};

const getListData = () => {
  const [toBuy, bought] = getAllItemsList();

  const toBuyList = {};
  const boughtList = {};

  toBuy.forEach((item, index) => {
    const itemName = item.querySelector(".item-text").innerText;
    toBuyList[index] = { name: itemName, bought: false };
  });
  bought.forEach((item, index) => {
    const itemName = item.querySelector(".item-text").innerText;
    boughtList[index] = { name: itemName, bought: true };
  });
  return [toBuyList, boughtList];
};

export const updateStoredList = () =>
  localStorage.setItem("SHOPPINGLIST_LIST", JSON.stringify(getListData()));

export const getStoredList = () =>
  JSON.parse(localStorage.getItem("SHOPPINGLIST_LIST"));

// assorted functions to take care of read/save from localstorage.
const getListByAnchor = id => {
  return document.getElementById(id).querySelectorAll(".list-item");
};

const getAllItemsList = () => {
  return [getListByAnchor("list-root"), getListByAnchor("completed-root")];
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

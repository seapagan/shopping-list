import { getUser } from "./auth";
import { supabase } from "./supabase";
import { toastMessage } from "./toaster";

/* -------------------------------------------------------------------------- */
/*                         Supabase database fumctions                        */
/* -------------------------------------------------------------------------- */
export const getAllItems = async () => {
  const thisUser = await getUser();
  const { data: shopping, error } = await supabase
    .from("shopping")
    .select("*")
    .eq("user_id", thisUser);
  if (error) {
    toastMessage(`Error: ${error.message}`);
    return null;
  }
  return shopping;
};

export const getItem = async itemId => {
  const { data: shoppingItem, error } = await supabase
    .from("shopping")
    .select("*")
    .eq("id", itemId);
  if (error) {
    toastMessage(`Error: ${error.message}`);
    return null;
  }
  return shoppingItem;
};

export const storeItem = async itemData => {
  const { data: newItem, error } = await supabase
    .from("shopping")
    .insert([itemData])
    .select();
  if (error) {
    toastMessage(`Error: ${error.message}`);
    return null;
  }
  return newItem;
};

export const deleteItem = async itemId => {
  const { error } = await supabase.from("shopping").delete().eq("id", itemId);
  return error;
};

export const toggleItemBought = async itemId => {
  const [thisItem] = await getItem(itemId);

  const { error } = await supabase
    .from("shopping")
    .update({ item_bought: !thisItem.item_bought })
    .eq("id", itemId);
  return error;
};

export const editItemName = async (itemId, newName) => {
  const { error } = await supabase
    .from("shopping")
    .update({ item_name: newName })
    .eq("id", itemId);
  return error;
};

/* -------------------------------------------------------------------------- */
// assorted functions to take care of read/save from localstorage. These are
// currently NOT USED ANY MORE as the data is now stored online using Supabase
/* -------------------------------------------------------------------------- */
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
  localStorage.setItem("SP_SHOPPINGLIST_LIST", JSON.stringify(getListData()));

export const getStoredList = () => {
  const storedData = JSON.parse(localStorage.getItem("SP_SHOPPINGLIST_LIST"));
  return storedData ? storedData : [];
};

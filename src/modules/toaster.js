// create the toaster dock and add it to the top of the Body
const toastDockFrag = document.createDocumentFragment();
const toastDiv = document.createElement("div");
toastDiv.className = "toaster-dock";
toastDockFrag.append(toastDiv);
document.querySelector("main").prepend(toastDockFrag);

const fadeToast = toastItem => {
  toastItem.style.opacity = 0;
  setTimeout(() => {
    toastItem.remove();
  }, 500);
};

export const toastMessage = (message, level) => {
  // this shows then fades the toaster message.
  const toastDock = document.querySelector(".toaster-dock");

  const toastItem = document.createElement("div");
  toastItem.classList.add("toaster-message", level);
  toastItem.textContent = message;

  toastDock.append(toastItem);

  const timeOut = setTimeout(() => {
    fadeToast(toastItem);
  }, 2000);
  toastItem.addEventListener("click", () => {
    clearTimeout(timeOut);
    fadeToast(toastItem);
  });
};

// create the toaster dock and add it to the top of the Body
const toastDockFrag = document.createDocumentFragment();
const toastDiv = document.createElement("div");
toastDiv.className = "toaster-dock";
toastDockFrag.append(toastDiv);
document.querySelector("main").prepend(toastDockFrag);

export const toastMessage = (message, level) => {
  const toastDock = document.querySelector(".toaster-dock");

  const toastItem = document.createElement("div");
  toastItem.className = "toaster-message";
  toastItem.classList.add(level);
  toastItem.textContent = message;

  toastDock.append(toastItem);

  setTimeout(() => {
    toastItem.style.opacity = 0;
    setTimeout(() => {
      toastItem.remove();
    }, 500);
  }, 2000);
};

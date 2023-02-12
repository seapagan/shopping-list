/* -------------------------------------------------------------------------- */
/*             add drag/drop listeners to the existing list items             */
/* -------------------------------------------------------------------------- */

const ITEM_COMPLETED = "item-completed";

export const addDragListeners = el => {
  el.addEventListener("dragstart", () => {
    el.classList.add("dragging");
  });
  el.addEventListener("dragend", () => {
    el.classList.remove("dragging");
  });
};

const getDragAfterElement = (target, clientY) => {
  const els = [...target.children].filter(el => el.draggable);
  return els.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = clientY - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

export const setupDragging = () => {
  const draggables = document.querySelectorAll(".list-item");
  const dropTargets = document.querySelectorAll("fieldset>ul");

  draggables.forEach(draggable => {
    addDragListeners(draggable);
  });

  dropTargets.forEach(dropTarget => {
    dropTarget.addEventListener("dragover", e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(dropTarget, e.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        dropTarget.append(draggable);
      } else {
        dropTarget.insertBefore(draggable, afterElement);
      }
      if (dropTarget.id === "list-root") {
        draggable.classList.remove(ITEM_COMPLETED);
      } else {
        draggable.classList.add(ITEM_COMPLETED);
      }
      // updateStoredList();
      // for now the dragged order will not persist over a reload. This needs to
      // be implemented further in the database.
    });
  });
};

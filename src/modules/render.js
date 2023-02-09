const header_template = `
  <header>
      <h1 class="title">Shopping List</h1>
      <div id="auth-buttons" class="auth-buttons">

      </div>
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        aria-label="Toggle Dark Mode" />
    </header>
    `;

const form_Template = `
    <form class="input-form">
      <input
        id="text-input"
        type="text"
        placeholder="Add Item"
        autocomplete="off"
        aria-label="Add an Item" />
      <button id="new-item" type="submit" aria-label="Add Item">
        <i class="fa-solid fa-plus-large" aria-hidden="true"></i>
      </button>
    </form>`;

const fieldset_template = `
    <fieldset>
      <legend>To Buy</legend>
      <span class="delete-list"
        ><span class="fa-regular fa-trash-can"></span
      ></span>
      <ul id="list-root"></ul>
    </fieldset>
    <fieldset>
      <legend>Bought</legend>
      <span class="delete-list"
        ><span class="fa-regular fa-trash-can"></span
      ></span>
      <ul id="completed-root"></ul>
    </fieldset>`;

const footer_template = `
    <footer>
      &copy; Grant Ramsay 2023 (
      <a
        class="source-link"
        href="https://github.com/seapagan/shopping-list"
        target="_blank">
        <span class="fa-brands fa-github"></span>
        Source
      </a>
      )
    </footer>
`;

const signInUpButton = `
    <a id="signup" href="#" aria-label="Sign Up">
      <i class="fa-regular fa-user-plus" aria-hidden="true"></i>
      <span class="visible-hidden">Sign Up</span>
    </a>
    <a id="login" href="#" aria-label="Login">
      <i class="fa-regular fa-sign-in" aria-hidden="true"></i>
      <span class="visible-hidden">Login</span>
    </a>
  `;

const addMutations = () => {
  // set up a MutationObserver to hide/show the individual lists
  const mutationCallback = mutationList => {
    // Hide the list <frameset> if it is empty. this is a bit overkill for the
    // use case, but I wanted to learn how to use MutationObserver!
    mutationList.forEach(mutation => {
      const listLength = mutation.target.querySelectorAll("li").length;
      if (listLength === 0) {
        mutation.target.parentElement.closest("fieldset").style.display =
          "none";
      } else {
        mutation.target.parentElement.closest("fieldset").style.display =
          "block";
      }
    });
  };
  const unboughtList = document.getElementById("list-root");
  const boughtList = document.getElementById("completed-root");

  const observer = new MutationObserver(mutationCallback);
  observer.observe(boughtList, { childList: true });
  observer.observe(unboughtList, { childList: true });
};

export const RenderApp = () => {
  const app = document.getElementById("App");
  app.innerHTML =
    header_template + form_Template + fieldset_template + footer_template;

  if (!document.state.session) {
    const authButtons = document.getElementById("auth-buttons");
    authButtons.innerHTML = signInUpButton;
  }

  addMutations();
};

const html_template = `
  <header>
      <h1 class="title">Shopping List</h1>
      <div class="auth-buttons">
        <a id="signup" href="#" aria-label="Sign Up">
          <i class="fa-regular fa-user-plus" aria-hidden="true"></i>
          <span class="visible-hidden">Sign Up</span>
        </a>
        <a id="login" href="#" aria-label="Login">
          <i class="fa-regular fa-sign-in" aria-hidden="true"></i>
          <span class="visible-hidden">Login</span>
        </a>
      </div>
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        aria-label="Toggle Dark Mode" />
    </header>
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
    </form>
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
    </fieldset>
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

export const RenderApp = () => {
  const app = document.getElementById("App");
  app.innerHTML = html_template;
};

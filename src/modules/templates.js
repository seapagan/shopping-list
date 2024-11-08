export const header_template = `
  <header>
      <h1 class="title">Shopping List</h1>
      <div id="auth-buttons" class="auth-buttons">

      </div>
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          aria-label="Toggle Dark Mode"
        />
    </header>
    `;

export const form_Template = `
    <form class="input-form">
      <input
        id="text-input"
        type="text"
        placeholder="Add Item"
        autocomplete="off"
        aria-label="Add an Item" />
      <button class="hint--top hint--rounded"
        id="new-item" type="submit" aria-label="Add Item">
        <i class="fa-solid fa-plus" aria-hidden="true"></i>
      </button>
    </form>`;

export const no_auth_template = `
    <section class="logged-out">
      <h2>Welcome to your Shopping List!</h2>
      <p>Please <span id="LoginText">Log in</span> or <span id="SignupText">
      Sign Up</span> to continue</p>
    </section>
`;

export const fieldset_template = `
    <fieldset>
      <legend>To Buy</legend>
      <span class="delete-list hint--top hint--rounded"
        aria-label="Delete this List">
        <span class="fa-regular fa-trash-can"></span>
      </span>
      <ul id="list-root"></ul>
    </fieldset>
    <fieldset>
      <legend>Bought</legend>
      <span class="delete-list hint--top hint--rounded"
        aria-label="Delete this List">
        <span class="fa-regular fa-trash-can"></span>
      </span>
      <ul id="completed-root"></ul>
    </fieldset>`;

export const footer_template = `
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

export const signInUpButton = `
    <a class="hint--bottom hint--rounded"
      id="signup" href="#" aria-label="Sign Up">
      <i class="fa-solid fa-user-plus" aria-hidden="true"></i>
      <span class="visible-hidden">Sign Up</span>
    </a>
    <a class="hint--bottom hint--rounded"
      id="login" href="#" aria-label="Login">
      <i class="fa-solid fa-sign-in" aria-hidden="true"></i>
      <span class="visible-hidden">Login</span>
    </a>
  `;

export const signOutButton = `
    <a class="hint--bottom hint--rounded"
      id="signout" href="#" aria-label="Sign Out">
      <i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
      <span class="visible-hidden">Sign Out</span>
    </a>
`;

import { supabase } from "./supabase.js";
import { toastMessage } from "./toaster.js";

const AUTH_CLASS = "auth-input";

const handleCancelButton = () => {
  const findDialog = document.getElementsByClassName("dialog");
  findDialog.item(0).remove();
};

const handleSubmitButton = async e => {
  e.preventDefault();
  const classList = e.target.classList;
  if (classList.contains("login-dialog")) {
    const username = e.target.elements["user_input"].value;
    const password = e.target.elements["pw_input"].value;

    if (username.length == 0 || password.length == 0) {
      toastMessage("Username or Password cannot be Blank", "error");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    if (error) {
      toastMessage(error.message, "error");
      return;
    }
    toastMessage("Logged in Successfully", "success");
    e.target.remove();
    // just log to console for now
    const { session, user } = data;
    console.log("Session:", session);
    console.log("User:", user);
  } else if (classList.contains("signup-dialog")) {
    const elements = e.target.elements;
    const username = elements["user_input"].value;
    const password = elements["pw_input"].value;
    const pw_confirm = elements["pw_confirm"].value;

    if (username.length == 0 || password.length == 0) {
      toastMessage("Username or Password cannot be Blank", "error");
      return;
    } else if (pw_confirm.length == 0) {
      toastMessage("You must confirm the Password", "error");
      return;
    } else if (password.length < 8) {
      toastMessage("Password must be at least 8 characters", "error");
      return;
    } else if (password !== pw_confirm) {
      toastMessage("Passwords do not match", "error");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: username,
      password: password,
    });
    if (error) {
      toastMessage(error.message, "error");
      return;
    }
    toastMessage("Signed up Successfully", "success");
    e.target.remove();
    // log to console for now
    console.log(data, error);
  }
};

const authButtons = () => {
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "auth-button-wrapper";

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.type = "button";
  cancelButton.classList.add("button", "cancel-auth-button");
  cancelButton.onclick = handleCancelButton;

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.type = "submit";
  submitButton.classList.add("button", "cancel-submit-button");

  buttonWrapper.append(cancelButton, submitButton);
  return buttonWrapper;
};

export const loginDialog = () => {
  // This will return an element containing the login Dialog.
  const login = document.createElement("form");
  login.classList.add("dialog", "login-dialog");
  login.onsubmit = handleSubmitButton;
  const title = document.createElement("p");
  title.className = "dialog-title";
  title.innerText = "Login : ";

  const username = document.createElement("input");
  username.type = "text";
  username.name = "user_input";
  username.placeholder = "Email";
  username.classList.add(AUTH_CLASS);

  const password = document.createElement("input");
  password.type = "password";
  password.name = "pw_input";
  password.placeholder = "Password";
  password.classList.add(AUTH_CLASS);

  login.append(title, username, password, authButtons());

  return login;
};

export const signupDialog = () => {
  // This will return an element containing the signup Dialog.
  const signup = document.createElement("form");
  signup.classList.add("dialog", "signup-dialog");
  signup.onsubmit = handleSubmitButton;
  const title = document.createElement("p");
  title.className = "dialog-title";
  title.innerText = "Sign Up : ";

  const username = document.createElement("input");
  username.type = "text";
  username.name = "user_input";
  username.placeholder = "Email";
  username.classList.add(AUTH_CLASS);

  const password = document.createElement("input");
  password.type = "password";
  password.name = "pw_input";
  password.placeholder = "Password";

  password.classList.add(AUTH_CLASS);

  const password_confirm = document.createElement("input");
  password_confirm.type = "password";
  password_confirm.name = "pw_confirm";
  password_confirm.placeholder = "Confirm Password";
  password_confirm.classList.add(AUTH_CLASS);

  signup.append(title, username, password, password_confirm, authButtons());

  return signup;
};

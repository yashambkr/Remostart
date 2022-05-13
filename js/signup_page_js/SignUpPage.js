/*===== LOGIN SHOW and HIDDEN =====*/

const signUp = document.getElementById("sign-up"),
  signIn = document.getElementById("sign-in"),
  loginIn = document.getElementById("login-in"),
  loginUp = document.getElementById("login-up"),
  forgetpassword = document.getElementById("forgot-button"),
  forgot = document.getElementById("forget-password");

signUp.addEventListener("click", () => {
  // Remove classes first if they exist
  loginIn.classList.remove("block");
  loginUp.classList.remove("none");

  // Add classes
  loginIn.classList.toggle("none");
  loginUp.classList.toggle("block");
});

signIn.addEventListener("click", () => {
  // Remove classes first if they exist
  loginIn.classList.remove("none");
  loginUp.classList.remove("block");

  // Add classes
  loginIn.classList.toggle("block");
  loginUp.classList.toggle("none");
});

forgetpassword.addEventListener("click", () => {
  // Remove classes first if they exist
  loginIn.classList.remove("none");
  loginIn.classList.remove("block");
  forgot.classList.toggle("block");

  // Add classes
  loginIn.classList.toggle("block");
  loginIn.classList.toggle("none");
  forgot.classList.toggle("none");
});
// end of switiching forms



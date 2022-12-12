/*===== LOGIN SHOW and HIDDEN =====*/

const signUp = document.getElementById("sign-up"),
  loginIn = document.getElementById("login-in");

signUp.addEventListener("click", () => {
  // Remove classes first if they exist
  loginIn.classList.remove("block");
  loginUp.classList.remove("none");

  // Add classes
  loginIn.classList.toggle("none");
  loginUp.classList.toggle("block");
});

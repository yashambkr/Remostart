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





// validation functions with regex

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};
const showError = (input, message) => {
  alert(message);
};






// calling validation functions for signup
const fnameEl = document.querySelector("#Fname");
const lnameEl = document.querySelector("#Lname");
const emailEl = document.querySelector("#email");
const phoneEl = document.querySelector("#phone");
const passwordEl = document.querySelector("#password");
const username = document.querySelector("#Username");
const confirmPasswordEl = document.querySelector("#password-signup2");

// for signup check
const SignUpForm = document.querySelector("#sumbitbtn");

SignUpForm.addEventListener("click", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate forms
  let isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid;
  // submit to the server if the form is valid
  if (username.value.trim().includes(".")) {
    alert("remove dot");
  } else {
    if (!isFormValid) {
      sessionStorage.setItem("formstatus", "incorrect");
    } else {
      sessionStorage.setItem("formstatus", "correct");
    }
  }
});

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    valid = true;
  }
  return valid;
};
const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    valid = true;
  }

  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  // check confirm password
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (password !== confirmPassword) {
    showError(confirmPasswordEl, "Confirm password does not match");
  } else {
    valid = true;
  }

  return valid;
};








// for signin
const emailorphoneEl = document.querySelector("#emailorphone");

const signinform = document.querySelector("#login-in");

const isEmailOrPhoneCheck = () => {
  let valid = false;
  const emailorphone = emailorphoneEl.value.trim();
  if (isPhonenumber(emailorphone) || isEmailValid(emailorphone)) {
    return (valid = true);
  } else {
    showError(valid, "Email or phone is incorrect");
    return (valid = false);
  }
};

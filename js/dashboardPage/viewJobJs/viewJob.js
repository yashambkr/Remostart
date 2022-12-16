import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  child,
  get,
  onValue,
  push,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import {
  getAuth,
  signOut,
  updatePassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyC8G9Wf5tJE-GAiI5dLsmn4lCDGmKjxey8",
  authDomain: "remostart-daf09.firebaseapp.com",
  projectId: "remostart-daf09",
  storageBucket: "remostart-daf09.appspot.com",
  messagingSenderId: "1072762916132",
  appId: "1:1072762916132:web:99d06258e6ea16ba4437b1",
});
// references
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const dbRef = ref(getDatabase());

// for getting data of user
const loaderContainer = document.querySelector(".loader-container");
const displayLoading = () => {
  loaderContainer.style.display = "block";
};

const hideLoading = () => {
  loaderContainer.style.display = "none";
};

// for getting data of user
var url_string = window.location;
var url = new URL(url_string);
const jobid = url.searchParams.get("JobID");

console.log(jobid);


auth.onAuthStateChanged((user) => {
  if (user) {
    get(child(dbRef, "Jobs/" + jobid)).then((snapshot) => {
      if (snapshot.exists()) {
        // displayLoading();

        
        const jobTitle = snapshot.val().Jobtitle;
        const CName = snapshot.val().CompanyName;
        const qualification = snapshot.val().Qualification.split(",");
        const CDescription = snapshot.val().CompanyDescripition;
        const jobLocation = snapshot.val().Joblocation;
        const jobType = snapshot.val().JobType;
        const jobDescription = snapshot.val().Description;
        const CWebsite = snapshot.val().CompanyWebsite;
        console.log(snapshot.val());
  
        document.getElementById("job-title").innerText = jobTitle;
        document.getElementById("company-name").innerText= CName;
        document.getElementById("company-desc").innerText= CDescription;
        document.getElementById("company-website").innerText= CWebsite;
        document.getElementById("job-location").innerText= jobLocation;
        document.getElementById("job-type").innerText= jobType;
        document.getElementById("job-qualification").innerText= qualification;
        document.getElementById("job-desc").innerText= jobDescription;

      } else {

        console.log("Not possible");
      }
    });
  }
  if (user) {
    get(child(dbRef, "User/" + user.uid)).then((Usnapshot) => {
      if (Usnapshot.exists()) {

        document.getElementById("name-text").innerText = "Hi " + Usnapshot.val().FirstName

        }
      });
    }
});
// for logout function
document.getElementById("logout-link").addEventListener("click", logout);

function logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location = "../../index.html";
    })
    .catch((error) => {
      // An error happened.
    });
}
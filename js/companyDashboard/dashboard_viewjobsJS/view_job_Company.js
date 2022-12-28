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

        document.getElementById("job-title").innerText = jobTitle;
        document.getElementById("company-name").innerText = CName;
        document.getElementById("company-desc").innerText = CDescription;
        document.getElementById("company-website").innerText = CWebsite;
        document.getElementById("job-location").innerText = jobLocation;
        document.getElementById("job-type").innerText = jobType;
        document.getElementById("job-qualification").innerText = qualification;
        document.getElementById("job-desc").innerText = jobDescription;

        const ApplicantRef = ref(database, "Jobs/" + jobid + "/Applicant/");
        onValue(ApplicantRef, (Asnapshot) => {
          Asnapshot.forEach((childSnapshot) => {
            const FirstName = childSnapshot.val().FirstName;
            const LastName = childSnapshot.val().LastName;
            const Email = childSnapshot.val().Email;
            const PhoneNo = childSnapshot.val().PhoneNo;
            const ApplicantId = childSnapshot.val().applicantId;
            console.log(jobid);
            // const cardList = document.getElementsByClassName("test")[0];
            // const newGroup = document.createElement("div");
            // newGroup.classList.add("card m-b-30");

            // //First Name
            // const fname = document.createElement("h4");
            // newGroup.appendChild(fname);
            // fname.innerText = "ajhsbdhabj";

            // //Last Name
            // const lname = document.createElement("h4");
            // newGroup.appendChild(lname);
            // lname.innerText = LastName;

            // //Email
            // const email = document.createElement("h4");
            // newGroup.appendChild(email);
            // email.innerText = Email;

            // //Phone No
            // const phoneno = document.createElement("h4");
            // newGroup.appendChild(phoneno);
            // phoneno.innerText = PhoneNo;
            // console.log(ApplicantId);
            // cardList.appendChild(newGroup);
          });
        });
      } else {
        console.log("Not possible");
      }
    });
  }
  if (user) {
    get(child(dbRef, "Company/" + user.uid)).then((Usnapshot) => {
      if (Usnapshot.exists()) {
        document.getElementById("company-name-text").innerText =
          Usnapshot.val().CompanyName;
        console.log(Usnapshot.val().CompanyName);
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
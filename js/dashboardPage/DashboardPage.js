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
auth.onAuthStateChanged((user) => {
  if (user) {
    get(child(dbRef, "User/" + user.uid)).then((Usnapshot) => {
      if (Usnapshot.exists()) {
        displayLoading();

        document.getElementById("name-text").innerText =
          "Hi " + Usnapshot.val().FirstName;
        const tempref = ref(database, "Jobs/");
        onValue(
          tempref,
          (Csnapshot) => {
            hideLoading();
            Csnapshot.forEach((snapshot) => {
              const jobTitle = snapshot.val().Jobtitle;
              const CName = snapshot.val().CompanyName;
              const qualification = snapshot.val().Qualification.split(",");
              const CDescription = snapshot.val().CompanyDescripition;
              const jobLocation = snapshot.val().Joblocation;
              const jobType = snapshot.val().JobType;
              const jobDescription = snapshot.val().Description;
              const CWebsite = snapshot.val().CompanyWebsite;

              // console.log(snapshot.val().Jobtitle);
              // card properties
              const cardList = document.getElementsByClassName("test")[0];
              const newGroup = document.createElement("div");
              newGroup.classList.add(
                "col-12",
                "col-md-4",
                "job-card",
                "d-flex",
                "flex-column",
                "justify-content-between",
                "py-3"
              );

              //inside card properties
              const CompanyName = document.createElement("h4");
              newGroup.appendChild(CompanyName);
              CompanyName.innerText = CName;
              CompanyName.classList.add("job-card_company", "text-uppercase");

              // const CompanyWebsite = document.createElement("h6");
              // CompanyWebsite.innerText =
              //   "Website : " + CWebsite;
              // newGroup.appendChild(CompanyWebsite);

              // const CompanyDescripition = document.createElement("p");
              // CompanyDescripition.innerText =
              //   "CompanyDescripition : " + CDescription;
              // newGroup.appendChild(CompanyDescripition);

              const Job_Title = document.createElement("h4");
              Job_Title.innerText = jobTitle;
              newGroup.appendChild(Job_Title);
              Job_Title.classList.add("fw-bold");

              const Job_location = document.createElement("p");
              Job_location.innerText = jobLocation;
              newGroup.appendChild(Job_location);
              Job_location.classList.add("job-label");

              const Job_Type = document.createElement("p");
              Job_Type.innerText = jobType;
              newGroup.appendChild(Job_Type);
              Job_Type.classList.add("job-label");

              // const job_Description = document.createElement("p");
              // job_Description.innerText =
              //   "Description : " + jobDescription;
              // newGroup.appendChild(job_Description);

              // const Qualification = document.createElement("p");
              // Qualification.innerText =qualification.join("");
              // newGroup.appendChild(Qualification);
              // Qualification.classList.add("job-label");

              var br = document.createElement("br");
              newGroup.appendChild(br);
              var button = document.createElement("button");
              button.type = "button";
              button.innerHTML = "View Job";
              button.classList.add("btn-styled");





              button.onclick = function () {
                const myUrl = new URL("https://remostarts.com/DashboardPage/ViewJobPage/ViewJobPage.html");

                myUrl.searchParams.set("JobID", snapshot.key);
                console.log(snapshot.key);
                window.location = myUrl;


              };
              newGroup.appendChild(button);
              cardList.appendChild(newGroup);
            });
          },
          {
            onlyOnce: true,
          }
        );
      } else {
        console.log("Not possible");
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
      window.location = "../index.html";
    })
    .catch((error) => {
      // An error happened.
    });
}












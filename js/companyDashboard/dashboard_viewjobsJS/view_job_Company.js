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
        console.log(snapshot.val());
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

            console.log(FirstName);

            const cardList = document.getElementsByClassName("ApplicantsSide")[0];

            const card = document.createElement("div");
            card.classList.add("card", "m-b-30");

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const media = document.createElement("div");
            media.classList.add("media", "d-flex");

            const mediaBody = document.createElement("div");
            mediaBody.classList.add("media-body", "ps-3", "pt-2");

            const h5 = document.createElement("h5");
            h5.classList.add("mt-0", "font-18", "mb-1");
            h5.textContent = FirstName;

            const p = document.createElement("p");
            p.classList.add("text-muted", "font-14");
            p.textContent = Email;

            const div1 = document.createElement("div");

            const socialLinks = document.createElement("ul");
            socialLinks.classList.add(
              "social-links",
              "list-inline",
              "mb-0",
              "ps-4",
              "pt-2"
            );
            div1.appendChild(socialLinks);
            const li1 = document.createElement("li");
            li1.classList.add("list-inline-item");

            const btn1 = document.createElement("button");
            btn1.title = "";
            btn1.setAttribute("data-placement", "top");
            btn1.setAttribute("data-toggle", "tooltip");
            btn1.classList.add("tooltips", "border-0");
            btn1.href = "";
            btn1.setAttribute("data-original-title", "Facebook");

            const i1 = document.createElement("i");
            i1.classList.add("fa", "fa-check", "btn", "btn-success");

            const li2 = document.createElement("li");
            li2.classList.add("list-inline-item", "ps-1");

            const btn2 = document.createElement("button");
            btn2.title = "";
            btn2.setAttribute("data-placement", "top");
            btn2.setAttribute("data-toggle", "tooltip");
            btn2.classList.add("tooltips", "border-0");
            btn2.href = "";
            btn2.setAttribute("data-original-title", "Facebook");

            const i2 = document.createElement("i");
            i2.classList.add("fa", "fa-close", "btn", "btn-danger");

            // Append elements to each other
            // card.appendChild(card);
            mediaBody.appendChild(h5);
            mediaBody.appendChild(p);

            btn1.appendChild(i1);
            li1.appendChild(btn1);

            btn2.appendChild(i2);
            li2.appendChild(btn2);

            socialLinks.appendChild(li1);
            socialLinks.appendChild(li2);

            div1.appendChild(socialLinks);

            mediaBody.appendChild(mediaBody);
            mediaBody.appendChild(div1);

            media.appendChild(mediaBody);
            cardBody.appendChild(media);

            card.appendChild(cardBody);
            cardList.appendChild(card);
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
var x = "";
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
import {
  getStorage,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

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
auth.onAuthStateChanged((user) => {
  if (user) {
    get(child(dbRef, "Company/" + user.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        const CompanyName = snapshot.val().CompanyName;
        console.log(CompanyName);

        const tempRef = ref(database, "Company/" + user.uid + "/CreatedJobs/");
        onValue(
          tempRef,
          (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val().JobID;
              console.log("JobId= " + childData);

              const jobRef = ref(database, "Jobs/" + childData + "/");

              onValue(jobRef, (snapshot) => {

                const jobTitle = snapshot.val().Jobtitle;
                const CName = snapshot.val().CompanyName;
                const qualification = snapshot.val().Qualification.split(",");
                const CDescription = snapshot.val().CompanyDescripition;
                const jobLocation = snapshot.val().Joblocation;
                const jobType = snapshot.val().JobType;
                const jobDescription = snapshot.val().Description;
                const CWebsite = snapshot.val().CompanyWebsite;
                const data = snapshot.val().Jobtitle;
                const cardList = document.getElementsByClassName("test")[0];

                console.log(data);
                const newGroup = document.createElement("div");
              newGroup.classList.add('col-12', 'col-md-4', 'job-card', 'd-flex', 'flex-column', 'justify-content-between', 'py-3');





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
              button.innerHTML = "View Details";
              button.classList.add("btn-styled");
              newGroup.appendChild(button);
                cardList.appendChild(newGroup);
              });
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

var createJobBtn = document
  .getElementById("create-job-btn")
  .addEventListener("click", (e) => {
    window.location = "../company/create_job.html";
  });

// for logout function
document.getElementById("logout-link").addEventListener("click", logout);

// function logout
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
// btn.addEventListener('click', e => {
//     const storage = getStorage();
//     const file = document.querySelector('input').files[0];
//     const filename = file.name;
//     const ImagesRef = ref(storage, ('Resume/Web/' + { filename }));

//     // const final = firebaseApp.storage.child(`Resume/Web/${file}`);

//     const uploadTask = uploadBytesResumable(ImagesRef, file);
//     uploadTask.on('state_changed',
//         (snapshot) => {

//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             document.getElementById("progressbar").style.width = progress + "%";
//             document.getElementById("progressbar").innerHTML = progress + "%";
//             console.log('Upload is ' + progress + '% done');
//         },
//         (error) => {
//             // Handle unsuccessful uploads
//         },
//         () => {

//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 console.log('File available at', downloadURL);
//             });
//         }
//     );

// });
